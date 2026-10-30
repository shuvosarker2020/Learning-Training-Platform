import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  ShieldCheck, 
  Activity, 
  Menu, 
  X,
  CheckCircle2,
  Palette,
  Link2,
  UserPlus,
  Briefcase,
  GraduationCap,
  Sparkles,
  Sun,
  Moon,
  Terminal,
  Zap,
  CreditCard,
  Video
} from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData';

// Official multi-colored Google 'G' icon
function GoogleIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export default function Navbar({ 
  onMenuToggle, 
  activeTab, 
  setActiveTab,
  theme,
  setTheme,
  currentUser,
  currentRole,
  onOpenAuthModal,
  onOpenJoinModal
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [notificationsList, setNotificationsList] = useState(NOTIFICATIONS);

  const unreadCount = notificationsList.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const themes = [
    { id: 'cyber', name: 'Cyber Dark', icon: Zap, color: 'text-cyan-400', badge: 'Default' },
    { id: 'matrix', name: 'Matrix Terminal', icon: Terminal, color: 'text-emerald-400', badge: 'Hacker' },
    { id: 'neural', name: 'Neural Violet', icon: Sparkles, color: 'text-purple-400', badge: 'AI Mode' },
    { id: 'light', name: 'Enterprise Light', icon: Sun, color: 'text-amber-500', badge: 'Clean' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
              <img 
                src="/ngntc-symbol.svg" 
                alt="NGNTC Symbol" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,242,254,0.5)] transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  NEXT GENERATION <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">NETWORK</span>
                </span>
                <span className="hidden xl:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  NGNTC
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 tracking-wider uppercase">
                TRAINING CENTRE • ENTERPRISE ACADEMY
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Concurrent Scale & Security Badge */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Activity className="w-3.5 h-3.5" />
            <span>1.04M Users</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Trust Active</span>
          </div>
        </div>

        {/* Right: Join Link, Theme Switcher, Notifications, Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Sign in with Google / Gmail Action */}
          <button
            onClick={onOpenAuthModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-semibold shadow-sm transition-all cursor-pointer"
            title="Sign up or sign in using any existing Gmail"
          >
            <GoogleIcon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Sign in with Google</span>
          </button>

          {/* Join with Link Action Button */}
          <button
            onClick={onOpenJoinModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-700/60 text-xs font-mono font-semibold transition-all cursor-pointer shadow"
            title="Join via invitation link or cohort token"
          >
            <Link2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Join via Link</span>
          </button>

          {/* Theme Switcher Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-800"
              title="Change website theme"
            >
              <Palette className="w-4 h-4 text-cyan-400" />
              <span className="hidden xl:inline text-xs font-mono capitalize">{theme}</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl z-50 p-2 space-y-1">
                <div className="px-2 py-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Select Theme
                </div>
                {themes.map((t) => {
                  const Icon = t.icon;
                  const isActive = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isActive ? 'bg-slate-800 text-white font-bold' : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${t.color}`} />
                        <span>{t.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{t.badge}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl z-50 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-950/60">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-200">Alerts &amp; Notifications</span>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-cyan-950 px-2 py-0.5 text-[10px] font-bold text-cyan-400 border border-cyan-800">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllRead}
                    className="text-xs text-cyan-400 hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                  {notificationsList.map(n => (
                    <div
                      key={n.id}
                      className={`p-3.5 text-xs transition-colors hover:bg-slate-800/40 ${
                        n.unread ? 'bg-cyan-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {n.type === 'live' && <Video className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                        {n.type === 'exam' && <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />}
                        {n.type === 'payment' && <CreditCard className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />}
                        {n.type === 'security' && <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <p className="font-semibold text-slate-200">{n.title}</p>
                          <p className="text-slate-400 mt-0.5 text-[11px] leading-relaxed">{n.body}</p>
                          <span className="text-[10px] font-mono text-slate-500 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-800 p-2 text-center bg-slate-950/40">
                  <span className="text-[11px] text-slate-400">Push notifications synced across Web &amp; Mobile</span>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Chip & Signup / Switch Button */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800">
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left cursor-pointer group transition-colors"
              title="Signup as Student or Trainer, or Switch Persona"
            >
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/50 group-hover:ring-cyan-400 transition-all"
                />
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-slate-950 ${
                  currentRole === 'trainer' ? 'bg-purple-500' : 'bg-emerald-500'
                }`} />
              </div>

              <div className="hidden md:flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {currentUser.name}
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                    currentRole === 'trainer' 
                      ? 'bg-purple-950 text-purple-400 border border-purple-800'
                      : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                  }`}>
                    {currentRole}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {currentUser.id} • Switch
                </span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
