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
  badge.textContent = 'DB ?곌껐 ?뺤씤 以묅?;
  Object.assign(badge.style, {position:'fixed', right:'16px', bottom:'16px', zIndex:9999, padding:'8px 12px', borderRadius:'4px', background:'#e2e2e8', color:'#1a1c20', font:'12px system-ui', boxShadow:'0 2px 4px #0001'});
  document.body.appendChild(badge);
  fetch('/api/health').then(r => r.json()).then(info => {
    badge.textContent = `??${info.database.toUpperCase()} ?곌껐??;
    badge.style.background = '#d1fae5'; badge.style.color = '#065f46';
  }).catch(() => { badge.textContent = '???쒕쾭 ?ㅽ뻾 ?꾩슂'; badge.style.background = '#ffdad6'; badge.style.color = '#93000a'; });

  const title = document.title;
  if (title.includes('?곗씠???좏깮')) {
    fetch('/api/lots').then(r => r.json()).then(lots => {
      document.documentElement.dataset.lotCount = lots.length;
      const label = [...document.querySelectorAll('p,span')].find(el => el.textContent?.includes('珥?) && el.textContent?.includes('嫄?));
      if (label) label.textContent = `珥?${lots.length}嫄?;
    });
  }
  if (title.includes('??쒕낫??)) fetch('/api/dashboard').then(r => r.json()).then(data => document.documentElement.dataset.dashboard = JSON.stringify(data.summary));
  if (title.includes('?곴?愿怨?)) fetch('/api/analyses').then(r => r.json()).then(data => document.documentElement.dataset.analysisCount = data.length);
  if (title.includes('8D')) fetch('/api/reports').then(r => r.json()).then(data => document.documentElement.dataset.reportCount = data.length);
})();

