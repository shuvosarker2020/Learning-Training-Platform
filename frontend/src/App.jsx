import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import LiveClass from './pages/LiveClass';
import VideoLectures from './pages/VideoLectures';
import ExamPortal from './pages/ExamPortal';
import StudentProfile from './pages/StudentProfile';
import DocumentsVault from './pages/DocumentsVault';
import Payments from './pages/Payments';
import AdminSecurity from './pages/AdminSecurity';
import TrainerStudio from './pages/TrainerStudio';
import AssignedResources from './pages/AssignedResources';
import AdminDashboard from './pages/AdminDashboard';
import JoinLinkModal from './components/JoinLinkModal';
import AuthModal from './components/AuthModal';
import { COURSES, CURRENT_STUDENT, CURRENT_TRAINER, CURRENT_ADMIN } from './data/mockData';

export default function App() {
  // Theme State: 'cyber' | 'matrix' | 'neural' | 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ngntc_theme') || 'cyber';
  });

  // User & Persona State: 'student' | 'trainer' | 'admin'
  const [currentRole, setCurrentRole] = useState('student');
  const [currentUser, setCurrentUser] = useState(CURRENT_STUDENT);

  // Student Access Options Governed by Admin
  const [studentAccessOptions, setStudentAccessOptions] = useState({
    gpuSandbox: true,
    p4SwitchLab: true,
    videoVault: true,
    examVouchers: true,
    downloadVault: true
  });

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Sync theme with DOM attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ngntc_theme', theme);
  }, [theme]);

  // Handle Authentication / Signup
  const handleAuthSuccess = (userData, role) => {
    setCurrentUser(userData);
    setCurrentRole(role);
    if (role === 'admin') {
      setActiveTab('admin-dashboard');
    } else if (role === 'trainer') {
      setActiveTab('trainer-studio');
    } else {
      setActiveTab('dashboard');
    }
  };

  // Handle Join Link Success
  const handleJoinSuccess = (payload) => {
    setActiveTab('assigned-resources');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        currentUser={currentUser}
        currentRole={currentRole}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenJoinModal={() => setIsJoinModalOpen(true)}
      />

      {/* Main Layout Container */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          currentRole={currentRole}
        />

        {/* Content Area */}
        <main className="flex-1 lg:pl-64 min-w-0 flex flex-col justify-between">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            
            {/* Persona Switcher Floating Bar */}
            <div className="mb-6 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Active Persona:</span>
                <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                  currentRole === 'admin'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : currentRole === 'trainer'
                    ? 'bg-purple-950 text-purple-400 border border-purple-800'
                    : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                }`}>
                  {currentRole}: {currentUser.name}
                </span>
              </div>

              {/* Fast 1-Click Role Switch Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-500 mr-1">Switch:</span>

                <button
                  onClick={() => handleAuthSuccess(CURRENT_STUDENT, 'student')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    currentRole === 'student'
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Student (Alex)
                </button>

                <button
                  onClick={() => handleAuthSuccess(CURRENT_TRAINER, 'trainer')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    currentRole === 'trainer'
                      ? 'bg-purple-500 text-white font-bold shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Trainer (Dr. Elena)
                </button>

                <button
                  onClick={() => handleAuthSuccess(CURRENT_ADMIN, 'admin')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    currentRole === 'admin'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-950 text-amber-400 hover:text-amber-300 border border-amber-800/60'
                  }`}
                >
                  ★ Master Admin
                </button>

                <div className="w-[1px] h-4 bg-slate-800 mx-1 hidden sm:block" />

                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800 cursor-pointer text-[11px]"
                >
                  🔗 Join Link
                </button>

                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800 cursor-pointer text-[11px]"
                >
                  + Sign Up (Gmail)
                </button>
              </div>
            </div>

            {/* Pages Routing */}
            {activeTab === 'dashboard' && (
              <Dashboard
                setActiveTab={setActiveTab}
                setSelectedCourse={setSelectedCourse}
              />
            )}

            {activeTab === 'admin-dashboard' && (
              <AdminDashboard
                onUpdateStudentAccess={(id, newOptions) => setStudentAccessOptions(newOptions)}
              />
            )}

            {activeTab === 'assigned-resources' && (
              <AssignedResources
                onOpenInviteModal={() => setIsJoinModalOpen(true)}
                accessOptions={studentAccessOptions}
              />
            )}

            {activeTab === 'trainer-studio' && (
              <TrainerStudio />
            )}

            {activeTab === 'courses' && (
              <Courses
                setActiveTab={setActiveTab}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
              />
            )}

            {activeTab === 'live' && (
              <LiveClass />
            )}

            {activeTab === 'videos' && (
              <VideoLectures />
            )}

            {activeTab === 'exams' && (
              <ExamPortal
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'profile' && (
              <StudentProfile />
            )}

            {activeTab === 'documents' && (
              <DocumentsVault />
            )}

            {activeTab === 'payments' && (
              <Payments />
            )}

            {activeTab === 'admin-security' && (
              <AdminSecurity />
            )}
          </div>

          {/* Platform Footer */}
          <footer className="mt-12 border-t border-slate-900 bg-slate-950/90 py-6 px-4 sm:px-8 text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src="/ngntc-symbol.svg" alt="NGNTC" className="w-5 h-5" />
              <span>Next Generation Network Training Centre (NGNTC) © 2026. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-emerald-400">Zero-Trust Verified</span>
              <span>•</span>
              <span className="text-amber-400">Admin Governance Active</span>
              <span>•</span>
              <span className="text-cyan-400">Automated Payment &amp; Cert Dispatch</span>
            </div>
          </footer>
        </main>
      </div>

      {/* Join Link Modal */}
      <JoinLinkModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoinSuccess={handleJoinSuccess}
      />

      {/* Auth & Signup Modal (Student vs Trainer vs Gmail) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
      />
    </div>
  );
}
