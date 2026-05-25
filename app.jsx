/* global React, ReactDOM, MOCK_USERS, MOCK_CASES, MOCK_DEPOSITIONS, MOCK_DETAIL */
const { useState, useMemo, useEffect, useRef, createContext, useContext } = React;

// ---------- Icons (inline SVG, stroke-based, lucide-style) ----------
const I = ({ d, size = 16, fill = 'none' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const Ic = {
  scale:    (p) => <I {...p} d={<><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></>}/>,
  sparkles: (p) => <I {...p} d={<><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></>}/>,
  search:   (p) => <I {...p} d={<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>}/>,
  bell:     (p) => <I {...p} d={<><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></>}/>,
  plus:     (p) => <I {...p} d={<><path d="M5 12h14"/><path d="M12 5v14"/></>}/>,
  folder:   (p) => <I {...p} d={<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>}/>,
  fileText: (p) => <I {...p} d={<><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></>}/>,
  more:     (p) => <I {...p} d={<><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></>}/>,
  grid:     (p) => <I {...p} d={<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>}/>,
  list:     (p) => <I {...p} d={<><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/></>}/>,
  arrowL:   (p) => <I {...p} d={<><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></>}/>,
  calendar: (p) => <I {...p} d={<><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></>}/>,
  clock:    (p) => <I {...p} d={<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>}/>,
  check:    (p) => <I {...p} d={<><path d="M20 6 9 17l-5-5"/></>}/>,
  checkC:   (p) => <I {...p} d={<><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></>}/>,
  alert:    (p) => <I {...p} d={<><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></>}/>,
  play:     (p) => <I {...p} d={<polygon points="6 3 20 12 6 21 6 3"/>}/>,
  pause:    (p) => <I {...p} d={<><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></>}/>,
  skipBack: (p) => <I {...p} d={<><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></>}/>,
  chevL:    (p) => <I {...p} d={<polyline points="15 18 9 12 15 6"/>}/>,
  chevR:    (p) => <I {...p} d={<polyline points="9 18 15 12 9 6"/>}/>,
  chevD:    (p) => <I {...p} d={<polyline points="6 9 12 15 18 9"/>}/>,
  chevU:    (p) => <I {...p} d={<polyline points="18 15 12 9 6 15"/>}/>,
  upload:   (p) => <I {...p} d={<><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>}/>,
  film:     (p) => <I {...p} d={<><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></>}/>,
  send:     (p) => <I {...p} d={<><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>}/>,
  shield:   (p) => <I {...p} d={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}/>,
  eye:      (p) => <I {...p} d={<><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>}/>,
  edit:     (p) => <I {...p} d={<><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z"/></>}/>,
  logout:   (p) => <I {...p} d={<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>}/>,
  filter:   (p) => <I {...p} d={<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>}/>,
  flag:     (p) => <I {...p} d={<><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>}/>,
  msg:      (p) => <I {...p} d={<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>}/>,
  x:        (p) => <I {...p} d={<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>}/>,
  user:     (p) => <I {...p} d={<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}/>,
};

// ---------- Tiny toast ----------
const ToastCtx = createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = (t) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((s) => [...s, { id, ...t }]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 3500);
  };
  return (
    <ToastCtx.Provider value={{ success: (title, desc) => push({ kind: 'ok', title, desc }), error: (title, desc) => push({ kind: 'err', title, desc }) }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className={`min-w-[280px] max-w-sm rounded-lg border bg-white shadow-lg px-4 py-3 ${t.kind === 'err' ? 'border-rose-200' : 'border-slate-200'}`}>
            <div className={`text-sm font-medium ${t.kind === 'err' ? 'text-rose-700' : 'text-slate-900'}`}>{t.title}</div>
            {t.desc && <div className="text-xs text-slate-500 mt-0.5">{t.desc}</div>}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
const useToast = () => useContext(ToastCtx);

// ---------- Auth ----------
const AuthCtx = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthCtx.Provider value={{
      user,
      login: (email) => {
        const u = MOCK_USERS.find((x) => x.email === email);
        if (u) { setUser(u); return true; } return false;
      },
      logout: () => setUser(null),
    }}>{children}</AuthCtx.Provider>
  );
}
const useAuth = () => useContext(AuthCtx);

// ---------- UI primitives ----------
const cls = (...a) => a.filter(Boolean).join(' ');

const Button = ({ variant = 'primary', size = 'md', className = '', children, ...rest }) => {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none';
  const sizes = { sm: 'h-8 px-3 text-sm', md: 'h-9 px-4 text-sm', icon: 'h-9 w-9 p-0' };
  const variants = {
    primary:    'bg-[#0f172a] text-white hover:bg-[#1e3a8a]',
    secondary:  'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline:    'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50',
    ghost:      'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    teal:       'bg-[#0d9488] text-white hover:bg-[#0f766e]',
    destructive:'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
  };
  return <button className={cls(base, sizes[size], variants[variant], className)} {...rest}>{children}</button>;
};

const Input = ({ className = '', ...rest }) => (
  <input className={cls('h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 transition-colors', className)} {...rest}/>
);

const Badge = ({ variant = 'secondary', className = '', children }) => {
  const v = {
    secondary:   'bg-slate-100 text-slate-700 border border-slate-200',
    outline:     'bg-white border border-slate-200 text-slate-700',
    destructive: 'bg-rose-600 text-white',
    green:       'bg-emerald-50 border border-emerald-300 text-emerald-700',
    amber:       'bg-amber-50 border border-amber-300 text-amber-700',
    blue:        'bg-blue-50 border border-blue-300 text-blue-700',
  }[variant];
  return <span className={cls('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium', v, className)}>{children}</span>;
};

const Card = ({ className = '', children, ...rest }) => (
  <div className={cls('rounded-xl border border-slate-200 bg-white', className)} {...rest}>{children}</div>
);

// ---------- Top Nav ----------
function TopNav({ onLogo, onUserManagement }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = user ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '';
  const RoleIcon = { admin: Ic.shield, editor: Ic.edit, reader: Ic.eye }[user?.role] || (() => null);

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="px-6 py-3 flex items-center justify-between">
        <button onClick={onLogo} className="flex items-center gap-2.5 hover:opacity-75 transition-opacity">
          <div className="w-7 h-7 rounded bg-[#0f172a] flex items-center justify-center text-white">
            <Ic.scale size={14}/>
          </div>
          <span className="brand text-[1.35rem] text-slate-900">Cognition</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Ic.search size={14}/></span>
            <Input placeholder="Search depositions..." className="pl-9 h-8 text-sm"/>
          </div>
          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Ic.bell size={16}/>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-medium flex items-center justify-center">3</span>
          </Button>
          <div className="relative">
            <button onClick={() => setMenuOpen((o) => !o)} className="w-8 h-8 rounded-full bg-[#0f172a] text-white text-xs font-medium flex items-center justify-center hover:bg-[#1e3a8a] transition-colors">
              {initials || <Ic.user size={14}/>}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-lg shadow-lg p-1 z-50" onMouseLeave={() => setMenuOpen(false)}>
                <div className="px-3 py-2.5">
                  <div className="text-sm font-medium text-slate-900">{user?.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{user?.email}</div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <RoleIcon size={11}/>
                    <span className="capitalize">{user?.role}</span>
                    <span>·</span>
                    <span>{user?.organization.name}</span>
                  </div>
                </div>
                <div className="h-px bg-slate-100 my-1"/>
                {user?.role === 'admin' && (
                  <button onClick={() => { setMenuOpen(false); onUserManagement(); }} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-slate-50 flex items-center gap-2 text-slate-700">
                    <Ic.user size={13}/> User Management
                  </button>
                )}
                <button onClick={() => { setMenuOpen(false); logout(); }} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-rose-50 text-rose-600 flex items-center gap-2">
                  <Ic.logout size={13}/> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------- Login ----------
function LoginPage() {
  const { login } = useAuth();
  const t = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e?.preventDefault();
    setBusy(true);
    setTimeout(() => {
      const ok = login(email);
      if (ok) t.success('Welcome back');
      else t.error('Sign in failed', 'Please check your credentials.');
      setBusy(false);
    }, 200);
  };

  const demo = (em, label) => { if (login(em)) t.success('Demo access', label); };

  const features = [
    { icon: Ic.sparkles, title: 'AI Transcript Analysis', desc: 'Automatically organized by topic with source attribution and behavioral cue detection.' },
    { icon: Ic.alert,    title: 'Contradiction Detection', desc: 'Surface timeline conflicts and inconsistencies the moment they appear in testimony.' },
    { icon: Ic.flag,     title: 'Sentiment Tracking', desc: 'Monitor emotional patterns and behavioral shifts across the full deposition.' },
    { icon: Ic.checkC,   title: 'Goal Coverage', desc: 'Track deposition objectives in real-time and ensure nothing is left unaddressed.' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left — Feature overview */}
      <div className="hidden lg:flex lg:w-[58%] bg-[#0c1527] flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}/>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0c1527] to-transparent pointer-events-none"/>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-white/10 flex items-center justify-center text-white/90">
            <Ic.scale size={18}/>
          </div>
          <span className="brand text-[1.6rem] text-white">Cognition</span>
        </div>

        {/* Hero text + features */}
        <div className="relative space-y-10">
          <div>
            <h1 className="brand text-white leading-[1.15] mb-3" style={{ fontSize: '3rem', fontWeight: 300 }}>
              Deposition Intelligence<br/>for Modern Litigation
            </h1>
            <p className="brand text-white/40 text-base leading-relaxed max-w-sm" style={{ fontWeight: 300 }}>
              Purpose-built tools for deposition firms and litigation teams.
            </p>
          </div>
          <div className="space-y-6">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <div className="w-8 h-8 rounded bg-white/8 border border-white/10 flex items-center justify-center text-white/50 shrink-0 mt-0.5">
                  <f.icon size={14}/>
                </div>
                <div>
                  <div className="text-white/90 text-sm font-medium mb-0.5">{f.title}</div>
                  <div className="text-white/40 text-sm leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative">
          <div className="w-8 h-px bg-white/15 mb-4"/>
          <p className="text-white/25 text-xs tracking-widest uppercase">Trusted by leading litigation firms</p>
        </div>
      </div>

      {/* Right — Auth form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-[340px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded bg-[#0c1527] flex items-center justify-center text-white">
              <Ic.scale size={15}/>
            </div>
            <span className="brand text-[1.4rem] text-[#0c1527]">Cognition</span>
          </div>

          <div className="mb-8">
            <h2 className="brand text-[1.9rem] text-slate-900 mb-1" style={{ fontWeight: 300 }}>Welcome back</h2>
            <p className="text-slate-500 text-sm">Sign in to your account to continue</p>
          </div>

          <form onSubmit={submit} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Email address</label>
              <Input type="email" placeholder="name@organization.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider">Password</label>
              <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <Button type="submit" className="w-full h-10 !bg-[#0c1527] hover:!bg-[#1e3a8a] !rounded-md" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <div className="border-t border-slate-100 pt-6">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">Demo access</p>
            <div className="space-y-2">
              {[
                ['admin@smithdepo.com',  'Deposition Firm — Admin',  Ic.film],
                ['editor@smithdepo.com', 'Deposition Firm — Editor', Ic.film],
                ['admin@lawfirm.com',    'Law Firm — Admin',         Ic.scale],
                ['reader@lawfirm.com',   'Law Firm — Reader',        Ic.scale],
              ].map(([em, label, Icn]) => (
                <button key={em} onClick={() => demo(em, label)}
                  className="w-full text-left px-3 py-2.5 text-sm text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center gap-2.5">
                  <Icn size={13} className="text-slate-400 shrink-0"/>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-slate-500 text-center">
            New to Cognition?{' '}
            <button className="text-[#1e3a8a] hover:text-[#1e40af] font-medium transition-colors">Create your organization</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------- Cases ----------
function CaseLibrary({ onSelect }) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const canEdit = user?.role === 'admin' || user?.role === 'editor';
  const list = MOCK_CASES.filter((c) => [c.caseName, c.caseNumber, c.client, c.type].some((s) => s.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="border-b bg-white px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Cases</h1>
          <Badge>{MOCK_CASES.length}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Ic.search/></span>
            <Input placeholder="Search cases..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10"/>
          </div>
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('grid')} className="h-8 w-8 p-0"><Ic.grid size={14}/></Button>
            <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('list')} className="h-8 w-8 p-0"><Ic.list size={14}/></Button>
          </div>
          {canEdit && <Button><Ic.plus size={14}/> New Case</Button>}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map((c) => (
              <Card key={c.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect(c.id)}>
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-[#1e3a8a]/10 flex items-center justify-center shrink-0 text-[#1e3a8a]"><Ic.folder size={22}/></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-slate-900 leading-snug line-clamp-2">{c.caseName}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">ID: {c.caseNumber}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-700 p-1" onClick={(e) => e.stopPropagation()}><Ic.more size={16}/></button>
                  </div>
                  <div className="space-y-2 text-sm pt-3 border-t border-slate-100">
                    <div className="flex gap-2"><span className="text-slate-500 w-16 shrink-0">Client:</span><span className="truncate">{c.client}</span></div>
                    <div className="flex gap-2"><span className="text-slate-500 w-16 shrink-0">Updated:</span><span>{c.lastActivity}</span></div>
                    <div className="flex items-center gap-2 text-slate-700"><Ic.fileText size={14}/><span>{c.depositionCount} {c.depositionCount === 1 ? 'Deposition' : 'Depositions'}</span></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {list.map((c) => (
              <Card key={c.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(c.id)}>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-[#1e3a8a]/10 flex items-center justify-center shrink-0 text-[#1e3a8a]"><Ic.folder size={26}/></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 mb-1">{c.caseName}</h3>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>ID: {c.caseNumber}</span><span>•</span>
                      <span>Client: {c.client}</span><span>•</span>
                      <span className="flex items-center gap-1"><Ic.fileText size={12}/>{c.depositionCount} Depositions</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 shrink-0"><Ic.calendar size={12}/>Updated {c.lastActivity}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Deposition Library ----------
function DepositionLibrary({ caseId, onSelect, onBack }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [view, setView] = useState('grid');
  const selectedCase = MOCK_CASES.find((c) => c.id === caseId);
  const all = selectedCase ? MOCK_DEPOSITIONS.filter((d) => d.caseNumber === selectedCase.caseNumber) : MOCK_DEPOSITIONS;
  const list = all.filter((d) => {
    const m = [d.title, d.witness, d.caseNumber].some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const s = status === 'all' || d.status === status;
    return m && s;
  });
  const fmt = (m) => { const h = Math.floor(m/60); const r = m%60; return h ? `${h}h ${r}m` : `${r}m`; };
  const tBadge = (src) => src === 'verified'
    ? <Badge variant="green"><Ic.checkC size={10}/> Verified</Badge>
    : src === 'mixed'
      ? <Badge variant="amber"><Ic.alert size={10}/> Mixed</Badge>
      : <Badge variant="blue"><Ic.sparkles size={10}/> AI Generated</Badge>;

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="border-b bg-white px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}><Ic.arrowL size={18}/></Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Depositions — {selectedCase?.caseNumber}</h1>
            <p className="text-sm text-slate-500">{selectedCase?.caseName}</p>
          </div>
          <Badge>{all.length}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-80">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Ic.search/></span>
            <Input placeholder="Search depositions..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10"/>
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm">
            <option value="all">All Status</option><option value="ready">Ready</option><option value="processing">Processing</option><option value="draft">Draft</option>
          </select>
          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('grid')} className="h-8 w-8 p-0"><Ic.grid size={14}/></Button>
            <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('list')} className="h-8 w-8 p-0"><Ic.list size={14}/></Button>
          </div>
          <Button><Ic.plus size={14}/> Upload New</Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map((d) => (
              <Card key={d.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect(d.id)}>
                <div className="aspect-video relative bg-slate-200 overflow-hidden">
                  <div className="absolute inset-0" style={{
                    background: 'repeating-linear-gradient(135deg, #cbd5e1 0 12px, #e2e8f0 12px 24px)'
                  }}/>
                  <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                    <div className="bg-white/85 rounded-full w-12 h-12 flex items-center justify-center"><Ic.play size={20}/></div>
                  </div>
                  <div className="absolute top-2 left-2"><Badge variant="outline" className="bg-white/90">{d.status}</Badge></div>
                  <div className="absolute top-2 right-2">{tBadge(d.transcriptSource)}</div>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-slate-900 truncate">{d.title}</h3>
                      <p className="text-xs text-slate-500 truncate">{d.witness}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Ic.calendar size={12}/>{d.date}</span>
                    <span className="flex items-center gap-1"><Ic.clock size={12}/>{fmt(d.duration)}</span>
                  </div>
                  <div className="text-xs pt-2 border-t border-slate-100"><span className="text-slate-500">Case: </span><span className="text-slate-700">{d.caseNumber}</span></div>
                  {d.tags && (
                    <div className="flex flex-wrap gap-1">
                      {d.tags.slice(0,2).map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                      {d.tags.length > 2 && <Badge variant="outline">+{d.tags.length - 2}</Badge>}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {list.map((d) => (
              <Card key={d.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(d.id)}>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-32 h-20 rounded-md bg-slate-200 shrink-0 relative overflow-hidden" style={{ background: 'repeating-linear-gradient(135deg, #cbd5e1 0 8px, #e2e8f0 8px 16px)' }}>
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600"><Ic.play size={18}/></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 mb-1 truncate">{d.title}</h3>
                    <p className="text-sm text-slate-500 mb-1">{d.witness}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>Case: {d.caseNumber}</span>
                      <span className="flex items-center gap-1"><Ic.calendar size={12}/>{d.date}</span>
                      <span className="flex items-center gap-1"><Ic.clock size={12}/>{fmt(d.duration)}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 max-w-xs justify-end">
                    {tBadge(d.transcriptSource)}
                    {d.tags?.slice(0,2).map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Deposition Detail ----------
function VideoPanel({ depo, currentTime, setCurrentTime, playing, setPlaying }) {
  const [videoIdx, setVideoIdx] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const duration = 540;
  const v = depo.videos?.[videoIdx];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setCurrentTime((t) => {
        if (t >= duration) { setPlaying(false); return t; }
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, setCurrentTime, setPlaying]);

  const fmt = (s) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;

  return (
    <div className="flex flex-col gap-4 h-full">
      {depo.videos?.length > 1 && (
        <Card className="p-3 bg-teal-50 border-teal-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-900 text-sm font-medium"><Ic.film size={14}/>Video {videoIdx + 1} of {depo.videos.length}</div>
            <Badge variant="outline" className="bg-white border-teal-300 text-teal-700">Part {v.part}</Badge>
          </div>
        </Card>
      )}

      <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"/>
        <div className="relative z-10 text-center">
          <div className={cls('w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto transition-all', playing ? 'bg-teal-500/30 animate-pulse' : 'bg-[#1e3a8a]/30')}>
            {playing ? <Ic.pause size={32}/> : <Ic.play size={32}/>}
          </div>
          <p className="text-white/60 text-sm">Deposition Video</p>
          <p className="text-white/40 text-xs mt-1">{depo.witness} — {depo.date}</p>
          {playing && <p className="text-white/80 mt-2 text-xs">▶ Playing...</p>}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-xs min-w-[36px]">{fmt(currentTime)}</span>
          <input type="range" min="0" max={duration} value={currentTime} onChange={(e) => setCurrentTime(Number(e.target.value))} className="flex-1 accent-[#0d9488]"/>
          <span className="text-slate-500 text-xs min-w-[36px]">{fmt(duration)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant={playing ? 'secondary' : 'primary'} onClick={() => setPlaying(!playing)}>
            {playing ? <Ic.pause size={14}/> : <Ic.play size={14}/>} {playing ? 'Pause' : 'Play'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => { setCurrentTime(0); setPlaying(true); }}><Ic.skipBack size={14}/> Restart</Button>
          <Button size="sm" variant="outline" disabled={videoIdx === 0} onClick={() => { setVideoIdx(videoIdx - 1); setCurrentTime(0); }}><Ic.chevL size={14}/> Prev</Button>
          <Button size="sm" variant="outline" disabled={videoIdx >= (depo.videos?.length || 1) - 1} onClick={() => { setVideoIdx(videoIdx + 1); setCurrentTime(0); }}>Next <Ic.chevR size={14}/></Button>
        </div>
      </div>

      <Card>
        <button onClick={() => setSummaryOpen((o) => !o)} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-lg">
          <div className="flex items-center gap-2 text-slate-900 font-medium text-sm"><Ic.fileText size={16}/>Deposition Summary</div>
          {summaryOpen ? <Ic.chevU size={14}/> : <Ic.chevD size={14}/>}
        </button>
        {summaryOpen && <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">{MOCK_DETAIL.summary}</div>}
      </Card>
    </div>
  );
}

function TranscriptViewer({ topics, currentTime, setCurrentTime }) {
  return (
    <div className="flex flex-col gap-6">
      {topics.map((topic) => (
        <div key={topic.id}>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-sm font-semibold text-slate-900">{topic.title}</h3>
            <Badge variant="outline">{topic.segments.length} segments</Badge>
          </div>
          {topic.summary && <p className="text-xs text-slate-500 mb-3 leading-relaxed">{topic.summary}</p>}
          <div className="flex flex-col gap-2">
            {topic.segments.map((s) => {
              const active = currentTime >= s.timestamp - 3 && currentTime <= s.timestamp + 6;
              const isW = s.speaker === 'Witness';
              return (
                <button key={s.id} onClick={() => setCurrentTime(s.timestamp)} className={cls('text-left rounded-lg border p-3 transition-all', active ? 'border-[#0d9488] bg-teal-50' : 'border-slate-200 bg-white hover:border-slate-300')}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Badge variant={isW ? 'amber' : 'blue'}>{s.speaker}</Badge>
                      <span className="text-xs text-slate-400">p.{s.page} · l.{s.line}</span>
                      {s.source === 'verified'
                        ? <Badge variant="green"><Ic.checkC size={10}/>Verified</Badge>
                        : <Badge variant="blue"><Ic.sparkles size={10}/>AI</Badge>}
                    </div>
                    <span className="text-xs text-slate-400 tabular-nums">{Math.floor(s.timestamp/60)}:{String(s.timestamp%60).padStart(2,'0')}</span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed">{s.text}</p>
                  {s.cues?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {s.cues.map((c, i) => (
                        <span key={i} className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                          <Ic.alert size={10}/> {c.type}: {c.description}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function GoalsTab({ goals }) {
  return (
    <div className="flex flex-col gap-3">
      {goals.map((g) => (
        <Card key={g.id} className="p-3">
          <div className="flex items-start gap-3">
            <div className={cls('w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5', g.covered ? 'bg-emerald-500 text-white' : 'border-2 border-slate-300')}>
              {g.covered && <Ic.check size={12}/>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900">{g.title}</div>
              {g.notes && <div className="text-xs text-slate-500 mt-1">{g.notes}</div>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function FlaggedTab({ items, jump }) {
  const sevColor = { high: 'bg-rose-50 border-rose-200 text-rose-700', medium: 'bg-amber-50 border-amber-200 text-amber-700', low: 'bg-slate-50 border-slate-200 text-slate-700' };
  return (
    <div className="flex flex-col gap-2">
      {items.map((f) => (
        <button key={f.id} onClick={() => jump(f.timestamp)} className="text-left">
          <div className={cls('rounded-lg border p-3 hover:shadow-sm transition', sevColor[f.severity])}>
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <Ic.flag size={12}/>
                <span className="text-xs font-medium uppercase tracking-wide">{f.type.replace('-', ' ')}</span>
                <Badge variant="outline" className="capitalize">{f.severity}</Badge>
              </div>
              <span className="text-xs tabular-nums">{Math.floor(f.timestamp/60)}:{String(f.timestamp%60).padStart(2,'0')}</span>
            </div>
            <div className="text-sm leading-snug">{f.description}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function SentimentTab({ data }) {
  const w = 360, h = 160, pad = 20;
  const xMax = data[data.length - 1].t;
  const x = (t) => pad + (t / xMax) * (w - pad * 2);
  const y = (v) => pad + ((1 - v) / 2) * (h - pad * 2);
  const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(d.t).toFixed(1)},${y(d.v).toFixed(1)}`).join(' ');
  const area = `${path} L${x(xMax).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Sentiment Over Time</h3>
        <p className="text-xs text-slate-500 mt-0.5">Emotional tone tracked across the deposition</p>
      </div>
      <Card className="p-4">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
          <line x1={pad} y1={y(0)} x2={w - pad} y2={y(0)} stroke="#cbd5e1" strokeDasharray="3 3"/>
          <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#e2e8f0"/>
          <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#e2e8f0"/>
          <path d={area} fill="#0d9488" opacity="0.12"/>
          <path d={path} fill="none" stroke="#0d9488" strokeWidth="2"/>
          {data.map((d, i) => (
            <circle key={i} cx={x(d.t)} cy={y(d.v)} r="3" fill={d.v < 0 ? '#e11d48' : '#0d9488'}/>
          ))}
          <text x={pad} y={pad - 6} className="text-[9px] fill-slate-400">+1 positive</text>
          <text x={pad} y={h - 4} className="text-[9px] fill-slate-400">-1 negative</text>
        </svg>
      </Card>
      <div className="flex flex-col gap-1.5">
        {data.filter((d) => d.label).map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className={cls('w-2 h-2 rounded-full', d.v < -0.2 ? 'bg-rose-500' : d.v > 0.2 ? 'bg-emerald-500' : 'bg-slate-400')}/>
            <span className="text-slate-500 tabular-nums">{Math.floor(d.t/60)}:{String(d.t%60).padStart(2,'0')}</span>
            <span className="text-slate-700">{d.label}</span>
            <span className="text-slate-400 ml-auto">{d.v.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineTab({ events, jump }) {
  return (
    <div className="flex flex-col gap-2">
      {events.map((e) => (
        <Card key={e.id} className={cls('p-3', e.contradiction && 'border-rose-300 bg-rose-50/50')}>
          <div className="flex items-start gap-3">
            <div className="text-xs text-slate-500 shrink-0 w-24">
              <div className="font-medium text-slate-700">{e.date}</div>
              {e.time && <div>{e.time}</div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-slate-900">{e.title}</span>
                <Badge variant="outline" className="capitalize">{e.category}</Badge>
                {e.contradiction && <Badge variant="destructive"><Ic.alert size={10}/> Contradiction</Badge>}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{e.description}</p>
              {e.contradiction && <p className="text-xs text-rose-700 mt-2 leading-relaxed">{e.contradictionDetails}</p>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function SummariesTab({ topics }) {
  return (
    <div className="flex flex-col gap-3">
      {topics.map((t) => (
        <Card key={t.id} className="p-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-1">{t.title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{t.summary}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{t.segments.length} segments</Badge>
            <span className="text-xs text-slate-400 tabular-nums">{Math.floor(t.segments[0].timestamp/60)}:{String(t.segments[0].timestamp%60).padStart(2,'0')}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ChatTab() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi — ask me anything about this deposition. I can summarize topics, find moments, and surface contradictions.' },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const send = async () => {
    if (!input.trim()) return;
    const q = input.trim();
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setBusy(true);
    try {
      const reply = await window.claude.complete({
        messages: [
          { role: 'user', content: `You are an AI legal analyst reviewing a deposition. The witness is Sarah Chen, Senior Project Manager at TechCorp. Notable flagged items: defensive responses about contract terms, pause before answering about 2PM meeting, contradiction about arrival time. Question: ${q}\n\nRespond in 2-3 sentences, conversational tone.` },
        ],
      });
      setMessages((m) => [...m, { role: 'ai', text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'ai', text: 'Sorry, I had trouble responding. Try again.' }]);
    }
    setBusy(false);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
        {messages.map((m, i) => (
          <div key={i} className={cls('rounded-lg px-3 py-2 text-sm leading-relaxed max-w-[90%]', m.role === 'ai' ? 'bg-slate-100 text-slate-800 self-start' : 'bg-[#1e3a8a] text-white self-end')}>{m.text}</div>
        ))}
        {busy && <div className="bg-slate-100 text-slate-500 text-sm rounded-lg px-3 py-2 self-start">Thinking…</div>}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Ask about this deposition..." />
        <Button onClick={send} disabled={busy || !input.trim()}><Ic.send size={14}/></Button>
      </div>
    </div>
  );
}

function DepositionDetail({ id, onBack }) {
  const depo = MOCK_DEPOSITIONS.find((d) => d.id === id);
  const { user } = useAuth();
  const canEdit = user?.role === 'admin' || user?.role === 'editor';
  const [tab, setTab] = useState('goals');
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);

  const jump = (t) => { setCurrentTime(t); setPlaying(true); };

  const tabs = [
    { id: 'goals',     label: 'Goals' },
    { id: 'flagged',   label: 'Flagged', count: MOCK_DETAIL.flaggedItems.length },
    { id: 'sentiment', label: 'Sentiment' },
    { id: 'timeline',  label: 'Timeline' },
    { id: 'summaries', label: 'Summaries' },
    { id: 'chat',      label: 'AI Chat' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <header className="border-b bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}><Ic.arrowL size={18}/></Button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{depo.title}</h2>
            <div className="flex items-center gap-2 flex-wrap text-sm text-slate-500">
              <span>{depo.date} · Case {depo.caseNumber}</span>
              {depo.tags?.map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canEdit && <Button variant="outline"><Ic.upload size={14}/> Upload Verified Transcript</Button>}
          <Button variant="outline"><Ic.fileText size={14}/> Export Report</Button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-6 p-6 overflow-hidden">
        <div className="col-span-3 overflow-y-auto pr-1">
          <VideoPanel depo={depo} currentTime={currentTime} setCurrentTime={setCurrentTime} playing={playing} setPlaying={setPlaying}/>
        </div>

        <div className="col-span-5 flex flex-col overflow-hidden">
          <div className="mb-4 flex items-start justify-between gap-4 shrink-0">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Organized Transcript</h2>
              <p className="text-sm text-slate-500">Auto-transcribed and organized by topic</p>
            </div>
            <Button variant="destructive" onClick={() => setTab('flagged')}>
              <Ic.alert size={14}/> {MOCK_DETAIL.flaggedItems.length} Flagged Items
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2">
            <TranscriptViewer topics={MOCK_DETAIL.topics} currentTime={currentTime} setCurrentTime={setCurrentTime}/>
          </div>
        </div>

        <div className="col-span-4 flex flex-col bg-slate-50 border-l-2 border-slate-200 overflow-hidden -my-6 -mr-6 px-4 py-4">
          <div className="flex items-center gap-1 border-b-2 border-slate-200 -mx-4 px-4 mb-3 overflow-x-auto">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={cls('relative px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors', tab === t.id ? 'text-[#1e3a8a]' : 'text-slate-500 hover:text-slate-800')}>
                {t.label}
                {t.count > 0 && <Badge variant="destructive" className="ml-1.5">{t.count}</Badge>}
                {tab === t.id && <span className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-[#1e3a8a]"/>}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto pr-1">
            {tab === 'goals'     && <GoalsTab goals={MOCK_DETAIL.goals}/>}
            {tab === 'flagged'   && <FlaggedTab items={MOCK_DETAIL.flaggedItems} jump={jump}/>}
            {tab === 'sentiment' && <SentimentTab data={MOCK_DETAIL.sentiment}/>}
            {tab === 'timeline'  && <TimelineTab events={MOCK_DETAIL.timeline} jump={jump}/>}
            {tab === 'summaries' && <SummariesTab topics={MOCK_DETAIL.topics}/>}
            {tab === 'chat'      && <ChatTab/>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Root ----------
function AppContent() {
  const { user } = useAuth();
  const [view, setView] = useState('cases');
  const [caseId, setCaseId] = useState(null);
  const [depoId, setDepoId] = useState(null);

  if (!user) return <LoginPage/>;

  return (
    <div className="h-full flex flex-col bg-slate-50" data-screen-label={view}>
      <TopNav onLogo={() => { setView('cases'); setCaseId(null); setDepoId(null); }} onUserManagement={() => {}}/>
      {view === 'cases' && <CaseLibrary onSelect={(id) => { setCaseId(id); setView('depositions'); }}/>}
      {view === 'depositions' && <DepositionLibrary caseId={caseId} onSelect={(id) => { setDepoId(id); setView('detail'); }} onBack={() => { setView('cases'); setCaseId(null); }}/>}
      {view === 'detail' && <DepositionDetail id={depoId} onBack={() => { setView('depositions'); setDepoId(null); }}/>}
    </div>
  );
}

function App() {
  return <ToastProvider><AuthProvider><AppContent/></AuthProvider></ToastProvider>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
