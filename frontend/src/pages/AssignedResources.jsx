import React from 'react';
import { 
  FolderLock, 
  ExternalLink, 
  Terminal, 
  Award, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Video, 
  Key,
  Lock,
  AlertCircle
} from 'lucide-react';
import { ASSIGNED_STUDENT_RESOURCES, CURRENT_STUDENT, UPCOMING_TRAININGS } from '../data/mockData';

export default function AssignedResources({ onJoinMeeting, onOpenInviteModal, accessOptions }) {
  const liveSession = UPCOMING_TRAININGS[0];

  // Default permissions if not passed from Admin state
  const permissions = accessOptions || {
    gpuSandbox: true,
    p4SwitchLab: true,
    videoVault: true,
    examVouchers: true,
    downloadVault: true
  };

  // Helper to check if resource is allowed by admin defined options
  const isResourceAllowed = (resId) => {
    if (resId === 'res-1') return permissions.gpuSandbox;
    if (resId === 'res-2') return permissions.p4SwitchLab;
    if (resId === 'res-3') return permissions.downloadVault;
    if (resId === 'res-4') return permissions.examVouchers;
    return true;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono mb-2">
            <FolderLock className="w-3.5 h-3.5" />
            <span>Dedicated Resource Allocation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Assigned Resources &amp; Lab Sandboxes
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
            All private computing sandboxes, hardware emulators, course documents, and exam vouchers allocated to your student ID (<strong>{CURRENT_STUDENT.id}</strong>).
          </p>
        </div>

        <button
          onClick={onOpenInviteModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-950"
        >
          <Sparkles className="w-4 h-4" />
          <span>Redeem New Invite Link</span>
        </button>
      </div>

      {/* Access Governance Notice */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Governance Policy: <strong>Admin Defined Role &amp; Permission Matrix Active</strong></span>
        </div>
        <span className="text-slate-500 text-[11px]">Resources sync dynamically with tuition settlement &amp; faculty approval</span>
      </div>

      {/* Active Live Class Assignment Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Assigned Live Class Session • {liveSession.platformName}
            </span>
          </div>
          <h2 className="text-base font-bold text-white">
            {liveSession.title}
          </h2>
          <p className="text-xs text-slate-300">
            Instructor: <strong>{liveSession.instructor}</strong> • Passcode: <span className="font-mono text-cyan-400">{liveSession.passcode}</span>
          </p>
        </div>

        <a
          href={liveSession.meetingUrl}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-950"
        >
          <Video className="w-4 h-4" />
          <span>Join Free Class ({liveSession.platformName.split(' ')[0]})</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Assigned Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ASSIGNED_STUDENT_RESOURCES.map((res) => {
          const allowed = isResourceAllowed(res.id);

          return (
            <div
              key={res.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 group ${
                allowed
                  ? 'bg-slate-900 border-slate-800 hover:border-cyan-500/40'
                  : 'bg-slate-950/90 border-rose-900/40 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  allowed 
                    ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' 
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {allowed ? res.badge : 'Access Restricted'}
                </span>

                <span className={`text-[11px] font-mono flex items-center gap-1 ${
                  allowed ? 'text-emerald-400' : 'text-rose-400 font-bold'
                }`}>
                  {allowed ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {res.status}
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      Locked by Admin Options
                    </>
                  )}
                </span>
              </div>

              <div>
                <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                  allowed ? 'text-white group-hover:text-cyan-300' : 'text-slate-400'
                }`}>
                  {res.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Type: {res.type} • Validity: {res.expiry}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 flex items-center justify-between">
                <span className="truncate pr-2">
                  {allowed ? `Endpoint: ${res.accessUrl}` : 'Endpoint: [LOCKED PENDING ADMIN APPROVAL]'}
                </span>
                {allowed ? (
                  <Key className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                )}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs">
                <span className="text-slate-500 font-mono text-[11px]">
                  Authorized for: {CURRENT_STUDENT.id}
                </span>

                {allowed ? (
                  <button
                    onClick={() => alert(`Launching assigned resource: ${res.title}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch Resource</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-3.5 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 font-semibold flex items-center gap-1.5 cursor-not-allowed text-[11px]"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Locked by Admin Option</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
