import React, { useState } from 'react';
import { 
  Briefcase, 
  Award, 
  Video, 
  Globe, 
  Users, 
  Calendar, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Search,
  BookOpen,
  Radio,
  FileCheck,
  Star
} from 'lucide-react';
import { CURRENT_TRAINER, MEETING_PROVIDERS, TRAINER_STUDENTS_ROSTER, COURSES } from '../data/mockData';

export default function TrainerStudio({ onJoinMeeting }) {
  const [activeTab, setActiveTab] = useState('create-session'); // 'create-session' | 'profile' | 'roster'
  const [trainer, setTrainer] = useState(CURRENT_TRAINER);
  
  // Session creator state
  const [sessionForm, setSessionForm] = useState({
    title: 'Advanced eBPF/XDP Line-Rate Packet Processing Lab',
    courseId: 'ngn-net-401',
    provider: 'jitsi', // 'jitsi' | 'gmeet' | 'teams' | 'zoom' | 'webex' | 'ondemand'
    customUrl: 'https://meet.jit.si/NGNTC-NET401-eBPF-LineRate',
    date: 'Today',
    time: '20:00 GMT+6',
    passcode: 'NGNTC-2026'
  });

  const [generatedSession, setGeneratedSession] = useState(null);
  const [copied, setCopied] = useState(false);

  // Auto-generate URL when provider changes
  const handleProviderSelect = (providerId) => {
    const provider = MEETING_PROVIDERS.find(p => p.id === providerId);
    let defaultUrl = '';
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();

    if (providerId === 'jitsi') {
      defaultUrl = `https://meet.jit.si/NGNTC-${randomSuffix}`;
    } else if (providerId === 'gmeet') {
      defaultUrl = `https://meet.google.com/ngn-${randomSuffix.toLowerCase().slice(0, 3)}-${randomSuffix.toLowerCase().slice(3, 6)}`;
    } else if (providerId === 'teams') {
      defaultUrl = `https://teams.microsoft.com/l/meetup-join/ngntc-${randomSuffix}`;
    } else if (providerId === 'zoom') {
      defaultUrl = `https://zoom.us/j/${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    } else if (providerId === 'webex') {
      defaultUrl = `https://webex.com/meet/ngntc-room-${randomSuffix}`;
    } else {
      defaultUrl = `https://ngntc.edu/video-stream/on-demand-${randomSuffix}`;
    }

    setSessionForm({
      ...sessionForm,
      provider: providerId,
      customUrl: defaultUrl
    });
  };

  const handleCreateSession = (e) => {
    e.preventDefault();
    const providerObj = MEETING_PROVIDERS.find(p => p.id === sessionForm.provider);
    const newSession = {
      id: `sess-${Date.now()}`,
      title: sessionForm.title,
      courseId: sessionForm.courseId,
      provider: providerObj.name,
      providerType: providerObj.type,
      meetingUrl: sessionForm.customUrl,
      passcode: sessionForm.passcode,
      joiningLink: `https://ngntc.edu/join-class?session=${Date.now()}&provider=${sessionForm.provider}`,
      date: sessionForm.date,
      time: sessionForm.time,
      createdAt: new Date().toLocaleTimeString()
    };

    setGeneratedSession(newSession);
  };

  const handleCopyLink = () => {
    if (!generatedSession) return;
    navigator.clipboard.writeText(generatedSession.meetingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-purple-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={trainer.avatar}
              alt={trainer.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-purple-500/50 shadow-2xl"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-purple-500 rounded-lg text-slate-950" title="Distinguished Faculty Lead">
              <Sparkles className="w-4 h-4 text-slate-950 font-bold" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {trainer.name}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-400 border border-purple-800">
                DISTINGUISHED TRAINER
              </span>
            </div>
            <p className="text-xs sm:text-sm text-purple-300 font-medium">
              {trainer.title}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
              <span>{trainer.department}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> {trainer.rating} Rating
              </span>
              <span>•</span>
              <span className="text-cyan-400">{trainer.totalStudentsTrained.toLocaleString()} Engineers Trained</span>
            </div>
          </div>
        </div>

        {/* Studio Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('create-session')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'create-session' ? 'bg-purple-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Create Class Joining Link</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile' ? 'bg-purple-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Trainer Profile &amp; Bio</span>
          </button>
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'roster' ? 'bg-purple-500 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Enrolled Students Roster</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Create Free Joining Link & Schedule Session */}
      {activeTab === 'create-session' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Meeting Link Generator Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-purple-400" />
                    Create Class Joining URL (Free Open Source &amp; Multi-Platform)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Choose free open-source (Jitsi Meet), Google Meet, Teams, WebEx, Zoom, or On-Demand streaming.
                  </p>
                </div>
              </div>

              {/* Provider Selection Cards */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold text-slate-300">
                  Select Video Conferencing Platform:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {MEETING_PROVIDERS.map((prov) => {
                    const isSelected = sessionForm.provider === prov.id;
                    return (
                      <div
                        key={prov.id}
                        onClick={() => handleProviderSelect(prov.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-950/70 border-purple-500 text-white shadow-lg shadow-purple-950'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-bold ${prov.color}`}>{prov.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            {prov.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                          {prov.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Session Details Form */}
              <form onSubmit={handleCreateSession} className="space-y-4 pt-3 border-t border-slate-800 text-xs">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Session / Class Topic</label>
                  <input
                    type="text"
                    value={sessionForm.title}
                    onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-purple-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Assigned Course Track</label>
                    <select
                      value={sessionForm.courseId}
                      onChange={(e) => setSessionForm({ ...sessionForm, courseId: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-purple-500"
                    >
                      {COURSES.map(c => (
                        <option key={c.id} value={c.id}>{c.code}: {c.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-mono mb-1">Meeting Passcode / Security Token</label>
                    <input
                      type="text"
                      value={sessionForm.passcode}
                      onChange={(e) => setSessionForm({ ...sessionForm, passcode: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-mono mb-1">Generated Meeting Room URL</label>
                  <input
                    type="text"
                    value={sessionForm.customUrl}
                    onChange={(e) => setSessionForm({ ...sessionForm, customUrl: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 focus:outline-none focus:border-purple-500 font-mono text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-purple-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Free Class Joining URL &amp; Alert Students</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Col: Generated Session Card & Sharable Voucher */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Live Joining Link Voucher
              </h3>

              {generatedSession ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40 space-y-3 text-xs">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800 font-bold">
                        {generatedSession.provider}
                      </span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Ready
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm">
                      {generatedSession.title}
                    </h4>

                    <div className="space-y-1 font-mono text-[11px] text-slate-400">
                      <div>Passcode: <strong className="text-white">{generatedSession.passcode}</strong></div>
                      <div>Time: <strong className="text-white">{generatedSession.date} at {generatedSession.time}</strong></div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-[10px] text-slate-500 font-mono block mb-1">Direct Meeting URL:</span>
                      <div className="p-2 rounded-lg bg-black text-cyan-400 font-mono text-[11px] truncate select-all">
                        {generatedSession.meetingUrl}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleCopyLink}
                      className="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? "Copied Joining URL to Clipboard!" : "Copy Joining Link"}</span>
                    </button>

                    <a
                      href={generatedSession.meetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Launch Video Class Room</span>
                    </a>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400">
                    <p>✔ All 482 students in Cohort Alpha have been notified via in-app notification &amp; push alert.</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-2 text-xs text-slate-400">
                  <Video className="w-8 h-8 text-purple-400 mx-auto" />
                  <p>Choose a platform on the left (e.g. Free Jitsi Meet or Google Meet) to generate a zero-cost joining link.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Trainer Profiling & Credentials */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                Faculty Biography &amp; Research Statement
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {trainer.bio}
              </p>

              {/* Specializations */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 block">
                  Core Specializations &amp; Research Domains
                </span>
                <div className="flex flex-wrap gap-2">
                  {trainer.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-950 text-slate-200 border border-slate-800"
                    >
                      • {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Accreditations & Credentials */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                Verified Industry Accreditations &amp; Degrees
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trainer.credentials.map((cred, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-purple-400 font-bold block">{cred.year} • {cred.org}</span>
                    <h4 className="text-xs font-bold text-white">{cred.title}</h4>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3 h-3" /> Authenticated by NGNTC
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Published Tracks & Socials */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Author &amp; Faculty Lead For
              </h3>
              <div className="space-y-2.5">
                {trainer.publishedTracks.map((trk, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>{trk}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <span className="text-[11px] font-mono text-slate-400 block">External Profiles:</span>
                <div className="flex gap-2">
                  <a href={trainer.socials.github} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs">
                    GitHub
                  </a>
                  <a href={trainer.socials.linkedin} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs">
                    LinkedIn
                  </a>
                  <a href={trainer.socials.scholar} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs">
                    Scholar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Enrolled Student Roster */}
      {activeTab === 'roster' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                Assigned Trainees &amp; Student Batches ({TRAINER_STUDENTS_ROSTER.length} Active Engineers)
              </h2>
              <p className="text-xs text-slate-400">Manage student attendance, monitor progress, and review lab submissions.</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-400 text-xs font-mono font-bold border border-purple-800">
              Active Cohort: Alpha-2026
            </span>
          </div>

          <div className="divide-y divide-slate-800">
            {TRAINER_STUDENTS_ROSTER.map((std) => (
              <div key={std.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-800 border border-purple-500/40 flex items-center justify-center font-bold text-purple-300">
                    {std.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{std.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{std.email} • ID: {std.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Assigned Batch:</span>
                    <span className="text-slate-300">{std.batch}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Course Progress:</span>
                    <span className="text-cyan-400 font-bold">{std.progress}% Complete</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Status:</span>
                    <span className="text-emerald-400 font-bold">{std.status}</span>
                  </div>
                  <button
                    onClick={() => alert(`Reviewing assigned resources for ${std.name}`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                  >
                    View Labs
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
