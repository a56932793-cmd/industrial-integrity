(async () => {
  const config = window.SUPABASE_CONFIG || {};
  const isConfigured = Boolean(config.url && config.anonKey && config.anonKey.length > 30);
  const loginPage = location.pathname.endsWith('/login.html') || location.pathname.endsWith('/login');

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
      showMessage('Supabase anon key가 설정되지 않았습니다. supabase-config.js에 실제 공개키를 입력하세요.');
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
        if (!email || password.length < 6) return showMessage('이메일과 6자 이상 비밀번호를 입력하세요.');
        const { error } = await client.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/login.html` } });
        if (error) return showMessage(error.message);
        showMessage('가입 요청이 완료되었습니다. 이메일 인증 후 로그인하세요.', 'success');
      });
      reset?.addEventListener('click', async () => {
        const email = document.getElementById('email').value.trim();
        if (!email) return showMessage('비밀번호 재설정 이메일을 입력하세요.');
        const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/login.html` });
        if (error) return showMessage(error.message);
        showMessage('비밀번호 재설정 메일을 발송했습니다.', 'success');
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
    showMessage('Supabase SDK를 불러오지 못했습니다. 네트워크 연결을 확인하세요.');
  }
})();
