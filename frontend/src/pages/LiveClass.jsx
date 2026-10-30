import React, { useState } from 'react';
import { 
  Radio, 
  Send, 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  Hand, 
  MessageSquare, 
  Users, 
  Share2, 
  Terminal, 
  Maximize2,
  ShieldAlert,
  Code2,
  Sparkles
} from 'lucide-react';
import WatermarkOverlay from '../components/WatermarkOverlay';
import { CURRENT_STUDENT, UPCOMING_TRAININGS } from '../data/mockData';

export default function LiveClass() {
  const session = UPCOMING_TRAININGS[0];
  const [micMuted, setMicMuted] = useState(true);
  const [videoOff, setVideoOff] = useState(true);
  const [handRaised, setHandRaised] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'code' | 'attendees'
  const [chatInput, setChatInput] = useState('');
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Dr. Elena Rostova",
      role: "Instructor",
      time: "20:02",
      text: "Welcome everyone! Today we are benchmarking PPO (Proximal Policy Optimization) reinforcement learning on Kafka live packet queues."
    },
    {
      id: 2,
      sender: "Marcus CCIE",
      role: "Teaching Assistant",
      time: "20:04",
      text: "Please clone the GitHub repo from the Documents Vault before running the Rust ingestion pipeline."
    },
    {
      id: 3,
      sender: "David Chen",
      role: "Student",
      time: "20:07",
      text: "Dr. Elena, will the model inference latency remain sub-1ms under 50Gbps packet blast?"
    },
    {
      id: 4,
      sender: "Dr. Elena Rostova",
      role: "Instructor",
      time: "20:08",
      text: "Great question David! Yes, because we compile the policy net with TensorRT FP16 quantization directly on the SmartNIC FPGA."
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: CURRENT_STUDENT.name,
        role: "Student (You)",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: chatInput
      }
    ]);
    setChatInput('');
  };

  return (
    <div className="space-y-4">
      {/* Top Session Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                LIVE INTERACTIVE CLASSROOM
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                WebRTC HD Stream • {session.zoomOrWebRTC}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-white mt-0.5">
              {session.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>482 Connected Engineers</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Anti-Leak Steganography On</span>
          </div>
        </div>
      </div>

      {/* Main Classroom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left 2 Cols: Live Video Feed & Controls */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center group">
            {/* Dynamic Watermark Overlay to prevent unauthorized recording */}
            <WatermarkOverlay />

            {/* Video Mock stream (Simulated Live broadcast) */}
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200"
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />

            {/* Live Indicator overlay */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-bold font-mono tracking-wider shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>LIVE • BROADCAST</span>
            </div>

            {/* Instructor Picture-in-Picture */}
            <div className="absolute bottom-4 right-4 z-30 w-36 h-24 sm:w-44 sm:h-28 rounded-xl overflow-hidden border-2 border-cyan-400 bg-slate-900 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                alt="Dr. Elena Rostova"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 px-2 py-0.5 text-[10px] font-mono text-cyan-300 truncate">
                Dr. Elena (Host)
              </div>
            </div>

            {/* Simulated Live Code terminal snippet on video */}
            <div className="absolute top-4 right-4 z-30 hidden sm:block p-3 rounded-lg bg-slate-950/90 border border-cyan-500/30 text-[11px] font-mono text-cyan-400 max-w-xs shadow-xl">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[10px]">
                <Terminal className="w-3 h-3 text-cyan-400" />
                <span>telemetry_pipeline.rs</span>
              </div>
              <code>fn ingest_flow(pkt: &amp;Packet) -&gt; Result&lt;LatencyScore&gt;</code>
            </div>
          </div>

          {/* Interactive Control Console */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMicMuted(!micMuted)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  micMuted
                    ? 'bg-rose-950/60 border-rose-800 text-rose-400 hover:bg-rose-900/60'
                    : 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                }`}
                title={micMuted ? "Unmute Microphone" : "Mute Microphone"}
              >
                {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span className="hidden sm:inline">{micMuted ? 'Muted' : 'Speaking'}</span>
              </button>

              <button
                onClick={() => setVideoOff(!videoOff)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  videoOff
                    ? 'bg-slate-800 border-slate-700 text-slate-400'
                    : 'bg-cyan-950 border-cyan-800 text-cyan-400'
                }`}
                title={videoOff ? "Start Camera" : "Stop Camera"}
              >
                {videoOff ? <VideoOff className="w-4 h-4" /> : <VideoIcon className="w-4 h-4" />}
                <span className="hidden sm:inline">{videoOff ? 'Camera Off' : 'Camera On'}</span>
              </button>

              <button
                onClick={() => setHandRaised(!handRaised)}
                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  handRaised
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/30'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Hand className={`w-4 h-4 ${handRaised ? 'animate-bounce' : ''}`} />
                <span className="hidden sm:inline">{handRaised ? 'Hand Raised!' : 'Raise Hand'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert("Screen share is restricted to Host & Presenters in Level-3 Zero-Trust mode.")}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline">Share Screen</span>
              </button>
              <button
                onClick={() => alert("Switched to Fullscreen Presentation Mode")}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs cursor-pointer"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Live Chat & Collaborative Code Tab */}
        <div className="h-[520px] rounded-2xl bg-slate-900 border border-slate-800 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950/80 p-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'chat'
                  ? 'bg-slate-800 text-cyan-400 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Q&amp;A Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                activeTab === 'code'
                  ? 'bg-slate-800 text-cyan-400 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Live Code Editor</span>
            </button>
          </div>

          {/* Chat Panel */}
          {activeTab === 'chat' && (
            <>
              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
                {messages.map((m) => (
                  <div key={m.id} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-200 flex items-center gap-1.5">
                        {m.sender}
                        {m.role.includes('Instructor') && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                            HOST
                          </span>
                        )}
                        {m.role.includes('You') && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-purple-950 text-purple-400 border border-purple-800">
                            YOU
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{m.time}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 leading-relaxed">
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-slate-950/60 flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask Dr. Elena or share code..."
                  className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* Collaborative Code Tab */}
          {activeTab === 'code' && (
            <div className="flex-1 p-4 bg-slate-950 flex flex-col font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                <span>Shared Sandbox: Rust + Kafka Flow</span>
                <span className="text-emerald-400">Read-Write Enabled</span>
              </div>
              <textarea
                defaultValue={`// NGNTC Live Collaborative Sandbox
use rdkafka::producer::{FutureProducer, FutureRecord};
use std::time::Duration;

#[tokio::main]
async fn main() {
    let producer: FutureProducer = ClientConfig::new()
        .set("bootstrap.servers", "cluster-kafka.ngntc.internal:9092")
        .set("message.timeout.ms", "5000")
        .create()
        .expect("Producer creation error");

    println!("⚡ Connected to NGN-1M Terabit Stream");
}`}
                className="flex-1 mt-2 bg-transparent text-cyan-300 font-mono text-xs resize-none focus:outline-none leading-relaxed"
                spellCheck="false"
              />
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Ctrl + Enter to compile on remote cluster</span>
                <button 
                  onClick={() => alert("Simulation compiled successfully: 0 warnings, latency benchmark 0.42ms.")}
                  className="px-2.5 py-1 rounded bg-cyan-600 text-white font-bold text-[10px] cursor-pointer"
                >
                  Run Benchmark
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
