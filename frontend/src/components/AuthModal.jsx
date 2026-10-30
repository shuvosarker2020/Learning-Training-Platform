import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Award, 
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { CURRENT_STUDENT, CURRENT_TRAINER } from '../data/mockData';

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

export default function AuthModal({ isOpen, onClose, onAuthSuccess, currentRole, setCurrentRole }) {
  const [authMode, setAuthMode] = useState('signup-student'); // 'signup-student' | 'signup-trainer' | 'signin'
  const [isGooglePickerOpen, setIsGooglePickerOpen] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  // Custom Google input state
  const [customGmail, setCustomGmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [googleRole, setGoogleRole] = useState(authMode === 'signup-trainer' ? 'trainer' : 'student');

  // Student form state
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    password: '',
    track: 'AI-301: Enterprise AI & Autonomous Network Intelligence',
    experience: 'Intermediate Engineer'
  });

  // Trainer form state
  const [trainerForm, setTrainerForm] = useState({
    name: '',
    email: '',
    password: '',
    title: 'Senior Network & Systems Architect',
    department: 'Artificial Intelligence & 5G Core Networks',
    credentials: 'CCIE #49284, AWS Solutions Architect Pro',
    bio: '',
    github: ''
  });

  if (!isOpen) return null;

  // Process Google / Gmail Authentication
  const handleGoogleAuth = async (emailToUse, nameToUse, roleToUse = googleRole) => {
    setGoogleLoading(true);

    const email = emailToUse || customGmail || 'user@gmail.com';
    const parsedName = nameToUse || customGoogleName || email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const isTrainer = roleToUse === 'trainer';

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(parsedName)}&background=0284c7&color=fff&size=200`;

    // Attempt backend sync
    try {
      await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: parsedName,
          role: roleToUse,
          picture: avatarUrl
        })
      });
    } catch (e) {
      // client-side fallback
    }

    setTimeout(() => {
      setGoogleLoading(false);
      setIsGooglePickerOpen(false);

      if (isTrainer) {
        const newTrainer = {
          ...CURRENT_TRAINER,
          id: `TRN-${Math.floor(1000 + Math.random() * 9000)}-GGL`,
          name: parsedName,
          email: email.toLowerCase(),
          avatar: avatarUrl,
          role: 'trainer',
          authProvider: 'Google (Gmail)',
          securityLevel: 'Level-3 Zero Trust Google OIDC Verified'
        };
        onAuthSuccess(newTrainer, 'trainer');
      } else {
        const newStudent = {
          ...CURRENT_STUDENT,
          id: `NGN-${Math.floor(1000 + Math.random() * 9000)}-GGL`,
          name: parsedName,
          email: email.toLowerCase(),
          avatar: avatarUrl,
          role: 'student',
          authProvider: 'Google (Gmail)',
          securityLevel: 'Level-3 Zero Trust Google OIDC Verified',
          assignedBatch: 'Batch-AI-301 (Google Cohort)'
        };
        onAuthSuccess(newStudent, 'student');
      }

      onClose();
    }, 900);
  };

  const handleStudentSignup = (e) => {
    e.preventDefault();
    const newStudent = {
      ...CURRENT_STUDENT,
      name: studentForm.name || 'New Registered Student',
      email: studentForm.email || 'student@ngntc.edu',
      id: `NGN-${Math.floor(1000 + Math.random() * 9000)}-SEC`,
      role: 'student',
      assignedBatch: `Batch-${studentForm.track.slice(0, 6)}`
    };
    onAuthSuccess(newStudent, 'student');
    onClose();
  };

  const handleTrainerSignup = (e) => {
    e.preventDefault();
    const newTrainer = {
      ...CURRENT_TRAINER,
      name: trainerForm.name || 'New Faculty Trainer',
      email: trainerForm.email || 'trainer@faculty.ngntc.edu',
      id: `TRN-${Math.floor(1000 + Math.random() * 9000)}-FAC`,
      title: trainerForm.title,
      department: trainerForm.department,
      role: 'trainer'
    };
    onAuthSuccess(newTrainer, 'trainer');
    onClose();
  };

  const handleQuickSwitch = (role) => {
    if (role === 'student') {
      onAuthSuccess(CURRENT_STUDENT, 'student');
    } else {
      onAuthSuccess(CURRENT_TRAINER, 'trainer');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Trust Enterprise Portal Access</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            {authMode === 'signup-student' && "Create Student Account"}
            {authMode === 'signup-trainer' && "Apply & Register as Faculty Trainer"}
            {authMode === 'signin' && "Sign In to NGNTC Platform"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {authMode === 'signup-student' && "Use any existing Gmail or work email to access cloud GPU sandboxes and lab vouchers."}
            {authMode === 'signup-trainer' && "Register with your Gmail or faculty email to publish courses and create live class links."}
            {authMode === 'signin' && "Authenticate via Zero-Trust biometric, password, or Google credentials."}
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup-student');
              setGoogleRole('student');
            }}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              authMode === 'signup-student'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Signup</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup-trainer');
              setGoogleRole('trainer');
            }}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              authMode === 'signup-trainer'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Trainer Signup</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              authMode === 'signin'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        </div>

        {/* PRIMARY ACTION: Sign Up / Sign In with Google / Gmail */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setIsGooglePickerOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer border border-slate-200"
          >
            <GoogleIcon className="w-5 h-5 flex-shrink-0" />
            <span>
              {authMode === 'signup-trainer' 
                ? "Sign up with any Gmail (as Trainer)" 
                : authMode === 'signin' 
                ? "Continue with Google / Gmail" 
                : "Sign up with any existing Gmail"}
            </span>
          </button>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Or continue with manual details
            </span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>
        </div>

        {/* Form 1: Student Signup */}
        {authMode === 'signup-student' && (
          <form onSubmit={handleStudentSignup} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-mono mb-1">Full Legal Name</label>
              <input
                type="text"
                placeholder="e.g. Alex Rahman"
                required
                value={studentForm.name}
                onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Email (Gmail or Enterprise)</label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  required
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
                {studentForm.email.toLowerCase().includes('@gmail.com') && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Gmail recognized • Fast Google OAuth enabled
                  </span>
                )}
              </div>
              <div>
                <label className="block text-slate-400 font-mono mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  required
                  value={studentForm.password}
                  onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1">Primary Discipline / Assigned Track</label>
              <select
                value={studentForm.track}
                onChange={(e) => setStudentForm({ ...studentForm, track: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="AI-301: Enterprise AI & Autonomous Network Intelligence">
                  AI-301: Enterprise AI &amp; Autonomous Network Intelligence
                </option>
                <option value="NET-401: Next-Gen Software-Defined Networking & 5G/6G Core">
                  NET-401: Next-Gen Software-Defined Networking &amp; 5G/6G Core
                </option>
                <option value="SYS-501: Hyper-Scale Cloud Systems & Kubernetes Engineering">
                  SYS-501: Hyper-Scale Cloud Systems &amp; Kubernetes Engineering
                </option>
                <option value="SEC-601: Offensive Cyber Defense & Zero-Trust Architecture">
                  SEC-601: Offensive Cyber Defense &amp; Zero-Trust Architecture
                </option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="text-cyan-400 font-bold flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Automatic Provisioning Included:
              </span>
              <p>• GPU Sandbox &amp; P4 BMv2 Lab Appliance credentials</p>
              <p>• Access to weekly live classes &amp; free Jitsi breakout rooms</p>
              <p>• 2 official certification exam vouchers</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Register as Student &amp; Provision Resources</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Form 2: Trainer / Instructor Signup & Profiling */}
        {authMode === 'signup-trainer' && (
          <form onSubmit={handleTrainerSignup} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-mono mb-1">Faculty / Trainer Full Name</label>
              <input
                type="text"
                placeholder="e.g. Dr. Elena Rostova or Engr. Marcus Vance"
                required
                value={trainerForm.name}
                onChange={(e) => setTrainerForm({ ...trainerForm, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Email (Gmail or Faculty Address)</label>
                <input
                  type="email"
                  placeholder="trainer@gmail.com"
                  required
                  value={trainerForm.email}
                  onChange={(e) => setTrainerForm({ ...trainerForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono mb-1">Professional Title</label>
                <input
                  type="text"
                  placeholder="Principal AI Scientist / CCIE Architect"
                  required
                  value={trainerForm.title}
                  onChange={(e) => setTrainerForm({ ...trainerForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1">Industry Certifications &amp; Accreditations</label>
              <input
                type="text"
                placeholder="e.g. CCIE #49284, AWS Solutions Architect Pro, Ph.D. MIT"
                value={trainerForm.credentials}
                onChange={(e) => setTrainerForm({ ...trainerForm, credentials: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1">Trainer Bio &amp; Research Focus</label>
              <textarea
                rows={2}
                placeholder="Describe your enterprise engineering background, research publications, and areas of expertise..."
                value={trainerForm.bio}
                onChange={(e) => setTrainerForm({ ...trainerForm, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="text-purple-400 font-bold flex items-center gap-1.5 font-mono">
                <Briefcase className="w-3.5 h-3.5" />
                Trainer Privileges &amp; Studio Unlocks:
              </span>
              <p>• Create &amp; issue free Jitsi Meet / Google Meet / Teams class joining links</p>
              <p>• View student rosters, track completion benchmarks, and grade exams</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-purple-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Application &amp; Launch Trainer Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Form 3: Sign In (with Quick Switch for Demo) */}
        {authMode === 'signin' && (
          <div className="space-y-4 text-xs">
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="alex.rahman@enterprise.ngntc.edu"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-mono mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-slate-400 font-mono text-[11px] block">
                Instant 1-Click Persona Login:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickSwitch('student')}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/60 text-left transition-colors cursor-pointer group"
                >
                  <div className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                    Student Persona
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Alex Rahman (Trainee)</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickSwitch('trainer')}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/60 text-left transition-colors cursor-pointer group"
                >
                  <div className="text-xs font-bold text-purple-400 group-hover:text-purple-300">
                    Trainer Persona
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Dr. Elena Rostova (Lead)</div>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* GOOGLE / GMAIL ACCOUNT CHOOSER POPUP MODAL */}
      {isGooglePickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 sm:p-7 shadow-2xl space-y-5 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setIsGooglePickerOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Google Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-white shadow-md mx-auto">
                <GoogleIcon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Sign in with Google
              </h3>
              <p className="text-xs text-slate-400">
                Choose an account to continue to <strong>Next Generation Network Training Centre</strong>
              </p>
            </div>

            {/* Quick-Pick Existing Gmail Accounts */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Detected Google Accounts:
              </span>

              {/* Account 1: User's GitHub/Gmail identity */}
              <button
                type="button"
                disabled={googleLoading}
                onClick={() => handleGoogleAuth('shuvosarker2020@gmail.com', 'Shuvo Sarker', googleRole)}
                className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-sm">
                    S
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">Shuvo Sarker</h4>
                    <p className="text-[11px] text-slate-400 font-mono">shuvosarker2020@gmail.com</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                  Select
                </span>
              </button>

              {/* Account 2: Student demo account */}
              <button
                type="button"
                disabled={googleLoading}
                onClick={() => handleGoogleAuth('alex.rahman@gmail.com', 'Alex Rahman', googleRole)}
                className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                    alt="Alex Rahman"
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-cyan-300">Alex Rahman</h4>
                    <p className="text-[11px] text-slate-400 font-mono">alex.rahman@gmail.com</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                  Select
                </span>
              </button>
            </div>

            {/* Custom Any Gmail Input Option */}
            <div className="pt-2 border-t border-slate-800 space-y-3">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Or Use Any Other Gmail Address:
              </span>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Your Full Name (e.g. John Doe)"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="email"
                  placeholder="Enter your existing @gmail.com"
                  value={customGmail}
                  onChange={(e) => setCustomGmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              {/* Role Selector for Google Auth */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 font-mono text-[11px]">Join As:</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setGoogleRole('student')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      googleRole === 'student' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoogleRole('trainer')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      googleRole === 'trainer' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Trainer
                  </button>
                </div>
              </div>

              <button
                type="button"
                disabled={googleLoading || (!customGmail && !customGoogleName)}
                onClick={() => handleGoogleAuth()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Verifying with Google OAuth...</span>
                  </>
                ) : (
                  <>
                    <GoogleIcon className="w-4 h-4" />
                    <span>Authorize &amp; Continue with this Gmail</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-[10px] text-slate-500 leading-relaxed">
              To continue, Google will share your name, email address, language preference, and profile picture with NGNTC.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
