"""Local database-backed server for the Industrial Integrity prototype."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs, unquote
from pathlib import Path
import json
import sqlite3
import os
import mimetypes

ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / "industrial_integrity.db"


def connect():
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    return db


def init_db():
    db = connect()
    db.executescript("""
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS lots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lot_id TEXT NOT NULL UNIQUE,
      product TEXT NOT NULL,
      line TEXT NOT NULL,
      process TEXT NOT NULL,
      inspected_at TEXT NOT NULL,
      total_count INTEGER NOT NULL,
      defect_count INTEGER NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('?뺤긽','二쇱쓽','?ш컖')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS measurements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lot_id INTEGER NOT NULL REFERENCES lots(id) ON DELETE CASCADE,
      measured_at TEXT NOT NULL,
      temperature REAL,
      gas_flow REAL,
      pressure REAL,
      defect_type TEXT
    );
    CREATE TABLE IF NOT EXISTS analyses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lot_id INTEGER NOT NULL REFERENCES lots(id) ON DELETE CASCADE,
      analysis_type TEXT NOT NULL,
      result_json TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      report_no TEXT NOT NULL UNIQUE,
      lot_id INTEGER REFERENCES lots(id),
      title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT '珥덉븞',
      content_json TEXT NOT NULL DEFAULT '{}',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    """)
    if db.execute("SELECT COUNT(*) FROM lots").fetchone()[0] == 0:
        lots = [
            ('LOT-2310', '?묎레??, 'A-01', '?뚯꽦', '2024-03-01', 1000, 11, '?ш컖'),
            ('LOT-2309', '?묎레??, 'A-01', '?뚯꽦', '2024-03-02', 1000, 5, '二쇱쓽'),
            ('LOT-2308', '?묎레??, 'A-02', '?쇳빀', '2024-03-03', 1000, 3, '二쇱쓽'),
            ('LOT-2307', '?묎레??, 'A-02', '?쇳빀', '2024-03-04', 1000, 2, '?뺤긽'),
            ('LOT-2306', '?꾧뎄泥?, 'B-01', '?댁쿂由?, '2024-03-05', 1000, 1, '?뺤긽'),
            ('LOT-2305', '?꾧뎄泥?, 'B-01', '?댁쿂由?, '2024-03-06', 1000, 0, '?뺤긽'),
        ]
        db.executemany("INSERT INTO lots(lot_id,product,line,process,inspected_at,total_count,defect_count,status) VALUES (?,?,?,?,?,?,?,?)", lots)
        first = db.execute("SELECT id FROM lots WHERE lot_id='LOT-2310'").fetchone()[0]
        db.executemany("INSERT INTO measurements(lot_id,measured_at,temperature,gas_flow,pressure,defect_type) VALUES (?,?,?,?,?,?)", [
            (first, '2024-03-01T08:00:00', 920.0, 12.5, 1.02, '?쒕㈃ 洹좎뿴'),
            (first, '2024-03-01T12:00:00', 934.0, 13.1, 1.08, '?쒕㈃ 洹좎뿴'),
            (first, '2024-03-01T16:00:00', 945.0, 13.8, 1.11, '蹂??),
        ])
        db.execute("INSERT INTO reports(report_no,lot_id,title,status,content_json) VALUES (?,?,?,?,?)", ('8D-2024-001', first, 'LOT-2310 ?덉쭏 ?댁긽 蹂닿퀬??, '吏꾪뻾以?, json.dumps({'owner':'?덉쭏?곸떊?','containment':'異쒗븯 蹂대쪟'})))
    db.commit()
    db.close()


def rows_to_dict(rows):
    return [dict(row) for row in rows]


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, format, *args):
        pass

    def end_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path.startswith('/api/'):
            db = connect()
            try:
                if parsed.path == '/api/health':
                    self.end_json({'ok': True, 'database': 'sqlite', 'file': DB_PATH.name})
                elif parsed.path == '/api/lots':
                    q = parse_qs(parsed.query).get('q', ['%'])[0]
                    self.end_json(rows_to_dict(db.execute("SELECT * FROM lots WHERE lot_id LIKE ? OR product LIKE ? ORDER BY inspected_at DESC", (f'%{q}%', f'%{q}%')).fetchall()))
                elif parsed.path == '/api/dashboard':
                    summary = db.execute("SELECT COUNT(*) lots, COALESCE(SUM(total_count),0) inspected, COALESCE(SUM(defect_count),0) defects, ROUND(COALESCE(SUM(defect_count),0)*100.0/NULLIF(SUM(total_count),0),2) defect_rate FROM lots").fetchone()
                    daily = db.execute("SELECT inspected_at date, SUM(defect_count) defects, ROUND(SUM(defect_count)*100.0/SUM(total_count),2) defect_rate FROM lots GROUP BY inspected_at ORDER BY inspected_at").fetchall()
                    self.end_json({'summary': dict(summary), 'daily': rows_to_dict(daily)})
                elif parsed.path == '/api/analyses':
                    self.end_json(rows_to_dict(db.execute("SELECT a.*, l.lot_id FROM analyses a JOIN lots l ON l.id=a.lot_id ORDER BY a.created_at DESC").fetchall()))
                elif parsed.path == '/api/reports':
                    self.end_json(rows_to_dict(db.execute("SELECT r.*, l.lot_id FROM reports r LEFT JOIN lots l ON l.id=r.lot_id ORDER BY r.updated_at DESC").fetchall()))
                else:
                    self.end_json({'error': 'Not found'}, 404)
            finally:
                db.close()
            return
        relative = unquote(parsed.path.lstrip('/')) or '1/code.html'
        requested = (ROOT / relative).resolve()
        if ROOT not in requested.parents and requested != ROOT:
            self.send_error(403)
            return
        if not requested.is_file():
            self.send_error(404)
            return
        body = requested.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', mimetypes.guess_type(str(requested))[0] or 'application/octet-stream')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == '__main__':
    init_db()
    port = int(os.environ.get('INDUSTRIAL_INTEGRITY_PORT', '8010'))
    print(f'Industrial Integrity server: http://localhost:{port}/1/code.html')
    ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()

