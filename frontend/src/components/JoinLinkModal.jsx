import React, { useState } from 'react';
import { 
  Link2, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Copy, 
  ExternalLink,
  BookOpen,
  Cpu,
  Layers
} from 'lucide-react';

export default function JoinLinkModal({ isOpen, onClose, onJoinSuccess }) {
  const [inviteInput, setInviteInput] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'validating' | 'success' | 'error'
  const [unlockedPayload, setUnlockedPayload] = useState(null);

  if (!isOpen) return null;

  const handleValidateJoin = (e) => {
    e.preventDefault();
    if (!inviteInput.trim()) return;

    setStatus('validating');

    setTimeout(() => {
      // Mock validation logic
      const isAI = inviteInput.toLowerCase().includes('ai');
      const isNet = inviteInput.toLowerCase().includes('net');

      const payload = {
        cohort: isAI ? 'Cohort-AI-2026-Alpha' : isNet ? 'Cohort-NET-5G-Core' : 'Enterprise Multi-Track Cohort',
        trackTitle: isAI 
          ? 'Enterprise AI & Autonomous Network Intelligence (AI-301)' 
          : 'Next-Gen Software-Defined Networking & 5G/6G Core (NET-401)',
        instructor: isAI ? 'Dr. Elena Rostova' : 'Engr. Marcus Vance',
        labSandbox: 'A100 GPU Accelerated Cloud Pod #48',
        liveMeeting: 'https://meet.jit.si/NGNTC-AI-301-KafkaRust-Lab',
        meetingPlatform: 'Jitsi Meet (Free Open Source)',
        accessDuration: 'Full Semester (120 Days Access)',
        creditsAssigned: 15
      };

      setUnlockedPayload(payload);
      setStatus('success');
      if (onJoinSuccess) onJoinSuccess(payload);
    }, 1200);
  };

  const handleApplyPreset = (code) => {
    setInviteInput(`https://ngntc.edu/join?code=${code}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono">
            <Link2 className="w-3.5 h-3.5" />
            <span>Instant Enrollment &amp; Class Access</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Join Platform via Invitation Link
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Paste your trainer's invite link or batch code to automatically unlock assigned labs, live rooms, and training resources.
          </p>
        </div>

        {status !== 'success' ? (
          <form onSubmit={handleValidateJoin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-2">
                Paste Joining URL or Invitation Token:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inviteInput}
                  onChange={(e) => setInviteInput(e.target.value)}
                  placeholder="https://ngntc.edu/join?code=NGN-AI-2026-ALPHA"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                  required
                />
              </div>
            </div>

            {/* Quick Presets for Demo */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-500 block">
                Quick Test Invite Links:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleApplyPreset('NGN-AI-AUTONOMOUS-2026')}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-mono text-cyan-400 cursor-pointer"
                >
                  ⚡ AI Autonomous Track
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('NGN-5G-P4-CORE-PASS')}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-[11px] font-mono text-emerald-400 cursor-pointer"
                >
                  🌐 5G &amp; P4 Network Pass
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'validating'}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === 'validating' ? (
                <span>Verifying Cryptographic Invite Token...</span>
              ) : (
                <>
                  <span>Validate Link &amp; Access Assigned Resources</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Success Screen with Unlocked Assigned Resources */
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-bold text-xs sm:text-sm">Invitation Validated &amp; Resources Assigned!</p>
                <p className="text-[11px] text-emerald-300">You are enrolled into <strong>{unlockedPayload.cohort}</strong>.</p>
              </div>
            </div>

            {/* Unlocked Details */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Curriculum Track:</span>
                <span className="text-white font-bold truncate max-w-xs">{unlockedPayload.trackTitle}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Instructor Lead:</span>
                <span className="text-cyan-400 font-bold">{unlockedPayload.instructor}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Assigned Sandbox:</span>
                <span className="text-emerald-400">{unlockedPayload.labSandbox}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Free Live Classroom:</span>
                <span className="text-purple-400 truncate max-w-xs">{unlockedPayload.meetingPlatform}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Validity Duration:</span>
                <span className="text-slate-200">{unlockedPayload.accessDuration}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href={unlockedPayload.liveMeeting}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Free Class Meeting</span>
              </a>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs text-center cursor-pointer"
              >
                <span>Go to My Dashboard</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
