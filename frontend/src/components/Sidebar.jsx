import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Radio, 
  PlaySquare, 
  Award, 
  UserCheck, 
  FolderDown, 
  CreditCard, 
  ServerCog, 
  Smartphone,
  Briefcase,
  FolderLock,
  Cpu,
  Layers,
  ShieldAlert,
  Users,
  Video,
  Sliders,
  Mail
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen, currentRole }) {
  
  // Student items
  const studentNavItems = [
    { id: 'dashboard', label: 'Platform Dashboard', icon: LayoutDashboard },
    { id: 'assigned-resources', label: 'My Assigned Resources', icon: FolderLock, badge: 'Assigned' },
    { id: 'courses', label: 'Courses & Curriculum', icon: BookOpen },
    { id: 'live', label: 'Live Training Class', icon: Radio, pulse: true },
    { id: 'videos', label: 'Video Lecture Vault', icon: PlaySquare },
    { id: 'exams', label: 'Exams & Certifications', icon: Award },
    { id: 'profile', label: 'Student Profile & Progress', icon: UserCheck },
    { id: 'documents', label: 'Lab Guides & Docs', icon: FolderDown },
    { id: 'payments', label: 'Payment Gateway', icon: CreditCard },
    { id: 'admin-dashboard', label: 'Admin Operations', icon: Sliders, badge: 'Admin', highlight: true },
    { id: 'admin-security', label: 'Scale & Security (1M)', icon: ServerCog },
  ];

  // Trainer items
  const trainerNavItems = [
    { id: 'trainer-studio', label: 'Trainer Studio & Links', icon: Briefcase, badge: 'Faculty' },
    { id: 'courses', label: 'Courses & Curriculum', icon: BookOpen },
    { id: 'live', label: 'Live Class Streamer', icon: Radio, pulse: true },
    { id: 'videos', label: 'Video Lecture Vault', icon: PlaySquare },
    { id: 'exams', label: 'Exams & Certifications', icon: Award },
    { id: 'documents', label: 'Lab Guides & Docs', icon: FolderDown },
    { id: 'admin-dashboard', label: 'Admin Operations', icon: Sliders, badge: 'Admin', highlight: true },
    { id: 'admin-security', label: 'Scale & Security (1M)', icon: ServerCog },
  ];

  // Admin items
  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Admin Control Center', icon: Sliders, badge: 'Executive', highlight: true },
    { id: 'assigned-resources', label: 'Student Resource View', icon: FolderLock },
    { id: 'trainer-studio', label: 'Faculty Studio View', icon: Briefcase },
    { id: 'courses', label: 'Courses & Curriculum', icon: BookOpen },
    { id: 'live', label: 'Live Class Streamer', icon: Radio },
    { id: 'videos', label: 'Video Lecture Vault', icon: PlaySquare },
    { id: 'exams', label: 'Exams & Certifications', icon: Award },
    { id: 'documents', label: 'Lab Guides & Docs', icon: FolderDown },
    { id: 'payments', label: 'Payment Gateway', icon: CreditCard },
    { id: 'admin-security', label: 'Scale & Security (1M)', icon: ServerCog },
  ];

  const navItems = currentRole === 'admin' 
    ? adminNavItems 
    : currentRole === 'trainer' 
    ? trainerNavItems 
    : studentNavItems;

  const handleSelect = (id) => {
    setActiveTab(id);
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-slate-800 bg-slate-950/95 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } flex flex-col justify-between overflow-y-auto`}>
        
        {/* Navigation Links */}
        <div className="p-4 space-y-6">
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                {currentRole === 'admin' ? 'Executive Portal' : currentRole === 'trainer' ? 'Faculty Studio' : 'Student Academy'}
              </span>
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                currentRole === 'admin'
                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                  : currentRole === 'trainer' 
                  ? 'bg-purple-950 text-purple-400 border border-purple-800'
                  : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
              }`}>
                {currentRole}
              </span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-950 to-blue-950/40 text-cyan-400 border border-cyan-800/60 shadow-lg shadow-cyan-950/50'
                        : item.highlight
                        ? 'text-cyan-300 hover:text-cyan-200 hover:bg-slate-900 border border-cyan-900/40'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`} />
                      <span>{item.label}</span>
                    </div>

                    {item.pulse && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                    )}

                    {item.badge && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                        item.badge === 'Admin' || item.badge === 'Executive'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : currentRole === 'trainer'
                          ? 'bg-purple-950 text-purple-400 border border-purple-800'
                          : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Technology Focus Badges */}
          <div className="pt-2 border-t border-slate-800/80">
            <p className="px-3 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2.5">
              Technology Tracks
            </p>
            <div className="grid grid-cols-2 gap-1.5 px-1">
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300">
                <Cpu className="w-3 h-3 text-purple-400" />
                AI &amp; Neural
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300">
                <Layers className="w-3 h-3 text-cyan-400" />
                5G/6G Mesh
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300">
                <ServerCog className="w-3 h-3 text-emerald-400" />
                Cloud &amp; K8s
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300">
                <ShieldAlert className="w-3 h-3 text-rose-400" />
                Zero-Trust
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Mobile App & Zero-Leak Guarantee */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>Mobile App Available</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Available on iOS &amp; Android with offline caching &amp; biometrics.
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/60">
              <span>Build v2.4-Production</span>
              <span className="text-emerald-400 font-medium">Synced</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
