import React, { useState } from 'react';
import { 
  UserCheck, 
  Award, 
  ShieldCheck, 
  Download, 
  Share2, 
  CheckCircle2, 
  Calendar, 
  Mail, 
  Globe, 
  Activity, 
  Key,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { CURRENT_STUDENT, COURSES } from '../data/mockData';

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'progress' | 'certificate'

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={CURRENT_STUDENT.avatar}
              alt={CURRENT_STUDENT.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-cyan-500/50 shadow-2xl"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-lg text-slate-950" title="Zero-Trust Verified">
              <ShieldCheck className="w-4 h-4 text-slate-950 font-bold" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {CURRENT_STUDENT.name}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                VERIFIED STUDENT
              </span>
            </div>
            <p className="text-xs sm:text-sm text-cyan-400 font-medium">
              {CURRENT_STUDENT.role}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> {CURRENT_STUDENT.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-slate-500" /> ID: {CURRENT_STUDENT.id}
              </span>
            </div>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'overview' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Overview &amp; Skills
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'progress' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Progress Reports
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'certificate' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Official Certificate
          </button>
        </div>
      </div>

      {/* Tab: Overview & Skills Matrix */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Skill Competencies */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Technical Competency Matrix &amp; Skill Radar
              </h2>
              <p className="text-xs text-slate-400">
                Skills dynamically verified based on automated lab executions, coding submissions, and proctored examination scores.
              </p>

              <div className="space-y-4 pt-2">
                {CURRENT_STUDENT.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-200 font-semibold">{skill.name}</span>
                      <span className="text-cyan-400 font-bold">{skill.score} / 100</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                      <div
                        className={`${skill.color} h-2.5 rounded-full transition-all duration-700`}
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware & VPN Security Posture */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Hardware Device &amp; Session Posture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">IP Gateway:</span>
                  <span className="text-slate-200 font-semibold">{CURRENT_STUDENT.ipAddress}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Enrolled Since:</span>
                  <span className="text-slate-200 font-semibold">{CURRENT_STUDENT.enrolledDate}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Defense Status:</span>
                  <span className="text-emerald-400 font-semibold">Zero-Trust Guarded</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Badges & Verified Credentials */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Accredited Badges Earned
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-cyan-800/50 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">5G SA Network Specialist</h4>
                    <p className="text-[10px] text-slate-400">Issued Oct 2026 • NGNTC Academy</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-purple-800/50 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-950 text-purple-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Reinforcement Learning Ops</h4>
                    <p className="text-[10px] text-slate-400">Issued Sep 2026 • NGNTC Academy</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-800/50 flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Zero-Trust Defense Architect</h4>
                    <p className="text-[10px] text-slate-400">Issued Aug 2026 • NGNTC Academy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Progress Reports */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white">Academic Progress &amp; Completion Audit</h2>
                <p className="text-xs text-slate-400">Detailed breakdown of each technical discipline in your degree curriculum.</p>
              </div>
              <button 
                onClick={() => alert("Progress transcript PDF generated & downloaded.")}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export Progress Audit (PDF)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COURSES.map((course) => (
                <div key={course.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                      {course.code}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-200">{course.progress}% Completed</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{course.title}</h3>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                    <span>Labs Done: 11 / 14</span>
                    <span>Quiz Avg: 92%</span>
                    <span>Attendance: 95%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Official Certificate Preview */}
      {activeTab === 'certificate' && (
        <div className="space-y-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
            {/* Background Guilloche & Watermark */}
            <div className="absolute inset-0 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            {/* Certificate Header */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
              <img
                src="/ngntc-logo-full.svg"
                alt="NGNTC Logo"
                className="h-16 w-auto"
              />
              <div className="pt-4">
                <span className="text-[11px] font-mono tracking-widest text-cyan-400 uppercase font-bold">
                  VERIFIED DIPLOMA OF EXCELLENCE
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                  CERTIFICATE OF COMPLETION
                </h2>
                <p className="text-xs text-slate-400 mt-1">This official document is cryptographically attested and registered on-chain.</p>
              </div>

              <div className="py-6 space-y-2">
                <p className="text-xs uppercase tracking-widest font-mono text-slate-400">THIS IS PROUDLY CONFERRED UPON</p>
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-serif">
                  {CURRENT_STUDENT.name}
                </div>
                <p className="text-xs text-slate-300 max-w-xl mx-auto pt-2 leading-relaxed">
                  For having successfully demonstrated industry-grade competency in designing, engineering, and securing next-generation autonomous networks, terabit cloud infrastructure, and zero-trust defenses.
                </p>
              </div>

              {/* Certificate Verification Footer */}
              <div className="w-full pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-left text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Credential Hash ID:</span>
                  <span className="text-cyan-400 text-[11px] truncate block">0x8f2d9c44b7a1e09...</span>
                  <span className="text-slate-500 block text-[10px] mt-1">Issued: October 30, 2026</span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <QrCode className="w-12 h-12 text-cyan-400" />
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1">Scan to Verify Authenticity</span>
                </div>

                <div className="sm:text-right">
                  <span className="text-slate-500 block text-[10px]">Academic Authority:</span>
                  <span className="text-white font-bold block">Next Generation Network</span>
                  <span className="text-slate-400 block text-[11px]">Training Centre Governing Board</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => alert("Downloading High-Resolution Print Ready PDF (Vector & Signed)...")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-950 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF Certificate</span>
            </button>
            <button
              onClick={() => alert("Certificate verification link copied to clipboard!")}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>Share Verifiable Badge</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
