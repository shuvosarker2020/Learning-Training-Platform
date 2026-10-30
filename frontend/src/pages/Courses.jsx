import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  PlayCircle, 
  FileText, 
  Download,
  ShieldCheck,
  Cpu,
  Layers,
  ServerCog,
  ShieldAlert
} from 'lucide-react';
import { COURSES } from '../data/mockData';

export default function Courses({ setActiveTab, selectedCourse, setSelectedCourse }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedSyllabus, setExpandedSyllabus] = useState(selectedCourse?.id || 'ngn-ai-301');

  const categories = ['All', 'Artificial Intelligence', 'Networking', 'Systems & Cloud', 'Cybersecurity'];

  const filteredCourses = activeCategory === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.track === activeCategory);

  const toggleSyllabus = (courseId) => {
    setExpandedSyllabus(expandedSyllabus === courseId ? null : courseId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>High-End Engineering Curricula</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Next Generation Courses &amp; Outlines
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
            Industry-vetted syllabus designed for enterprise scale. Includes hands-on lab sandboxes, live code walkthroughs, and accredited certification tracks.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {filteredCourses.map((course) => {
          const isExpanded = expandedSyllabus === course.id;

          return (
            <div
              key={course.id}
              className="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden"
            >
              {/* Course Top Overview Banner */}
              <div className="p-6 flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-72 h-44 rounded-xl overflow-hidden relative flex-shrink-0 border border-slate-800">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-950/90 text-cyan-400 border border-cyan-800">
                      {course.code}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500 text-slate-950">
                      {course.badge}
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                      {course.track} • Level: {course.level}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-500">({course.enrolledCount.toLocaleString()} engineers)</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-white leading-tight">
                    {course.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-purple-400" /> Instructor: {course.instructor}
                    </span>
                    <span className="text-slate-200 font-bold">{course.price}</span>
                  </div>

                  {/* Actions & Progress */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleSyllabus(course.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{isExpanded ? 'Hide Course Outline' : 'View Course Outline & Syllabus'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setActiveTab('videos')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-800 hover:bg-cyan-900/60 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <PlayCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Watch Recorded Lectures</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">Enrolled Progress:</span>
                      <span className="text-xs font-mono font-bold text-cyan-400">{course.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Syllabus & Module Outline */}
              {isExpanded && (
                <div className="border-t border-slate-800 bg-slate-950/70 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      Detailed Curriculum &amp; Lab Modules
                    </h3>
                    <button 
                      onClick={() => alert(`Downloaded Official Curriculum for ${course.code}`)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF Syllabus</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.syllabus.map((mod, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold">
                            {mod.week}
                          </span>
                          <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Lab Ready
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200">
                          {mod.title}
                        </h4>
                        <ul className="text-xs space-y-1 text-slate-400">
                          {mod.topics.map((t, tidx) => (
                            <li key={tidx} className="flex items-start gap-2">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Instructor Biography box */}
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center gap-4">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-500/30"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{course.instructor}</h4>
                      <p className="text-[11px] text-slate-400">{course.instructorTitle}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Faculty Lead, Next Generation Network Training Centre</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
