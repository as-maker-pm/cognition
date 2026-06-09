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
  volume:   (p) => <I {...p} d={<><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></>}/>,
  volumeX:  (p) => <I {...p} d={<><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></>}/>,
  maximize: (p) => <I {...p} d={<><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></>}/>,
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
          <div key={t.id} className={`min-w-[280px] max-w-sm rounded-lg border bg-[#F8F8F7] shadow-lg px-4 py-3 ${t.kind === 'err' ? 'border-rose-200' : 'border-[#E2E1DF]'}`}>
            <div className={`text-sm font-medium ${t.kind === 'err' ? 'text-rose-700' : 'text-[#14110D]'}`}>{t.title}</div>
            {t.desc && <div className="text-xs text-[#6B5744] mt-0.5">{t.desc}</div>}
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
    primary:    'bg-[#14110D] text-white hover:bg-[#2C2316]',
    secondary:  'bg-[#E2E1DF]/50 text-[#14110D] hover:bg-[#E2E1DF]',
    outline:    'border border-[#E2E1DF] bg-[#F8F8F7] text-[#3D2E1E] hover:bg-[#E9E8E7]',
    ghost:      'text-[#6B5744] hover:bg-[#E2E1DF]/40 hover:text-[#14110D]',
    teal:       'bg-[#7A2E20] text-white hover:bg-[#5A1F14]',
    destructive:'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100',
  };
  return <button className={cls(base, sizes[size], variants[variant], className)} {...rest}>{children}</button>;
};

const Input = ({ className = '', ...rest }) => (
  <input className={cls('h-9 w-full rounded-md border border-[#E2E1DF] bg-white px-3 text-sm outline-none focus:border-[#7A2E20]/40 focus:ring-2 focus:ring-[#7A2E20]/8 transition-colors text-[#14110D] placeholder:text-[#9A8573]', className)} {...rest}/>
);

const Badge = ({ variant = 'secondary', className = '', children }) => {
  const v = {
    secondary:   'bg-[#E2E1DF]/50 text-[#3D2E1E] border border-[#E2E1DF]',
    outline:     'bg-[#F8F8F7] border border-[#E2E1DF] text-[#3D2E1E]',
    destructive: 'bg-rose-600 text-white',
    green:       'bg-emerald-50 border border-emerald-300 text-emerald-700',
    amber:       'bg-amber-50 border border-amber-300 text-amber-700',
    blue:        'bg-blue-50 border border-blue-300 text-blue-700',
  }[variant];
  return <span className={cls('inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium', v, className)}>{children}</span>;
};

const Card = ({ className = '', children, ...rest }) => (
  <div className={cls('rounded-lg border border-slate-100 bg-white', className)} {...rest}>{children}</div>
);

// ---------- Top Nav ----------
function TopNav({ onLogo, onUserManagement, breadcrumb = [] }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = user ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '';
  const RoleIcon = { admin: Ic.shield, editor: Ic.edit, reader: Ic.eye }[user?.role] || (() => null);

  return (
    <header className="border-b border-[#E2E1DF] bg-[#F8F8F7] sticky top-0 z-40 h-14">
      <div className="px-6 h-full flex items-center gap-3">
        {/* Logo */}
        <button onClick={onLogo} className="hover:opacity-75 transition-opacity shrink-0">
          <span className="brand text-[1.35rem] text-[#14110D]">Cognition</span>
        </button>

        {/* Divider + Breadcrumb */}
        {breadcrumb.length > 0 && (
          <>
            <div className="w-px h-5 bg-[#E2E1DF] shrink-0"/>
            <nav className="flex items-center gap-1.5 min-w-0">
              {breadcrumb.map((item, idx) => {
                const isLast = idx === breadcrumb.length - 1;
                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-[#C4B5A2] text-sm shrink-0">›</span>}
                    {isLast ? (
                      <span className="text-sm font-medium text-[#14110D] truncate max-w-[200px]">{item.label}</span>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="text-sm text-[#6B5744] hover:text-[#14110D] transition-colors truncate max-w-[200px]"
                      >
                        {item.label}
                      </button>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </>
        )}

        {/* Spacer */}
        <div className="flex-1"/>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8573]"><Ic.search size={14}/></span>
            <Input placeholder="Search depositions..." className="pl-9 h-8 text-sm"/>
          </div>
          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Ic.bell size={16}/>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-medium flex items-center justify-center">3</span>
          </Button>
          <div className="relative">
            <button onClick={() => setMenuOpen((o) => !o)} className="w-8 h-8 rounded-full bg-[#14110D] text-white text-xs font-medium flex items-center justify-center hover:bg-[#2C2316] transition-colors">
              {initials || <Ic.user size={14}/>}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-[#F8F8F7] border border-[#E2E1DF] rounded-lg shadow-lg p-1 z-50" onMouseLeave={() => setMenuOpen(false)}>
                <div className="px-3 py-2.5">
                  <div className="text-sm font-medium text-[#14110D]">{user?.name}</div>
                  <div className="text-xs text-[#6B5744] mt-0.5">{user?.email}</div>
                  <div className="flex items-center gap-1.5 text-xs text-[#9A8573] mt-1">
                    <RoleIcon size={11}/>
                    <span className="capitalize">{user?.role}</span>
                    <span>·</span>
                    <span>{user?.organization.name}</span>
                  </div>
                </div>
                <div className="h-px bg-[#E2E1DF]/60 my-1"/>
                {user?.role === 'admin' && (
                  <button onClick={() => { setMenuOpen(false); onUserManagement(); }} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-[#E2E1DF]/40 flex items-center gap-2 text-[#3D2E1E]">
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

  const slides = [
    {
      heading: 'Deposition Intelligence for Modern Litigation',
      sub: 'Purpose-built tools that give deposition firms and litigation teams a decisive edge — from first upload to final report.',
    },
    {
      heading: 'Every Word, Organized and Attributed',
      sub: 'Transcripts are automatically structured by topic, with every segment tagged by speaker, source confidence, and behavioral cue.',
    },
    {
      heading: 'Surface Contradictions Before They Surface You',
      sub: 'AI flags timeline conflicts, evasive responses, and inconsistencies the moment they appear — so nothing slips through.',
    },
    {
      heading: 'Know Exactly Where You Stand on Every Goal',
      sub: 'Set deposition objectives upfront and track coverage in real-time. Walk in prepared. Walk out with answers.',
    },
  ];

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Left — Carousel */}
      <div className="hidden lg:flex lg:w-[58%] flex-col justify-between p-14 relative overflow-hidden" style={{ background: '#0e0c0a' }}>

        {/* Orb 1 — large warm brown, top-right */}
        <div className="orb1 absolute pointer-events-none" style={{
          top: '-20%', right: '-15%', width: '75%', height: '75%',
          background: 'radial-gradient(circle, rgba(120,72,32,0.55) 0%, rgba(107,66,38,0.25) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}/>
        {/* Orb 2 — deep amber, bottom-left */}
        <div className="orb2 absolute pointer-events-none" style={{
          bottom: '-25%', left: '-20%', width: '80%', height: '80%',
          background: 'radial-gradient(circle, rgba(90,52,20,0.5) 0%, rgba(70,40,15,0.2) 45%, transparent 68%)',
          filter: 'blur(70px)',
        }}/>
        {/* Orb 3 — small bright accent, center */}
        <div className="orb3 absolute pointer-events-none" style={{
          top: '30%', left: '20%', width: '45%', height: '45%',
          background: 'radial-gradient(circle, rgba(160,95,40,0.2) 0%, transparent 65%)',
          filter: 'blur(45px)',
        }}/>
        {/* Shimmer streak — diagonal highlight */}
        <div className="shimmer absolute pointer-events-none" style={{
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(125deg, rgba(255,220,160,0.04) 0%, transparent 35%, rgba(140,80,30,0.06) 75%, transparent 100%)',
        }}/>
        {/* Fine grain texture */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.72\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: '160px 160px',
        }}/>
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(14,12,10,0.98), transparent)' }}/>

        {/* Logo */}
        <div className="relative">
          <span className="brand text-[1.6rem] text-white/90">Cognition</span>
        </div>

        {/* Slide content */}
        <div className="flex-1 flex flex-col justify-center py-12 w-full">
          <div className="w-full">
            <h1 key={`h-${slide}`} className="brand text-white leading-[1.12] mb-6 w-full" style={{ fontSize: '3.4rem', fontWeight: 400 }}>
              {slides[slide].heading}
            </h1>
            <p key={`p-${slide}`} className="text-white/65 leading-relaxed w-full" style={{ fontSize: '1.05rem' }}>
              {slides[slide].sub}
            </p>
          </div>
        </div>

        {/* Dots */}
        <div className="relative flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)}
              className="transition-all duration-300 rounded-full"
              style={{ width: slide === i ? '20px' : '5px', height: '5px', background: slide === i ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
      </div>

      {/* Right — Auth form */}
      <div className="flex-1 flex items-center justify-center bg-[#F0F0EE] p-8">
        <div className="w-full max-w-[340px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <span className="brand text-[1.4rem] text-[#14110D]">Cognition</span>
          </div>

          <div className="mb-8">
            <h2 className="brand text-[1.9rem] text-[#14110D] mb-1" style={{ fontWeight: 500 }}>Welcome back</h2>
            <p className="text-[#6B5744] text-sm">Sign in to your account to continue</p>
          </div>

          <form onSubmit={submit} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-[#6B5744] mb-1.5 uppercase tracking-wider">Email address</label>
              <Input type="email" placeholder="name@organization.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B5744] mb-1.5 uppercase tracking-wider">Password</label>
              <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <Button type="submit" className="w-full h-10 !bg-[#14110D] hover:!bg-[#2C2316] !rounded-md" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <div className="border-t border-[#E2E1DF] pt-6">
            <p className="text-xs text-[#9A8573] uppercase tracking-widest mb-3">Demo access</p>
            <div className="space-y-2">
              {[
                ['admin@smithdepo.com',  'Deposition Firm — Admin',  Ic.film],
                ['editor@smithdepo.com', 'Deposition Firm — Editor', Ic.film],
                ['admin@lawfirm.com',    'Law Firm — Admin',         Ic.scale],
                ['reader@lawfirm.com',   'Law Firm — Reader',        Ic.scale],
              ].map(([em, label, Icn]) => (
                <button key={em} onClick={() => demo(em, label)}
                  className="w-full text-left px-3 py-2.5 text-sm text-[#3D2E1E] border border-[#E2E1DF] rounded-md hover:bg-[#F8F8F7] hover:border-[#D0C5B0] bg-[#F8F8F7]/60 transition-colors flex items-center gap-2.5">
                  <Icn size={13} className="text-[#9A8573] shrink-0"/>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-[#6B5744] text-center">
            New to Cognition?{' '}
            <button className="text-[#14110D] hover:text-[#7A2E20] font-medium transition-colors">Create your organization</button>
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
    <div className="flex-1 flex flex-col bg-[#F0F0EE]">
      {/* Header */}
      <div className="border-b border-[#E2E1DF] bg-[#F8F8F7] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold text-[#14110D]">Cases</h1>
          <span className="inline-flex items-center rounded-full bg-[#E2E1DF]/50 border border-[#E2E1DF] px-2.5 py-0.5 text-xs font-medium text-[#6B5744]">{MOCK_CASES.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8573]"><Ic.search size={14}/></span>
            <Input placeholder="Search cases..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9"/>
          </div>
          <div className="flex items-center gap-1 border border-[#E2E1DF] rounded-md p-1 bg-[#F8F8F7]">
            <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('grid')} className="h-7 w-7 p-0"><Ic.grid size={13}/></Button>
            <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('list')} className="h-7 w-7 p-0"><Ic.list size={13}/></Button>
          </div>
          {canEdit && <Button><Ic.plus size={14}/> New Case</Button>}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelect(c.id)}
                className="group rounded-xl border border-[#E2E1DF] bg-[#F8F8F7] cursor-pointer hover:border-[#D0C5B0] hover:shadow-md transition-all duration-150"
              >
                <div className="p-4 flex flex-col gap-3">
                  {/* Top row: case type label + deposition count badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wide font-medium text-[#9A8573]">{c.type || 'Civil'}</span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#E2E1DF]/40 border border-[#E2E1DF] px-2 py-0.5 text-xs font-medium text-[#6B5744]">
                      <Ic.fileText size={10}/>{c.depositionCount}
                    </span>
                  </div>
                  {/* Case name */}
                  <h3 className="text-base font-semibold text-[#14110D] leading-snug line-clamp-2">{c.caseName}</h3>
                  {/* Divider */}
                  <div className="h-px bg-[#E2E1DF]/60"/>
                  {/* Meta */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#6B5744]">
                      <Ic.user size={11}/>
                      <span className="truncate">{c.client}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#9A8573]">
                      <Ic.clock size={11}/>
                      <span>Updated {c.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {list.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelect(c.id)}
                className="group rounded-xl border border-[#E2E1DF] bg-[#F8F8F7] cursor-pointer hover:border-[#D0C5B0] hover:shadow-sm transition-all duration-150"
              >
                <div className="px-4 py-3 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#14110D] truncate">{c.caseName}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#6B5744] mt-0.5">
                      <span className="uppercase tracking-wide text-[#9A8573]">{c.type || 'Civil'}</span>
                      <span className="text-[#C4B5A2]">·</span>
                      <span>{c.client}</span>
                      <span className="text-[#C4B5A2]">·</span>
                      <span className="flex items-center gap-1"><Ic.fileText size={11}/>{c.depositionCount} depositions</span>
                      <span className="text-[#C4B5A2]">·</span>
                      <span>Updated {c.lastActivity}</span>
                    </div>
                  </div>
                  <Ic.chevR size={14} className="text-[#C4B5A2] group-hover:text-[#6B5744] shrink-0 transition-colors"/>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- Deposition Library ----------
function DepositionLibrary({ caseId, onSelect, onBack, onAdd }) {
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

  const statusPills = ['all', 'ready', 'processing', 'draft'];
  const statusLabels = { all: 'All', ready: 'Ready', processing: 'Processing', draft: 'Draft' };

  // Derive witness initials from witness name
  const witnessInitials = (name) => name ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : '??';

  return (
    <div className="flex-1 flex flex-col bg-[#F0F0EE]">
      {/* Header — no back button, breadcrumb handles navigation */}
      <div className="border-b border-[#E2E1DF] bg-[#F8F8F7] px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-[#14110D]">{selectedCase?.caseName || 'Depositions'}</h1>
            {selectedCase && <p className="text-sm text-[#6B5744] mt-0.5">{selectedCase.caseNumber}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" onClick={onAdd}><Ic.upload size={14}/> Upload New</Button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between gap-4 mt-4">
          {/* Status pills */}
          <div className="flex items-center gap-1.5">
            {statusPills.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={cls(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                  status === s
                    ? 'bg-[#14110D] text-white'
                    : 'bg-[#F8F8F7] border border-[#E2E1DF] text-[#6B5744] hover:border-[#D0C5B0] hover:bg-[#E9E8E7]'
                )}
              >
                {statusLabels[s]}
                {s === 'all' && <span className="ml-1.5 text-[10px] opacity-70">{all.length}</span>}
              </button>
            ))}
          </div>
          {/* Right: search + view toggle */}
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8573]"><Ic.search size={14}/></span>
              <Input placeholder="Search depositions..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-8 text-sm"/>
            </div>
            <div className="flex items-center gap-1 border border-[#E2E1DF] rounded-md p-1 bg-[#F8F8F7]">
              <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('grid')} className="h-7 w-7 p-0"><Ic.grid size={13}/></Button>
              <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('list')} className="h-7 w-7 p-0"><Ic.list size={13}/></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {list.map((d) => (
              <div key={d.id} className="group rounded-xl border border-[#E2E1DF] bg-[#F8F8F7] cursor-pointer hover:border-[#D0C5B0] hover:shadow-md transition-all duration-150 overflow-hidden" onClick={() => onSelect(d.id)}>
                {/* Dark top section with initials */}
                <div className="bg-[#2C2316] h-24 relative flex items-center justify-center">
                  <span className="brand text-white/80 select-none" style={{ fontSize: '2.2rem', fontWeight: 400 }}>
                    {witnessInitials(d.witness)}
                  </span>
                  {/* Status badge top-left */}
                  <div className="absolute top-2 left-2">
                    <span className={cls(
                      'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
                      d.status === 'ready' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50' :
                      d.status === 'processing' ? 'bg-amber-900/60 text-amber-300 border border-amber-700/50' :
                      'bg-stone-700 text-stone-300 border border-stone-600'
                    )}>
                      {d.status}
                    </span>
                  </div>
                  {/* Transcript source badge top-right */}
                  <div className="absolute top-2 right-2">
                    {d.transcriptSource === 'verified'
                      ? <span className="inline-flex items-center gap-1 rounded-md bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 px-2 py-0.5 text-xs font-medium"><Ic.checkC size={10}/> Verified</span>
                      : d.transcriptSource === 'mixed'
                        ? <span className="inline-flex items-center gap-1 rounded-md bg-amber-900/60 border border-amber-700/50 text-amber-300 px-2 py-0.5 text-xs font-medium"><Ic.alert size={10}/> Mixed</span>
                        : <span className="inline-flex items-center gap-1 rounded-md bg-blue-900/60 border border-blue-700/50 text-blue-300 px-2 py-0.5 text-xs font-medium"><Ic.sparkles size={10}/> AI</span>
                    }
                  </div>
                </div>
                {/* Card body */}
                <div className="p-4 flex flex-col gap-2.5">
                  <div>
                    <h3 className="text-sm font-semibold text-[#14110D] truncate">{d.witness}</h3>
                    <p className="text-xs text-[#6B5744] truncate mt-0.5">{d.title}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#6B5744]">
                    <span className="flex items-center gap-1"><Ic.calendar size={11}/>{d.date}</span>
                    <span className="flex items-center gap-1"><Ic.clock size={11}/>{fmt(d.duration)}</span>
                  </div>
                  {d.tags && d.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1 border-t border-[#E2E1DF]/60">
                      {d.tags.slice(0,2).map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                      {d.tags.length > 2 && <Badge variant="outline">+{d.tags.length - 2}</Badge>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {list.map((d) => (
              <div key={d.id} className="group rounded-xl border border-[#E2E1DF] bg-[#F8F8F7] cursor-pointer hover:border-[#D0C5B0] hover:shadow-sm transition-all duration-150 overflow-hidden flex" onClick={() => onSelect(d.id)}>
                {/* Oxblood left strip */}
                <div className="w-2 bg-[#7A2E20]/30 shrink-0"/>
                <div className="flex-1 px-4 py-3 flex items-center gap-4 min-w-0">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#14110D] truncate">{d.witness}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#6B5744] mt-0.5 flex-wrap">
                      <span className="uppercase tracking-wide text-xs text-[#9A8573]">{d.title}</span>
                      <span className="text-[#C4B5A2]">·</span>
                      <span className="flex items-center gap-1"><Ic.calendar size={11}/>{d.date}</span>
                      <span className="flex items-center gap-1"><Ic.clock size={11}/>{fmt(d.duration)}</span>
                      <span className="text-[#C4B5A2]">·</span>
                      <span>Case {d.caseNumber}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {tBadge(d.transcriptSource)}
                    <span className={cls(
                      'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border',
                      d.status === 'ready' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      d.status === 'processing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-[#E2E1DF]/40 text-[#6B5744] border-[#E2E1DF]'
                    )}>
                      {d.status}
                    </span>
                    <Ic.chevR size={14} className="text-[#C4B5A2] group-hover:text-[#6B5744] transition-colors"/>
                  </div>
                </div>
              </div>
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
  const [volume, setVolume] = useState(70);
  const duration = 540;
  const videoRef = useRef(null);
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
    <div className="flex flex-col gap-3 h-full">
      {depo.videos?.length > 1 && (
        <div className="flex items-center justify-between text-xs text-[#6B5744]">
          <span className="flex items-center gap-1.5"><Ic.film size={12}/>Video {videoIdx + 1} of {depo.videos.length}</span>
          <Badge variant="outline">Part {v.part}</Badge>
        </div>
      )}

      <div className="bg-[#2C2316] rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C2316] to-[#14110D]"/>
        <div className="relative z-10 text-center">
          <div className={cls('w-16 h-16 rounded-full flex items-center justify-center mb-3 mx-auto transition-all', playing ? 'bg-[#7A2E20]/30 animate-pulse' : 'bg-white/10')}>
            {playing ? <Ic.pause size={26}/> : <Ic.play size={26}/>}
          </div>
          <p className="text-white/50 text-xs">{depo.witness}</p>
          {playing && <p className="text-white/70 mt-1 text-xs">▶ Playing</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[#9A8573] text-xs font-mono w-9 shrink-0">{fmt(currentTime)}</span>
          <input type="range" min="0" max={duration} value={currentTime} onChange={(e) => setCurrentTime(Number(e.target.value))} className="flex-1 accent-[#7A2E20]"/>
          <span className="text-[#9A8573] text-xs font-mono w-9 shrink-0 text-right">{fmt(duration)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button size="sm" variant={playing ? 'secondary' : 'primary'} onClick={() => setPlaying(!playing)} className="flex-1">
            {playing ? <Ic.pause size={13}/> : <Ic.play size={13}/>} {playing ? 'Pause' : 'Play'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => { setCurrentTime(0); setPlaying(false); }}>
            <Ic.skipBack size={13}/> Restart
          </Button>
          {(depo.videos?.length || 0) > 1 && <>
            <Button size="sm" variant="outline" disabled={videoIdx === 0} onClick={() => { setVideoIdx(videoIdx - 1); setCurrentTime(0); }}><Ic.chevL size={13}/> Prev</Button>
            <Button size="sm" variant="outline" disabled={videoIdx >= (depo.videos?.length || 1) - 1} onClick={() => { setVideoIdx(videoIdx + 1); setCurrentTime(0); }}>Next <Ic.chevR size={13}/></Button>
          </>}
        </div>
        {/* Volume + fullscreen row */}
        <div className="flex items-center gap-2 pt-1">
          <button onClick={() => setVolume(v => v === 0 ? 70 : 0)} className="text-[#9A8573] hover:text-[#14110D] transition-colors shrink-0">
            {volume === 0 ? <Ic.volumeX size={13}/> : <Ic.volume size={13}/>}
          </button>
          <input
            type="range" min="0" max="100" value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 accent-[#7A2E20]"
            style={{ height: '4px' }}
          />
          <span className="text-[10px] text-[#9A8573] font-mono w-6 text-right shrink-0">{volume}%</span>
          <button
            ref={videoRef}
            onClick={() => videoRef.current?.closest('.bg-\\[\\#2C2316\\]')?.requestFullscreen?.()}
            title="Fullscreen"
            className="ml-1 shrink-0 text-[#9A8573] hover:text-[#14110D] border border-[#E2E1DF] rounded p-1 transition-colors"
          >
            <Ic.maximize size={12}/>
          </button>
        </div>
      </div>

    </div>
  );
}

function TranscriptViewer({ topics, currentTime, setCurrentTime, playing }) {
  const [collapsed, setCollapsed] = useState({});
  const activeRef = useRef(null);

  useEffect(() => {
    if (playing && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentTime, playing]);

  const cueColor = (cue) => {
    const t = (cue.type || '').toLowerCase();
    const d = (cue.description || '').toLowerCase();
    if (t === 'confident' || d.includes('eye contact') || d.includes('direct') || d.includes('clear') || d.includes('confirm') || d.includes('acknowledge')) return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    if (t === 'defensive' || d.includes('raised voice') || d.includes('sharp') || d.includes('hostile') || d.includes('contradict')) return 'bg-rose-50 border-rose-200 text-rose-700';
    if (t === 'pause' || t === 'nervous' || t === 'stutter' || d.includes('hesit') || d.includes('avoid') || d.includes('shifted') || d.includes('evasive')) return 'bg-orange-50 border-orange-200 text-orange-700';
    if (t === 'emotional' || d.includes('emotion') || d.includes('distress') || d.includes('upset')) return 'bg-purple-50 border-purple-200 text-purple-700';
    return 'bg-amber-50 border-amber-200 text-amber-700';
  };

  const countExhibits = (segments) =>
    segments.reduce((c, s) => c + ((s.text || '').match(/Exh\b|Exhibit/gi) || []).length, 0);

  return (
    <div className="flex flex-col gap-5">
      {topics.map((topic) => {
        const isCollapsed = !!collapsed[topic.id];
        const exhibitCount = countExhibits(topic.segments);
        return (
          <div key={topic.id}>
            <button
              onClick={() => setCollapsed((c) => ({ ...c, [topic.id]: !c[topic.id] }))}
              className="w-full text-left pb-2 border-b border-[#E2E1DF] flex items-start justify-between gap-3 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#9A8573]">{topic.title}</span>
                  {exhibitCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-semibold bg-[#E2E1DF]/60 text-[#6B5744] px-1.5 py-0.5 rounded border border-[#E2E1DF]">
                      <Ic.fileText size={8}/>{exhibitCount} exhibit{exhibitCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                {topic.summary && (
                  <p className="text-[11px] text-[#9A8573] leading-relaxed line-clamp-2">{topic.summary}</p>
                )}
              </div>
              <span className="text-[#C4B5A2] group-hover:text-[#6B5744] transition-colors shrink-0 mt-0.5">
                {isCollapsed ? <Ic.chevD size={12}/> : <Ic.chevU size={12}/>}
              </span>
            </button>

            {!isCollapsed && (
              <div className="flex flex-col border-l-2 border-[#E2E1DF] ml-0.5 mt-2">
                {topic.segments.map((s) => {
                  const active = currentTime >= s.timestamp - 3 && currentTime <= s.timestamp + 6;
                  const isW = s.speaker === 'Witness';
                  return (
                    <button
                      key={s.id}
                      ref={active ? activeRef : null}
                      onClick={() => setCurrentTime(s.timestamp)}
                      className={cls(
                        'text-left pl-4 pr-2 py-3 border-l-2 -ml-0.5 transition-all rounded-r',
                        active ? 'border-[#7A2E20] bg-[#FDF0EC]' : 'border-transparent hover:border-[#E2E1DF] hover:bg-[#F0F0EE]'
                      )}
                    >
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className={cls('text-[11px] font-bold tracking-wide', isW ? 'text-[#7A2E20]' : 'text-[#6B5744]')}>
                          {s.speaker}
                        </span>
                        <span className="text-[10px] text-[#B5A899] tabular-nums font-mono shrink-0 ml-3">
                          {Math.floor(s.timestamp/60)}:{String(s.timestamp%60).padStart(2,'0')}
                        </span>
                      </div>
                      <p className="text-sm text-[#2A1F14] leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{s.text}</p>
                      {s.cues?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {s.cues.map((c, i) => (
                            <span key={i} className={cls('text-[10.5px] px-1.5 py-0.5 rounded border', cueColor(c))}>
                              ⚑ {c.description}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function GoalsTab({ goals }) {
  const covered = goals.filter((g) => g.covered).length;
  const pct = Math.round((covered / goals.length) * 100);
  return (
    <div className="flex flex-col gap-3">
      {/* Progress summary */}
      <div className="rounded-lg border border-slate-100 bg-white p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Goal Coverage</span>
          <span className="text-sm font-semibold text-slate-700">{covered}/{goals.length}</span>
        </div>
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: pct === 100 ? '#10b981' : '#64748b' }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5">{pct}% of deposition goals addressed</p>
      </div>
      {goals.map((g) => (
        <Card key={g.id} className="p-3">
          <div className="flex items-start gap-3">
            <div className={cls('w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5', g.covered ? 'bg-emerald-500 text-white' : 'border-2 border-slate-200')}>
              {g.covered && <Ic.check size={12}/>}
            </div>
            <div className="flex-1 min-w-0">
              <div className={cls('text-sm', g.covered ? 'text-slate-700' : 'text-slate-500')}>{g.title}</div>
              {g.notes && <div className={cls('text-xs mt-0.5', g.covered ? 'text-slate-400' : 'text-amber-600')}>{g.notes}</div>}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function FlaggedTab({ items, jump }) {
  const sevColor = { high: 'bg-rose-50 border-rose-200 text-rose-700', medium: 'bg-amber-50 border-amber-200 text-amber-700', low: 'bg-[#F0F0EE] border-[#E2E1DF] text-[#6B5744]' };
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
  const w = 360, h = 120, pad = 20;
  const xMax = data[data.length - 1].t;
  const x = (t) => pad + (t / xMax) * (w - pad * 2);
  const y = (v) => pad + ((1 - v) / 2) * (h - pad * 2);
  const path = data.map((d, i) => `${i ? 'L' : 'M'}${x(d.t).toFixed(1)},${y(d.v).toFixed(1)}`).join(' ');
  const area = `${path} L${x(xMax).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;

  const labeled = data.filter((d) => d.label);
  const sentColor = (v) => v < -0.2 ? '#be123c' : v > 0.2 ? '#10b981' : '#fbbf24';
  const sentLabel = (v) => v < -0.2 ? 'Negative' : v > 0.2 ? 'Positive' : 'Neutral';

  const avgSentiment = data.reduce((s, d) => s + d.v, 0) / data.length;
  const shifts = labeled.filter((d, i) => {
    if (i === 0) return false;
    const prev = labeled[i - 1];
    return Math.abs(d.v - prev.v) > 0.2;
  });
  const negCount = data.filter((d) => d.v < -0.2).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Baseline', value: sentLabel(avgSentiment), color: sentColor(avgSentiment) },
          { label: 'Negative moments', value: negCount, color: '#be123c' },
          { label: 'Sentiment range', value: `${Math.min(...data.map(d=>d.v)).toFixed(1)} → +${Math.max(...data.map(d=>d.v)).toFixed(1)}`, color: '#14110D' },
          { label: 'Key shifts', value: shifts.length, color: '#7A2E20' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-[#E2E1DF] bg-[#F8F8F7] px-3 py-2.5">
            <div className="text-[10px] text-[#9A8573] mb-1 uppercase tracking-wider">{s.label}</div>
            <div className="text-base font-bold" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Timeline ribbon */}
      <div>
        <p className="text-xs font-semibold text-[#6B5744] uppercase tracking-wider mb-2">Sentiment Timeline</p>
        <div className="flex rounded-lg overflow-hidden h-5" style={{ gap: '1px', background: '#E2E1DF' }}>
          {data.map((d, i) => {
            const next = data[i + 1];
            const width = next ? ((next.t - d.t) / xMax * 100) : (5);
            const bg = d.v < -0.2 ? '#fca5a5' : d.v > 0.2 ? '#6ee7b7' : '#fde68a';
            return <div key={i} style={{ width: `${width}%`, background: bg, minWidth: 2 }}/>;
          })}
        </div>
        <div className="flex justify-between text-[10px] text-[#9A8573] font-mono mt-1">
          <span>0:00</span><span>{Math.floor(xMax/60)}:{String(xMax%60).padStart(2,'0')}</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          {[['#6ee7b7', 'Positive'], ['#fde68a', 'Neutral'], ['#fca5a5', 'Negative']].map(([c, l]) => (
            <span key={l} className="flex items-center gap-1 text-[10px] text-[#6B5744]">
              <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: c }}/>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Trendline chart */}
      <Card className="p-3">
        <p className="text-xs font-semibold text-[#6B5744] mb-2">Emotional Curve</p>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
          <line x1={pad} y1={y(0)} x2={w - pad} y2={y(0)} stroke="#E2E1DF" strokeDasharray="3 3"/>
          <path d={area} fill="#7A2E20" opacity="0.1"/>
          <path d={path} fill="none" stroke="#7A2E20" strokeWidth="1.5"/>
          {data.map((d, i) => (
            <circle key={i} cx={x(d.t)} cy={y(d.v)} r="2.5" fill={sentColor(d.v)}/>
          ))}
          <text x={pad} y={pad - 4} fontSize="8" fill="#9A8573">+1</text>
          <text x={pad} y={h - 6} fontSize="8" fill="#9A8573">−1</text>
        </svg>
      </Card>

      {/* Key moments */}
      <div>
        <p className="text-xs font-semibold text-[#6B5744] uppercase tracking-wider mb-2">Key Moments</p>
        <div className="flex flex-col gap-1.5">
          {labeled.map((d, i) => (
            <div key={i} className="flex items-center gap-2 text-xs bg-[#F8F8F7] border border-[#E2E1DF] rounded-lg px-3 py-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: sentColor(d.v) }}/>
              <span className="text-[#9A8573] font-mono tabular-nums shrink-0">{Math.floor(d.t/60)}:{String(d.t%60).padStart(2,'0')}</span>
              <span className="text-[#3D2E1E] flex-1">{d.label}</span>
              <span className="text-[10px] font-mono text-[#9A8573]">{d.v > 0 ? '+' : ''}{d.v.toFixed(2)}</span>
            </div>
          ))}
        </div>
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
            <div className="text-xs text-[#6B5744] shrink-0 w-24">
              <div className="font-medium text-[#3D2E1E]">{e.date}</div>
              {e.time && <div>{e.time}</div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-[#14110D]">{e.title}</span>
                <Badge variant="outline" className="capitalize">{e.category}</Badge>
                {e.contradiction && <Badge variant="destructive"><Ic.alert size={10}/> Contradiction</Badge>}
              </div>
              <p className="text-xs text-[#6B5744] leading-relaxed">{e.description}</p>
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
          <h4 className="text-sm font-semibold text-[#14110D] mb-1">{t.title}</h4>
          <p className="text-xs text-[#6B5744] leading-relaxed">{t.summary}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{t.segments.length} segments</Badge>
            <span className="text-xs text-[#9A8573] tabular-nums font-mono">{Math.floor(t.segments[0].timestamp/60)}:{String(t.segments[0].timestamp%60).padStart(2,'0')}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ChatTab({ depo }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const flagCount  = MOCK_DETAIL.flaggedItems.length;
  const highFlags  = MOCK_DETAIL.flaggedItems.filter((f) => f.severity === 'high').length;
  const goalsTotal = MOCK_DETAIL.goals.length;
  const goalsDone  = MOCK_DETAIL.goals.filter((g) => g.covered).length;

  const suggestions = [
    'What were the most concerning moments?',
    `Were all ${goalsTotal} deposition goals achieved?`,
    'Summarize testimony on the key contract terms',
    'What contradictions were identified?',
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  const send = async (text) => {
    const q = (text !== undefined ? text : input).trim();
    if (!q || busy) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setBusy(true);
    try {
      const reply = await window.claude.complete({
        messages: [{
          role: 'user',
          content: `You are an AI legal analyst reviewing a deposition of ${depo.witness}. Context: ${MOCK_DETAIL.summary} There are ${flagCount} flagged items (${highFlags} high severity). Goals: ${goalsDone}/${goalsTotal} covered. Question: ${q}\n\nRespond in 2-3 sentences, conversational tone. Be specific and reference actual details from the deposition.`,
        }],
      });
      setMessages((m) => [...m, { role: 'ai', text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'ai', text: 'Sorry, I had trouble responding. Try again.' }]);
    }
    setBusy(false);
    inputRef.current?.focus();
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-4">
        {isEmpty ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-[#9A8573] mb-2">Ask anything about this deposition</p>
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)}
                className="text-left text-sm text-[#3D2E1E] bg-white border border-[#E2E1DF] rounded-xl px-3.5 py-2.5 hover:border-[#B0AFAD] hover:bg-[#F8F8F7] transition-colors leading-snug">
                {s}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {messages.map((m, i) => (
              <div key={i} className={cls('flex flex-col gap-1', m.role !== 'ai' && 'items-end')}>
                {m.role === 'ai' && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#14110D] flex items-center justify-center shrink-0">
                      <Ic.sparkles size={10} className="text-white"/>
                    </div>
                    <span className="text-[10px] font-semibold text-[#9A8573] uppercase tracking-wide">Cognition AI</span>
                  </div>
                )}
                <div className={cls(
                  'text-sm leading-relaxed rounded-2xl px-4 py-2.5',
                  m.role === 'ai'
                    ? 'text-[#14110D] bg-[#F0F0EE] rounded-tl-sm'
                    : 'text-white bg-[#14110D] max-w-[85%] rounded-tr-sm'
                )}>
                  {m.text}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#14110D] flex items-center justify-center shrink-0">
                    <Ic.sparkles size={10} className="text-white"/>
                  </div>
                  <span className="text-[10px] font-semibold text-[#9A8573] uppercase tracking-wide">Cognition AI</span>
                </div>
                <div className="bg-[#F0F0EE] rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0,1,2].map((i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#9A8573]" style={{ animation: 'bounce 1s ease-in-out infinite', animationDelay: `${i * 0.18}s` }}/>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef}/>
          </div>
        )}
      </div>

      <div className="border-t border-[#E2E1DF] px-4 py-3 shrink-0">
        <div className="flex items-end gap-2 bg-white border border-[#E2E1DF] rounded-2xl px-3.5 py-2.5 focus-within:border-[#9A8573] transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Ask about this deposition…"
            rows={1}
            className="flex-1 text-sm text-[#14110D] placeholder:text-[#9A8573] outline-none resize-none bg-transparent leading-5"
            style={{ minHeight: '20px' }}
          />
          <button onClick={() => send()} disabled={busy || !input.trim()}
            className="shrink-0 w-7 h-7 rounded-xl bg-[#14110D] text-white flex items-center justify-center hover:bg-[#2C2316] disabled:opacity-30 disabled:cursor-not-allowed transition-all mb-0.5">
            <Ic.send size={12}/>
          </button>
        </div>
        <p className="text-[10px] text-[#B5A899] mt-1.5 px-1">↵ send · ⇧↵ new line</p>
      </div>
      </div>
    </div>
  );
}

// ---------- Contradictions Tab ----------
function ContradictionsTab({ jump }) {
  const [filter, setFilter] = useState('all');
  const all = MOCK_DETAIL.contradictions || [];
  const list = filter === 'all' ? all : all.filter((c) => c.type === filter);
  const counts = { all: all.length, self: all.filter((c) => c.type === 'self').length, record: all.filter((c) => c.type === 'record').length };

  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const typePill = (type) => ({
    record:        <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-rose-50 text-rose-700">vs. Record</span>,
    self:          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700">Self</span>,
    'cross-witness': <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700">Cross</span>,
  }[type]);

  const statusBadge = (s) => s === 'verified'
    ? <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700"><Ic.checkC size={9}/>Verified</span>
    : <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700"><Ic.alert size={9}/>Probable</span>;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <Ic.alert size={13} className="text-rose-600"/>
          <span className="text-sm font-semibold text-rose-800">{all.length} Contradictions Detected</span>
        </div>
        <p className="text-xs text-rose-600 leading-relaxed">AI identified statements that conflict with prior testimony or documentary evidence. Review and add key items to your brief.</p>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        {[['all', 'All'], ['self', 'Self'], ['record', 'vs. Record']].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} className={cls(
            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors',
            filter === key ? 'bg-[#14110D] text-white' : 'bg-[#F8F8F7] border border-[#E2E1DF] text-[#6B5744] hover:bg-[#E9E8E7]'
          )}>
            {label}
            <span className={cls('font-mono text-[10px]', filter === key ? 'opacity-70' : 'text-[#9A8573]')}>{counts[key]}</span>
          </button>
        ))}
      </div>

      {list.map((c, idx) => (
        <div key={c.id} className="rounded-xl border border-[#E2E1DF] bg-[#F8F8F7] overflow-hidden">
          <div className="flex">
            <div className={cls('w-1 shrink-0', c.type === 'record' ? 'bg-rose-500' : 'bg-amber-500')}/>
            <div className="flex-1 p-3.5 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap mb-3">
                <span className="font-mono text-[10px] font-bold text-[#C4B5A2]">{String(idx+1).padStart(2,'0')}</span>
                {typePill(c.type)}
                <span className="text-xs font-medium text-[#6B5744]">{c.category}</span>
                {statusBadge(c.status)}
              </div>
              <p className="text-xs font-semibold text-[#14110D] mb-3 leading-snug">{c.title}</p>

              <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mb-3 items-stretch">
                <div className="rounded-lg bg-[#F0F0EE] border border-[#E2E1DF] border-l-2 border-l-[#9A8573] p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#9A8573] mb-1">{c.stmtA.label}</p>
                  {c.stmtA.page && <p className="font-mono text-[9px] text-[#9A8573] mb-1">p.{c.stmtA.page} · l.{c.stmtA.line}</p>}
                  <p className="text-xs text-[#3D2E1E] italic leading-relaxed">"{c.stmtA.quote}"</p>
                  {c.stmtA.timestamp && (
                    <button onClick={() => jump(c.stmtA.timestamp)} className="text-[10px] text-[#7A2E20] mt-1.5 font-mono hover:underline block">{fmt(c.stmtA.timestamp)}</button>
                  )}
                </div>
                <div className="flex items-center self-center shrink-0">
                  <span className="font-mono text-[9px] font-bold text-[#C4B5A2] uppercase tracking-wider">vs</span>
                </div>
                <div className="rounded-lg bg-[#F0F0EE] border border-[#E2E1DF] border-l-2 border-l-rose-400 p-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#9A8573] mb-1">{c.stmtB.label}</p>
                  <p className="text-xs text-[#3D2E1E] italic leading-relaxed">"{c.stmtB.quote}"</p>
                </div>
              </div>

              <div className="text-xs text-amber-800 bg-amber-50 border-l-2 border-amber-400 px-3 py-2 rounded-r-lg mb-3 leading-relaxed">{c.why}</div>

              <div className="flex items-center gap-1.5 flex-wrap border-t border-dashed border-[#E2E1DF] pt-2.5">
                {c.crosslinks?.map((link) => (
                  <span key={link} className="inline-flex items-center text-[10px] font-medium text-[#9A8573] bg-[#F0F0EE] border border-[#E2E1DF] rounded-full px-2 py-0.5">{link}</span>
                ))}
                <div className="flex items-center gap-1.5 ml-auto">
                  <button className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#E2E1DF]/50 text-[#6B5744] hover:bg-[#E2E1DF] transition-colors">Dismiss</button>
                  <button className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#14110D] text-white hover:bg-[#2C2316] transition-colors">Add to Brief</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {list.length === 0 && <div className="text-center py-8 text-sm text-[#9A8573]">No contradictions match this filter.</div>}
      <p className="text-xs text-[#9A8573] bg-[#F0F0EE] border border-dashed border-[#E2E1DF] rounded-lg px-3 py-2.5 leading-relaxed">AI contradiction detection is based on semantic analysis and may require human review. Verify against source documents before use in proceedings.</p>
    </div>
  );
}

// ---------- Exhibits Tab ----------
function ExhibitsTab({ jump }) {
  const exhibits = MOCK_DETAIL.exhibits || [];
  const contradictionCount = exhibits.reduce((s, e) => s + e.contradictions, 0);
  const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  const categoryColors = {
    Contract: 'bg-[#E2E1DF]/50 text-[#6B5744]',
    Calendar: 'bg-blue-50 text-blue-700',
    Document: 'bg-amber-50 text-amber-700',
    Email:    'bg-emerald-50 text-emerald-700',
    Records:  'bg-purple-50 text-purple-700',
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-[#E2E1DF] bg-[#F8F8F7] p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-[#6B5744] uppercase tracking-wider">Documentary Record</span>
          <span className="text-sm font-semibold text-[#14110D]">{exhibits.length} exhibits</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg bg-[#F0F0EE] px-3 py-2">
            <div className="text-lg font-bold text-[#14110D]">{exhibits.length}</div>
            <div className="text-[11px] text-[#6B5744]">Total exhibits</div>
          </div>
          <div className="rounded-lg bg-rose-50 px-3 py-2">
            <div className="text-lg font-bold text-rose-700">{contradictionCount}</div>
            <div className="text-[11px] text-rose-500">Contradiction refs</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[...new Set(exhibits.map((e) => e.category))].map((cat) => (
            <span key={cat} className={cls('inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium', categoryColors[cat] || 'bg-[#E2E1DF]/50 text-[#6B5744]')}>{cat}</span>
          ))}
        </div>
      </div>

      {exhibits.map((e) => (
        <div key={e.id} className="rounded-xl border border-[#E2E1DF] bg-[#F8F8F7] p-3 flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E2E1DF]/40 flex items-center justify-center shrink-0 mt-0.5">
              <Ic.fileText size={14} className="text-[#6B5744]"/>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-[10px] font-bold text-[#9A8573] shrink-0">{e.label}</span>
                <span className="text-sm font-semibold text-[#14110D] truncate">{e.title}</span>
              </div>
              <p className="text-xs text-[#6B5744] leading-relaxed">{e.desc}</p>
            </div>
            {e.timestamp && (
              <button onClick={() => jump(e.timestamp)} className="font-mono text-[11px] text-[#7A2E20] hover:underline shrink-0 mt-0.5">{fmt(e.timestamp)}</button>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-[#E2E1DF]/60">
            <span className={cls('inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium', categoryColors[e.category] || 'bg-[#E2E1DF]/50 text-[#6B5744]')}>{e.category}</span>
            {e.contradictions > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[11px] text-rose-700">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"/>
                {e.contradictions} contradiction{e.contradictions > 1 ? 's' : ''}
              </span>
            )}
            <span className="text-[11px] text-[#9A8573] ml-auto">{e.references} references in transcript</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DepositionDetail({ id, onBack }) {
  const depo = MOCK_DEPOSITIONS.find((d) => d.id === id);
  const selectedCase = MOCK_CASES.find((c) => c.caseNumber === depo.caseNumber);
  const { user } = useAuth();
  const canEdit = user?.role === 'admin' || user?.role === 'editor';
  const [tab, setTab] = useState('chat');
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const jump = (t) => { setCurrentTime(t); setPlaying(true); };

  const tabs = [
    { id: 'chat',           label: 'AI Chat' },
    { id: 'contradictions', label: 'Contradictions', count: MOCK_DETAIL.contradictions?.length },
    { id: 'flagged',        label: 'Flagged',         count: MOCK_DETAIL.flaggedItems.filter((f) => f.severity === 'high').length },
    { id: 'goals',          label: 'Goals' },
    { id: 'sentiment',      label: 'Sentiment' },
    { id: 'exhibits',       label: 'Exhibits' },
    { id: 'timeline',       label: 'Timeline' },
    { id: 'summaries',      label: 'Summaries' },
  ];

  const exportOptions = [
    { icon: Ic.fileText, title: 'Litigation Brief',  sub: 'Internal team · full AI annotations', bg: 'bg-[#E2E1DF]/50', fg: 'text-[#6B5744]' },
    { icon: Ic.msg,      title: 'Case Update',       sub: 'For the client · executive summary',  bg: 'bg-emerald-50',   fg: 'text-emerald-700' },
    { icon: Ic.edit,     title: 'Discovery Memo',    sub: 'For opposing counsel',                bg: 'bg-rose-50',      fg: 'text-rose-600' },
  ];

  const topicColors = ['#7A2E20', '#7A2E20', '#C4882A', '#C4882A', '#4A6741', '#4A6741'];

  return (
    <div className="flex-1 flex flex-col bg-[#F0F0EE] overflow-hidden">
      {/* Header */}
      <header className="border-b border-[#E2E1DF] bg-[#F8F8F7] px-5 py-2.5 flex items-center gap-4 shrink-0">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-[#14110D] truncate">{selectedCase?.caseName || depo.caseNumber}</div>
          <div className="text-xs text-[#9A8573] mt-0.5">Deposition of {depo.witness} · {depo.date} · {depo.caseNumber}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={cls(
            'text-[11px] font-semibold uppercase tracking-wider rounded px-2.5 py-1 border',
            depo.status === 'ready' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
            depo.status === 'processing' ? 'text-amber-700 bg-amber-50 border-amber-200' :
            'text-[#7A2E20] bg-[#F5E6E1] border-[#E8CCBF]'
          )}>{depo.status}</span>
          {canEdit && <Button variant="ghost" size="sm"><Ic.upload size={13}/> Upload</Button>}
          <div className="relative">
            <Button variant="outline" size="sm" onClick={() => setExportOpen((o) => !o)}>
              <Ic.fileText size={13}/> Export <Ic.chevD size={11}/>
            </Button>
            {exportOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#F8F8F7] border border-[#E2E1DF] rounded-xl shadow-lg p-1.5 z-50" onMouseLeave={() => setExportOpen(false)}>
                <p className="text-[10px] font-bold text-[#9A8573] uppercase tracking-widest px-3 py-2">Choose audience</p>
                {exportOptions.map(({ icon: Icon, title, sub, bg, fg }) => (
                  <button key={title} onClick={() => setExportOpen(false)} className="w-full text-left p-2.5 rounded-lg hover:bg-[#E9E8E7] transition-colors flex items-center gap-3">
                    <div className={cls('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', bg, fg)}><Icon size={15}/></div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[#14110D]">{title}</div>
                      <div className="text-xs text-[#9A8573] truncate">{sub.split('·')[0].trim()}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button size="sm"><Ic.plus size={13}/> Issue</Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <div className="w-72 shrink-0 border-r border-[#E2E1DF] flex flex-col overflow-y-auto bg-[#F0F0EE]">

          {/* Recording */}
          <div className="p-4 border-b border-[#E2E1DF]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#9A8573] mb-3">Recording</div>
            <VideoPanel depo={depo} currentTime={currentTime} setCurrentTime={setCurrentTime} playing={playing} setPlaying={setPlaying}/>
          </div>

          {/* Summary */}
          <div className="p-4 border-b border-[#E2E1DF]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#9A8573] mb-2">Summary</div>
            <p className="text-xs text-[#4A3828] leading-relaxed">{MOCK_DETAIL.summary}</p>
          </div>

          {/* Goals */}
          <div className="p-4 border-b border-[#E2E1DF]">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#9A8573]">Deposition Goals</div>
              <span className="text-[10px] font-semibold text-[#6B5744]">
                {MOCK_DETAIL.goals.filter((g) => g.covered).length}/{MOCK_DETAIL.goals.length}
              </span>
            </div>
            <div className="h-1 bg-[#E2E1DF] rounded-full overflow-hidden mb-3">
              <div className="h-full bg-[#7A2E20] rounded-full transition-all"
                style={{ width: `${Math.round(MOCK_DETAIL.goals.filter((g) => g.covered).length / MOCK_DETAIL.goals.length * 100)}%` }}
              />
            </div>
            {MOCK_DETAIL.goals.map((g) => (
              <div key={g.id} className="flex items-start gap-2 py-1.5 border-b border-[#E9E8E7] last:border-0">
                <div className={cls('w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                  g.covered ? 'bg-emerald-500 text-white' : 'border-2 border-[#D0C5B0]'
                )}>
                  {g.covered && <Ic.check size={9}/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cls('text-xs leading-snug', g.covered ? 'text-[#4A3828]' : 'text-[#7A6A58]')}>{g.title}</div>
                  {g.notes && <div className="text-[10px] text-amber-600 mt-0.5">{g.notes}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Topics */}
          <div className="p-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#9A8573] mb-2">Topics Covered</div>
            {MOCK_DETAIL.topics.map((topic, i) => (
              <button key={topic.id}
                onClick={() => setCurrentTime(topic.segments[0]?.timestamp || 0)}
                className="flex items-center gap-2.5 w-full py-1.5 border-b border-[#E9E8E7] last:border-0 hover:bg-[#E9E8E7]/60 -mx-1 px-1 rounded transition-colors text-left">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: topicColors[i % topicColors.length] }}/>
                <span className="text-xs text-[#4A3828] flex-1">{topic.title}</span>
                <span className="text-[10px] text-[#9A8573] font-mono shrink-0">
                  {Math.floor((topic.segments[0]?.timestamp || 0)/60)}:{String((topic.segments[0]?.timestamp || 0)%60).padStart(2,'0')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CENTER: TRANSCRIPT */}
        <div className="flex-1 border-r border-[#E2E1DF] flex flex-col overflow-hidden bg-[#FFFEFB]" style={{ maxWidth: '42%' }}>
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-[#E2E1DF] shrink-0">
            <span className="text-sm font-semibold text-[#14110D]">Transcript</span>
            <button
              onClick={() => setTab('flagged')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-md px-2.5 py-1 hover:bg-rose-100 transition-colors"
            >
              <Ic.flag size={11}/>
              {MOCK_DETAIL.flaggedItems.length} flagged
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <TranscriptViewer topics={MOCK_DETAIL.topics} currentTime={currentTime} setCurrentTime={setCurrentTime} playing={playing}/>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col bg-[#F8F8F7] overflow-hidden">
          {/* Tab bar */}
          <div className="flex flex-wrap gap-0.5 border-b border-[#E2E1DF] shrink-0 px-3 pt-2.5 pb-0">
            {tabs.map((t) => {
              const isActive = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={cls(
                    'relative inline-flex items-center gap-1 px-2.5 py-1.5 rounded-t text-xs font-medium transition-colors whitespace-nowrap',
                    isActive
                      ? 'text-[#14110D] bg-[#FFFEFB] border border-b-0 border-[#E2E1DF]'
                      : 'text-[#9A8573] hover:text-[#14110D]'
                  )}>
                  {t.label}
                  {t.count > 0 && (
                    <span className="inline-flex items-center justify-center rounded-full bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5">{t.count}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className={cls('flex-1 min-h-0', tab === 'chat' ? 'overflow-hidden flex flex-col' : 'overflow-y-auto px-3 py-3')}>
            {tab === 'chat'           && <ChatTab depo={depo}/>}
            {tab === 'goals'          && <GoalsTab goals={MOCK_DETAIL.goals}/>}
            {tab === 'flagged'        && <FlaggedTab items={MOCK_DETAIL.flaggedItems} jump={jump}/>}
            {tab === 'contradictions' && <ContradictionsTab jump={jump}/>}
            {tab === 'exhibits'       && <ExhibitsTab jump={jump}/>}
            {tab === 'sentiment'      && <SentimentTab data={MOCK_DETAIL.sentiment}/>}
            {tab === 'timeline'       && <TimelineTab events={MOCK_DETAIL.timeline} jump={jump}/>}
            {tab === 'summaries'      && <SummariesTab topics={MOCK_DETAIL.topics}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Add Deposition ----------
function AddDepositionFlow({ caseId, onBack }) {
  const selectedCase = MOCK_CASES.find((c) => c.id === caseId);
  const [phase, setPhase] = useState('upload');
  const [witnessName, setWitnessName] = useState('');
  const [depositionDate, setDepositionDate] = useState('');
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(1);
  const fileRef = useRef(null);

  const steps = [
    { id: 'upload',   label: 'Upload deposition',       desc: 'Upload video, audio, or transcript to begin.' },
    { id: 'ingest',   label: 'Ingesting deposition data', desc: 'Parsing and structuring your uploaded files.' },
    { id: 'extract',  label: 'Extracting signals',       desc: 'Identifying behavioral cues, tonal patterns, and semantic markers.' },
    { id: 'analyze',  label: 'Running analysis',         desc: 'Sentiment, contradictions, evasiveness, and goal mapping.' },
    { id: 'complete', label: 'Completed',                desc: 'Summary and insights appear here once processing is finished.' },
  ];

  useEffect(() => {
    if (phase !== 'processing') return;
    const timers = [2200, 5500, 9500, 13500].map((delay, i) =>
      setTimeout(() => setCompletedSteps(i + 2), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  };

  const handleSubmit = () => {
    if (!witnessName.trim() || !file) return;
    setPhase('processing');
  };

  const isComplete = completedSteps >= steps.length;

  /* ── Phase 1: Upload form ── */
  if (phase === 'upload') {
    return (
      <div className="flex-1 flex flex-col bg-[#F0F0EE]">
        <div className="border-b border-[#E2E1DF] bg-[#F8F8F7] px-6 py-4">
          <h2 className="text-lg font-semibold text-[#14110D]">Add Deposition</h2>
          {selectedCase && <p className="text-sm text-[#6B5744] mt-0.5">{selectedCase.caseName} · {selectedCase.caseNumber}</p>}
        </div>
        <div className="flex-1 flex items-start justify-center p-8 overflow-y-auto bg-[#F0F0EE]">
          <div className="w-full max-w-xl space-y-5">
            {/* Witness details */}
            <div className="bg-[#F8F8F7] rounded-xl border border-[#E2E1DF] p-6 space-y-4">
              <p className="text-xs font-semibold text-[#9A8573] uppercase tracking-widest">Witness Details</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#6B5744] mb-1.5 uppercase tracking-wider">Witness Name <span className="text-rose-400">*</span></label>
                  <Input placeholder="e.g. Sarah Chen" value={witnessName} onChange={(e) => setWitnessName(e.target.value)}/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B5744] mb-1.5 uppercase tracking-wider">Deposition Date</label>
                  <Input type="date" value={depositionDate} onChange={(e) => setDepositionDate(e.target.value)}/>
                </div>
              </div>
            </div>

            {/* File drop zone */}
            <div className="bg-[#F8F8F7] rounded-xl border border-[#E2E1DF] p-6">
              <p className="text-xs font-semibold text-[#9A8573] uppercase tracking-widest mb-4">Upload File <span className="text-rose-400">*</span></p>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={cls(
                  'border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all',
                  dragOver       ? 'border-[#D0C5B0] bg-[#E9E8E7]' :
                  file           ? 'border-emerald-300 bg-emerald-50/60' :
                                   'border-[#E2E1DF] hover:border-[#D0C5B0] hover:bg-[#E9E8E7]/50'
                )}
              >
                <input ref={fileRef} type="file" className="hidden" accept="video/*,audio/*,.pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])}/>
                {file ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><Ic.fileText size={20}/></div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-[#14110D]">{file.name}</div>
                      <div className="text-xs text-[#6B5744] mt-0.5">{(file.size / 1024 / 1024).toFixed(1)} MB</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white ml-2"><Ic.check size={12}/></div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-[#E2E1DF]/50 flex items-center justify-center text-[#9A8573] mx-auto mb-3"><Ic.upload size={22}/></div>
                    <p className="text-sm font-medium text-[#3D2E1E] mb-1">Drop your file here, or <span className="text-[#7A2E20]">click to browse</span></p>
                    <p className="text-xs text-[#9A8573]">MP4, MOV, WAV, MP3, PDF, DOCX</p>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-1">
              <Button variant="ghost" onClick={onBack}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={!witnessName.trim() || !file}>
                Begin Processing <Ic.chevR size={14}/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Phase 2: Processing view ── */
  return (
    <div className="flex-1 flex flex-col bg-[#F8F8F7] overflow-hidden">
      <header className="border-b border-[#E2E1DF] bg-[#F8F8F7] px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-[#14110D]">{witnessName} Deposition</h2>
          <div className="flex items-center gap-2 text-sm text-[#6B5744] mt-0.5 flex-wrap">
            {depositionDate && <><span>{depositionDate}</span><span className="text-[#C4B5A2]">·</span></>}
            <span>Case {selectedCase?.caseNumber}</span>
            {selectedCase?.type && <><span className="text-[#C4B5A2]">·</span><Badge variant="outline">{selectedCase.type}</Badge></>}
          </div>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left: video preview + summary */}
        <div className="col-span-3 border-r border-[#E2E1DF] flex flex-col overflow-y-auto">
          <div className="bg-[#2C2316] aspect-video relative flex items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2C2316] to-[#14110D]"/>
            <div className="relative w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <Ic.play size={22} className="text-white/60"/>
            </div>
          </div>
          <div className="px-4 py-2.5 border-b border-[#E2E1DF]/60 flex items-center gap-3 text-xs shrink-0">
            <span className="flex items-center gap-1.5 font-medium text-[#3D2E1E]"><Ic.play size={12}/> Play</span>
            <span className="text-[#E2E1DF]">|</span>
            <span className="flex items-center gap-1.5 text-[#9A8573]"><Ic.skipBack size={12}/> Restart</span>
            <span className="text-[#9A8573] ml-auto">0:00 / –:––</span>
          </div>
          <div className="p-4 flex-1">
            <p className="text-xs font-semibold text-[#14110D] uppercase tracking-wider mb-3">Summary</p>
            <div className="text-center py-8">
              <div className="w-8 h-8 rounded-full bg-[#E2E1DF]/40 flex items-center justify-center mx-auto mb-2 text-[#9A8573]"><Ic.fileText size={14}/></div>
              <p className="text-sm text-[#6B5744] font-medium">Summary not available</p>
              <p className="text-xs text-[#9A8573] mt-1 leading-relaxed">Summary will be available after processing is complete.</p>
            </div>
          </div>
        </div>

        {/* Right: processing timeline */}
        <div className="col-span-9 overflow-y-auto p-10 bg-[#F0F0EE]">
          <div className="max-w-lg">
            <p className="text-xs font-semibold text-[#9A8573] uppercase tracking-widest mb-4">Processing Timeline</p>
            <h2 className="brand text-[#14110D] mb-2 leading-tight" style={{ fontSize: '2.2rem', fontWeight: 400 }}>
              {isComplete ? 'Processing complete.' : 'Processing deposition...'}
            </h2>
            <p className="text-[#6B5744] text-sm mb-10 leading-relaxed">
              {isComplete
                ? 'Your deposition has been fully analyzed and is ready for review.'
                : 'Cognition is analyzing your deposition. This typically takes a few minutes.'}
            </p>

            <div className="space-y-0">
              {steps.map((step, i) => {
                const done   = i < completedSteps;
                const active = i === completedSteps && !isComplete;
                return (
                  <div key={step.id} className="flex gap-4">
                    {/* Connector column */}
                    <div className="flex flex-col items-center w-6 shrink-0">
                      <div className={cls(
                        'w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 mt-0.5',
                        done   ? 'bg-emerald-500 text-white' :
                        active ? 'bg-[#14110D] text-white' :
                                 'bg-[#E2E1DF]/40 border border-[#E2E1DF]'
                      )}>
                        {done   ? <Ic.check size={11}/> :
                         active ? (
                           <svg className="animate-spin" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                             <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                           </svg>
                         ) : <span className="w-1.5 h-1.5 rounded-full bg-[#C4B5A2] block"/>}
                      </div>
                      {i < steps.length - 1 && (
                        <div className={cls('w-px flex-1 my-1 transition-colors duration-500', done ? 'bg-emerald-200' : 'bg-[#E2E1DF]')}/>
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-7 flex-1 min-w-0">
                      <p className={cls('text-sm font-medium mb-0.5 transition-colors', done || active ? 'text-[#14110D]' : 'text-[#C4B5A2]')}>
                        {step.label}
                      </p>
                      <p className={cls('text-xs leading-relaxed transition-colors', done || active ? 'text-[#6B5744]' : 'text-[#C4B5A2]')}>
                        {step.desc}
                      </p>
                      {i === 0 && done && (
                        <div className="mt-3 space-y-2">
                          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5">
                            <span className="text-sm font-medium text-emerald-800">File uploaded successfully</span>
                          </div>
                          {file && (
                            <div className="flex items-center gap-2.5 px-1">
                              <div className="w-7 h-7 rounded bg-[#E2E1DF]/40 flex items-center justify-center text-[#6B5744] text-[9px] font-bold uppercase shrink-0">
                                {file.name.split('.').pop()}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-[#3D2E1E] truncate">{file.name}</div>
                                <div className="text-[10px] text-[#9A8573]">{(file.size / 1024 / 1024).toFixed(1)} MB · Video deposition</div>
                              </div>
                              <Ic.checkC size={14} className="text-emerald-500 shrink-0"/>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {isComplete && (
              <Button className="mt-2" onClick={onBack}>
                View Depositions <Ic.chevR size={14}/>
              </Button>
            )}
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

  // Compute breadcrumb based on current view
  const selectedCase = caseId ? MOCK_CASES.find((c) => c.id === caseId) : null;
  const selectedDepo = depoId ? MOCK_DEPOSITIONS.find((d) => d.id === depoId) : null;

  let breadcrumb = [];
  if (view === 'depositions' && selectedCase) {
    breadcrumb = [
      { label: selectedCase.caseName, onClick: () => { setView('cases'); setCaseId(null); } },
    ];
  } else if (view === 'upload' && selectedCase) {
    breadcrumb = [
      { label: selectedCase.caseName, onClick: () => { setView('depositions'); } },
      { label: 'Add Deposition' },
    ];
  } else if (view === 'detail' && selectedCase) {
    breadcrumb = [
      { label: selectedCase.caseName, onClick: () => { setView('depositions'); setDepoId(null); } },
      { label: selectedDepo ? selectedDepo.witness : 'Deposition' },
    ];
  }

  return (
    <div className="h-full flex flex-col bg-[#F0F0EE]" data-screen-label={view}>
      <TopNav
        onLogo={() => { setView('cases'); setCaseId(null); setDepoId(null); }}
        onUserManagement={() => {}}
        breadcrumb={breadcrumb}
      />
      {view === 'cases' && (
        <CaseLibrary onSelect={(id) => { setCaseId(id); setView('depositions'); }}/>
      )}
      {view === 'depositions' && (
        <DepositionLibrary
          caseId={caseId}
          onSelect={(id) => { setDepoId(id); setView('detail'); }}
          onBack={() => { setView('cases'); setCaseId(null); }}
          onAdd={() => setView('upload')}
        />
      )}
      {view === 'upload' && (
        <AddDepositionFlow
          caseId={caseId}
          onBack={() => setView('depositions')}
        />
      )}
      {view === 'detail' && (
        <DepositionDetail
          id={depoId}
          onBack={() => { setView('depositions'); setDepoId(null); }}
        />
      )}
    </div>
  );
}

function App() {
  return <ToastProvider><AuthProvider><AppContent/></AuthProvider></ToastProvider>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
