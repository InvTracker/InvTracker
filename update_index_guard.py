with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace head scripts
old_head_scripts = """  <link rel="stylesheet" href="/css/styles.css">
  <script src="/js/firebase-config.js"></script>
  <script src="/js/firebase-config.js"></script>
  <script>
    (function () {
      try {
        var userAuth = localStorage.getItem('invenTrack_user');
        var appState = localStorage.getItem('inventrack_m3_state');
        var authed = false;
        if (userAuth) {
          var u = JSON.parse(userAuth);
          if (u && (u.role || u.name)) authed = true;
        }
        if (!authed && appState) {
          var s = JSON.parse(appState);
          if (s && s.loggedIn && s.currentUser && s.currentUser.role) authed = true;
        }
        if (!authed) {
          var isLocal = window.location.protocol === 'file:';
          window.location.replace(isLocal ? 'landing.html' : '/landing');
        }
      } catch (e) {
        var isLocal = window.location.protocol === 'file:';
        window.location.replace(isLocal ? 'landing.html' : '/landing');
      }
    })();
  </script>"""

new_head_scripts = """  <link rel="stylesheet" href="/css/styles.css">
  <script src="/js/roles.js"></script>
  <script src="/js/firebase-config.js"></script>
  <script>
    (function () {
      try {
        var userAuth = localStorage.getItem('invenTrack_user');
        var appState = localStorage.getItem('inventrack_m3_state');
        var authed = false;
        var activeUser = null;
        if (userAuth) {
          var u = JSON.parse(userAuth);
          if (u && (u.role || u.name)) { authed = true; activeUser = u; }
        }
        if (!authed && appState) {
          var s = JSON.parse(appState);
          if (s && s.loggedIn && s.currentUser && s.currentUser.role) {
            authed = true;
            activeUser = s.currentUser;
          }
        }
        if (!authed) {
          var isLocal = window.location.protocol === 'file:';
          window.location.replace(isLocal ? 'landing.html' : '/landing');
          return;
        }

        var userEmail = activeUser ? (activeUser.email || '') : '';
        var role = window.getUserRole ? window.getUserRole(userEmail) : (activeUser ? activeUser.role : 'student');
        if (activeUser && activeUser.role !== role) {
          activeUser.role = role;
          try { localStorage.setItem('invenTrack_user', JSON.stringify(activeUser)); } catch(e){}
        }

        var hash = (window.location.hash || '').toLowerCase();
        if (role === 'student' || role === 'user') {
          if (hash.includes('admin') || hash.includes('kitchen')) {
            alert("Access denied: Students cannot access this section");
            var isLocal = window.location.protocol === 'file:';
            window.location.replace(isLocal ? 'student-dashboard.html' : '/student-dashboard.html');
            return;
          }
        } else if (role === 'kitchen') {
          if (hash.includes('admin')) {
            alert("Access denied: Kitchen staff cannot access Admin Dashboard");
            window.location.hash = '#kitchen-kanban';
          }
        }
      } catch (e) {
        var isLocal = window.location.protocol === 'file:';
        window.location.replace(isLocal ? 'landing.html' : '/landing');
      }
    })();
  </script>"""

text_norm = text.replace('\r\n', '\n')
old_norm = old_head_scripts.replace('\r\n', '\n')
new_norm = new_head_scripts.replace('\r\n', '\n')

if old_norm in text_norm:
    text_norm = text_norm.replace(old_norm, new_norm)
    with open('index.html', 'w', encoding='utf-8', newline='\n') as f:
        f.write(text_norm)
    print('Updated index.html auth guard')
else:
    print('WARNING: old_head_scripts not found in index.html')

