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
import JoinLinkModal from './components/JoinLinkModal';
import AuthModal from './components/AuthModal';
import { COURSES, CURRENT_STUDENT, CURRENT_TRAINER } from './data/mockData';

export default function App() {
  // Theme State: 'cyber' | 'matrix' | 'neural' | 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ngntc_theme') || 'cyber';
  });

  // User & Persona State
  const [currentRole, setCurrentRole] = useState('student'); // 'student' | 'trainer'
  const [currentUser, setCurrentUser] = useState(CURRENT_STUDENT);

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
    if (role === 'trainer') {
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
            
            {/* Role Switcher Floating Ticker for quick testing */}
            <div className="mb-6 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Current Persona:</span>
                <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                  currentRole === 'trainer' ? 'bg-purple-950 text-purple-400 border border-purple-800' : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                }`}>
                  {currentRole}: {currentUser.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="px-3 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-400 border border-cyan-800 cursor-pointer"
                >
                  🔗 Join via Invite Link
                </button>
                <button
                  onClick={() => {
                    if (currentRole === 'student') {
                      handleAuthSuccess(CURRENT_TRAINER, 'trainer');
                    } else {
                      handleAuthSuccess(CURRENT_STUDENT, 'student');
                    }
                  }}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                >
                  ⇄ Switch to {currentRole === 'student' ? 'Trainer View' : 'Student View'}
                </button>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-3 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800 cursor-pointer"
                >
                  + Sign Up (Student / Trainer)
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

            {activeTab === 'assigned-resources' && (
              <AssignedResources
                onOpenInviteModal={() => setIsJoinModalOpen(true)}
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
              <span className="text-cyan-400">Multi-Theme Enabled ({theme})</span>
              <span>•</span>
              <span className="text-purple-400">Free Open-Source Meetings (Jitsi)</span>
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

      {/* Auth & Signup Modal (Student vs Trainer) */}
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
