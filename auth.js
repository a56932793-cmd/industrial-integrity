(async () => {
  const config = window.SUPABASE_CONFIG || {};
  const isConfigured = Boolean(config.url && config.anonKey && config.anonKey.length > 30);
  const loginPage = location.pathname.endsWith('/login.html');

  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src; script.onload = resolve; script.onerror = reject;
    document.head.appendChild(script);
  });

  const showMessage = (message, type = 'error') => {
    const el = document.getElementById('auth-message');
    if (!el) return;
    el.textContent = message;
    el.className = `auth-message ${type}`;
    el.hidden = false;
  };

  try {
    await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4/dist/umd/supabase.min.js');
    if (!window.supabase || !isConfigured) {
      showMessage('Supabase anon key媛 ?ㅼ젙?섏? ?딆븯?듬땲?? supabase-config.js???ㅼ젣 怨듦컻?ㅻ? ?낅젰?섏꽭??');
      return;
    }
    const client = window.supabase.createClient(config.url, config.anonKey);
    window.supabaseClient = client;

    if (loginPage) {
      const form = document.getElementById('login-form');
      const signup = document.getElementById('signup-button');
      const reset = document.getElementById('reset-button');
      form?.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) return showMessage(error.message);
        location.href = new URLSearchParams(location.search).get('next') || '/1/code.html';
      });
      signup?.addEventListener('click', async () => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        if (!email || password.length < 6) return showMessage('?대찓?쇨낵 6???댁긽 鍮꾨?踰덊샇瑜??낅젰?섏꽭??');
        const { error } = await client.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/login.html` } });
        if (error) return showMessage(error.message);
        showMessage('媛???붿껌???꾨즺?섏뿀?듬땲?? ?대찓???몄쬆 ??濡쒓렇?명븯?몄슂.', 'success');
      });
      reset?.addEventListener('click', async () => {
        const email = document.getElementById('email').value.trim();
        if (!email) return showMessage('鍮꾨?踰덊샇 ?ъ꽕???대찓?쇱쓣 ?낅젰?섏꽭??');
        const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/login.html` });
        if (error) return showMessage(error.message);
        showMessage('鍮꾨?踰덊샇 ?ъ꽕??硫붿씪??諛쒖넚?덉뒿?덈떎.', 'success');
      });
      return;
    }

    const { data: { session } } = await client.auth.getSession();
    if (!session) {
      const next = `${location.pathname}${location.search}`;
      location.replace(`/login.html?next=${encodeURIComponent(next)}`);
      return;
    }
    client.auth.onAuthStateChange((_event, currentSession) => { if (!currentSession) location.replace('/login.html'); });
  } catch (error) {
    showMessage('Supabase SDK瑜?遺덈윭?ㅼ? 紐삵뻽?듬땲?? ?ㅽ듃?뚰겕 ?곌껐???뺤씤?섏꽭??');
  }
})();

