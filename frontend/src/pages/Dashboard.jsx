import React from 'react';
import { 
  Play, 
  Radio, 
  Award, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  FileCode,
  Flame,
  Calendar,
  Sparkles
} from 'lucide-react';
import { CURRENT_STUDENT, COURSES, UPCOMING_TRAININGS } from '../data/mockData';

export default function Dashboard({ setActiveTab, setSelectedCourse }) {
  const nextTraining = UPCOMING_TRAININGS[0];

  return (
    <div className="space-y-6">
      {/* Top Welcome & Zero-Trust Security Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 sm:p-8 border border-cyan-500/20 shadow-2xl">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Generation Network Training Centre • Student Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-cyan-400">{CURRENT_STUDENT.name}</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Track your progress in AI, 5G/6G Networks, Cloud Architecture, and Offensive Security. Your environment is secured with end-to-end encryption &amp; Zero-Trust verification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('live')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <Radio className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>Join Live Class (45m)</span>
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Exams &amp; Certs</span>
            </button>
          </div>
        </div>

        {/* Real-time Status Badges */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block">Student Credential ID:</span>
            <span className="text-cyan-400 font-bold">{CURRENT_STUDENT.id}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Zero-Trust Posture:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Compliant (L3)
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Completed Credits:</span>
            <span className="text-white font-bold">{CURRENT_STUDENT.creditsEarned} / 60 ECTS</span>
          </div>
          <div>
            <span className="text-slate-500 block">Overall Performance:</span>
            <span className="text-cyan-400 font-bold">{CURRENT_STUDENT.overallProgress}% Complete</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Enrolled Courses</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">{CURRENT_STUDENT.activeEnrolledCount} Tracks</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>All on schedule this semester</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Live Classes Attended</span>
            <Radio className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white">28 / 32</div>
          <div className="text-[11px] text-slate-400 mt-1 text-emerald-400">
            87.5% Live Attendance Rate
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Certificates Earned</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white">{CURRENT_STUDENT.certificatesEarned} Official</div>
          <div className="text-[11px] text-slate-400 mt-1 text-cyan-400">
            Cryptographically Verified
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Lab Exercises Done</span>
            <FileCode className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">46 Labs</div>
          <div className="text-[11px] text-slate-400 mt-1 text-purple-400">
            P4, eBPF &amp; PyTorch Environments
          </div>
        </div>
      </div>

      {/* Main Row: Live Training Highlight + Active Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Enrolled Courses with Progress */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Active Enrolled Course Tracks
            </h2>
            <button
              onClick={() => setActiveTab('courses')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View All Tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover border border-slate-800 group-hover:border-cyan-500/50 transition-colors"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {course.code}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {course.track}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                      <span>{course.instructor}</span>
                      <span>•</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-48 flex flex-col gap-1.5 sm:text-right">
                  <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-mono">
                    <span className="text-slate-400">Progress:</span>
                    <span className="text-cyan-400 font-bold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (setSelectedCourse) setSelectedCourse(course);
                      setActiveTab('courses');
                    }}
                    className="mt-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-end gap-1 cursor-pointer"
                  >
                    <span>View Syllabus</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Next Live Training & Quick Links */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
            Next Training Session
          </h2>

          {/* Live Session Card */}
          <div className="p-5 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-rose-500/30 shadow-lg relative overflow-hidden">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800 text-[10px] font-mono font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              <span>{nextTraining.status}</span>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Live Interactive Lab
              </span>
              <h3 className="text-sm font-bold text-white leading-snug">
                {nextTraining.title}
              </h3>
              <p className="text-xs text-slate-300">
                Instructor: <strong className="text-slate-100">{nextTraining.instructor}</strong>
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Time:
                  </span>
                  <span className="text-slate-200">{nextTraining.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-purple-400" /> Registered:
                  </span>
                  <span className="text-slate-200">{nextTraining.attendeesCount} Engineers</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('live')}
                className="w-full mt-3 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-rose-900/40"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Enter Live WebRTC Classroom</span>
              </button>
            </div>
          </div>

          {/* Quick Technology Reference */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Next-Gen Focus Areas
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Autonomous AIOps &amp; LLM Telemetry
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Programmable Data Planes (P4 &amp; eBPF)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Zero-Trust SASE &amp; SDP Controllers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Terabit Kubernetes Fabrics
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
