import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Settings, 
  ListOrdered, 
  FileText, 
  ShieldCheck, 
  Download, 
  CheckCircle2,
  Clock,
  Lock
} from 'lucide-react';
import WatermarkOverlay from '../components/WatermarkOverlay';
import { VIDEO_LECTURES, CURRENT_STUDENT } from '../data/mockData';

export default function VideoLectures() {
  const [selectedVideo, setSelectedVideo] = useState(VIDEO_LECTURES[0]);
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [resolution, setResolution] = useState('1080p (Adaptive HLS)');
  const [notes, setNotes] = useState(
    "Key takeaway: In P4 hardware switches, the deparser re-serializes parsed fields back into wire packets. Check page 48 in the lab PDF for BMv2 CLI testing."
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>DRM Protected Video Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Class Video Sharing &amp; Recorded Lectures
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
            Access past masterclasses and laboratory demonstrations. All video streams are protected with dynamic student steganographic watermarking and tokenized signed URLs.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Active Watermark: {CURRENT_STUDENT.id}</span>
        </div>
      </div>

      {/* Main Video Theatre */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Main Player & Controls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            {/* Anti-leak dynamic watermark overlay */}
            <WatermarkOverlay />

            <video
              key={selectedVideo.id}
              className="w-full h-full object-cover"
              controls
              poster={selectedVideo.poster}
              src={selectedVideo.url}
            />
          </div>

          {/* Video Metadata & Controls */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  {selectedVideo.course}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">
                  {selectedVideo.title}
                </h2>
              </div>

              {/* Streaming Settings */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="0.75x">0.75x</option>
                  <option value="1x">1.0x (Normal)</option>
                  <option value="1.25x">1.25x</option>
                  <option value="1.5x">1.5x</option>
                  <option value="2x">2.0x</option>
                </select>

                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="4K 60FPS">4K 60FPS (Ultra)</option>
                  <option value="1080p (Adaptive HLS)">1080p (Adaptive)</option>
                  <option value="720p">720p (Data Saver)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-3 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Duration: {selectedVideo.duration}
              </span>
              <span>•</span>
              <span>Total Views: {selectedVideo.views.toLocaleString()}</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Token Authorized
              </span>
            </div>

            {/* Student Private Lecture Notes */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <label className="text-xs font-bold font-mono text-slate-300 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                Personal Class Notes &amp; Lab Bookmark (Auto-saved)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full p-3 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Col: Chapter Markers & Video Playlist */}
        <div className="space-y-4">
          {/* Chapter Markers */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-cyan-400" />
              Interactive Video Chapters
            </h3>
            <div className="space-y-1.5 text-xs">
              {selectedVideo.chapters?.map((chap, idx) => (
                <button
                  key={idx}
                  onClick={() => alert(`Jumped video to chapter: ${chap.title} at ${chap.time}`)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-left transition-colors cursor-pointer group"
                >
                  <span className="text-slate-300 group-hover:text-cyan-300 line-clamp-1">
                    {chap.title}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                    {chap.time}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Playlist / Other Lectures */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Course Video Catalog
            </h3>
            <div className="space-y-2.5">
              {VIDEO_LECTURES.map((vid) => {
                const isCurrent = vid.id === selectedVideo.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                      isCurrent
                        ? 'bg-cyan-950/40 border-cyan-800/80 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={vid.poster}
                      alt={vid.title}
                      className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-xs font-semibold truncate ${
                        isCurrent ? 'text-cyan-400' : 'text-slate-200'
                      }`}>
                        {vid.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mt-1">
                        <span>{vid.duration}</span>
                        <span>•</span>
                        <span>{vid.resolution}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
