(() => {
  const configScript = document.createElement('script');
  configScript.src = '/supabase-config.js';
  configScript.onload = () => {
    const authScript = document.createElement('script');
    authScript.src = '/auth.js';
    document.head.appendChild(authScript);
  };
  document.head.appendChild(configScript);

  const badge = document.createElement('div');
  badge.textContent = 'DB 연결 확인 중…';
  Object.assign(badge.style, {position:'fixed', right:'16px', bottom:'16px', zIndex:9999, padding:'8px 12px', borderRadius:'4px', background:'#e2e2e8', color:'#1a1c20', font:'12px system-ui', boxShadow:'0 2px 4px #0001'});
  document.body.appendChild(badge);
  fetch('/api/health').then(r => r.json()).then(info => {
    badge.textContent = `● ${info.database.toUpperCase()} 연결됨`;
    badge.style.background = '#d1fae5'; badge.style.color = '#065f46';
  }).catch(() => { badge.textContent = '○ 서버 실행 필요'; badge.style.background = '#ffdad6'; badge.style.color = '#93000a'; });

  const title = document.title;
  if (title.includes('데이터 선택')) {
    fetch('/api/lots').then(r => r.json()).then(lots => {
      document.documentElement.dataset.lotCount = lots.length;
      const label = [...document.querySelectorAll('p,span')].find(el => el.textContent?.includes('총') && el.textContent?.includes('건'));
      if (label) label.textContent = `총 ${lots.length}건`;
    });
  }
  if (title.includes('대시보드')) fetch('/api/dashboard').then(r => r.json()).then(data => document.documentElement.dataset.dashboard = JSON.stringify(data.summary));
  if (title.includes('상관관계')) fetch('/api/analyses').then(r => r.json()).then(data => document.documentElement.dataset.analysisCount = data.length);
  if (title.includes('8D')) fetch('/api/reports').then(r => r.json()).then(data => document.documentElement.dataset.reportCount = data.length);
})();
