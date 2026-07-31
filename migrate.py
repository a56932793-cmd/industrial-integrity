"""Apply ordered SQL migrations to industrial_integrity.db."""
from pathlib import Path
import sqlite3

ROOT = Path(__file__).resolve().parent
DB_PATH = ROOT / 'industrial_integrity.db'
MIGRATIONS = ROOT / 'migrations'

db = sqlite3.connect(DB_PATH)
db.execute('CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)')

for path in sorted(MIGRATIONS.glob('*.sql')):
    version = path.name
    if db.execute('SELECT 1 FROM schema_migrations WHERE version = ?', (version,)).fetchone():
        continue
    db.executescript(path.read_text(encoding='utf-8'))
    db.execute('INSERT INTO schema_migrations(version) VALUES (?)', (version,))
    db.commit()
    print(f'applied {version}')

print('database migration complete')
db.close()

