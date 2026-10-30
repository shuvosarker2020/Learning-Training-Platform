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
  ArrowRight
} from 'lucide-react';
import { CURRENT_STUDENT, CURRENT_TRAINER } from '../data/mockData';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, currentRole, setCurrentRole }) {
  const [authMode, setAuthMode] = useState('signup-student'); // 'signup-student' | 'signup-trainer' | 'signin'
  
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
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
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
            {authMode === 'signup-student' && "Access assigned courses, GPU cloud sandboxes, and proctored exam vouchers."}
            {authMode === 'signup-trainer' && "Publish courses, manage cohort rosters, and create free live class meeting links."}
            {authMode === 'signin' && "Authenticate via Zero-Trust biometric or password credentials."}
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setAuthMode('signup-student')}
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
            onClick={() => setAuthMode('signup-trainer')}
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
                <label className="block text-slate-400 font-mono mb-1">Enterprise Email</label>
                <input
                  type="email"
                  placeholder="alex.rahman@company.com"
                  required
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
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
                <label className="block text-slate-400 font-mono mb-1">Official Faculty Email</label>
                <input
                  type="email"
                  placeholder="elena.rostova@faculty.ngntc.edu"
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
    </div>
  );
}
