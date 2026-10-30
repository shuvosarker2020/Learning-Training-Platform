import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  CreditCard, 
  Send, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  Mail, 
  FileCheck, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  Edit3,
  RefreshCw,
  Sliders,
  Check,
  X,
  Layers,
  Cpu,
  Radio,
  FileText
} from 'lucide-react';
import { 
  INITIAL_STUDENTS_LIST, 
  INITIAL_TRAINERS_LIST, 
  INITIAL_PAYMENTS_LIST, 
  INITIAL_EMAIL_DISPATCH_LOGS,
  CURRENT_ADMIN
} from '../data/mockData';

export default function AdminDashboard({ onUpdateStudentAccess }) {
  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'trainers' | 'payments' | 'notifications'
  
  // Data States
  const [students, setStudents] = useState(INITIAL_STUDENTS_LIST);
  const [trainers, setTrainers] = useState(INITIAL_TRAINERS_LIST);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS_LIST);
  const [emailLogs, setEmailLogs] = useState(INITIAL_EMAIL_DISPATCH_LOGS);

  // Filters
  const [studentSearch, setStudentSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All'); // 'All' | 'Paid' | 'Pending' | 'Overdue'

  // Access Control Modal State
  const [selectedStudentForAccess, setSelectedStudentForAccess] = useState(null);

  // Payment Due Extension Modal State
  const [selectedPaymentForExtension, setSelectedPaymentForExtension] = useState(null);
  const [extensionDays, setExtensionDays] = useState(7);

  // Broadcast & Email Announcement State
  const [broadcastForm, setBroadcastForm] = useState({
    audience: 'all-students', // 'all-students' | 'all-trainers' | 'everyone'
    subject: 'Platform Update: New Autonomous AIOps Lab Sandboxes Deployed',
    message: 'We have updated the cloud GPU cluster with PyTorch 2.4 and Kafka 3.8 line-rate streaming pipelines. Check your assigned resources.',
    priority: 'Normal'
  });

  // Automated Scheduler Toggle States
  const [autoPaymentReminders, setAutoPaymentReminders] = useState(true);
  const [autoCertNotifications, setAutoCertNotifications] = useState(true);

  // Toast alert feedback
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --- ACTIONS ---

  // 1. Toggle Student Resource Access
  const handleToggleAccessOption = (studentId, optionKey) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updatedOptions = {
          ...s.accessOptions,
          [optionKey]: !s.accessOptions[optionKey]
        };
        if (onUpdateStudentAccess) {
          onUpdateStudentAccess(studentId, updatedOptions);
        }
        return {
          ...s,
          accessOptions: updatedOptions
        };
      }
      return s;
    }));

    if (selectedStudentForAccess && selectedStudentForAccess.id === studentId) {
      setSelectedStudentForAccess(prev => ({
        ...prev,
        accessOptions: {
          ...prev.accessOptions,
          [optionKey]: !prev.accessOptions[optionKey]
        }
      }));
    }

    showToast(`Permissions updated: ${optionKey} status changed.`);
  };

  // 2. Extend Payment Due Date (Increase Pay Time)
  const handleExtendDueDate = (e) => {
    e.preventDefault();
    if (!selectedPaymentForExtension) return;

    const currentDue = new Date(selectedPaymentForExtension.dueDate);
    currentDue.setDate(currentDue.getDate() + parseInt(extensionDays, 10));
    const newDueDateString = currentDue.toISOString().slice(0, 10);

    setPayments(prev => prev.map(p => {
      if (p.invoiceId === selectedPaymentForExtension.invoiceId) {
        return {
          ...p,
          dueDate: newDueDateString,
          status: 'Pending' // Reset from overdue to pending with extended time
        };
      }
      return p;
    }));

    // Also update student's record
    setStudents(prev => prev.map(s => {
      if (s.id === selectedPaymentForExtension.studentId) {
        return {
          ...s,
          dueDate: newDueDateString,
          paymentStatus: 'Pending'
        };
      }
      return s;
    }));

    // Record automated email notification of extension
    const newLog = {
      id: `EML-${Date.now().toString().slice(-3)}`,
      recipient: selectedPaymentForExtension.studentEmail,
      recipientName: selectedPaymentForExtension.studentName,
      type: 'payment-reminder',
      subject: `Notice: Payment Due Date Extended to ${newDueDateString} (+${extensionDays} Days)`,
      time: 'Just now',
      status: 'Delivered (250 OK)',
      provider: 'AWS SES / SendGrid'
    };
    setEmailLogs(prev => [newLog, ...prev]);

    showToast(`Payment due date extended by +${extensionDays} days. Email notification dispatched.`);
    setSelectedPaymentForExtension(null);
  };

  // 3. Manually Mark Invoice as Paid
  const handleMarkAsPaid = (invoiceId) => {
    const pmt = payments.find(p => p.invoiceId === invoiceId);
    if (!pmt) return;

    setPayments(prev => prev.map(p => {
      if (p.invoiceId === invoiceId) {
        return {
          ...p,
          status: 'Paid',
          paidDate: new Date().toISOString().slice(0, 10)
        };
      }
      return p;
    }));

    // Unlock student access options automatically upon payment
    setStudents(prev => prev.map(s => {
      if (s.id === pmt.studentId) {
        return {
          ...s,
          paymentStatus: 'Paid',
          dueAmount: '$0',
          accessOptions: {
            gpuSandbox: true,
            p4SwitchLab: true,
            videoVault: true,
            examVouchers: true,
            downloadVault: true
          }
        };
      }
      return s;
    }));

    // Add receipt email to log
    const newLog = {
      id: `EML-${Date.now().toString().slice(-3)}`,
      recipient: pmt.studentEmail,
      recipientName: pmt.studentName,
      type: 'payment-reminder',
      subject: `Payment Receipt Confirmed: Invoice ${invoiceId} Marked Paid`,
      time: 'Just now',
      status: 'Delivered (250 OK)',
      provider: 'AWS SES / SendGrid'
    };
    setEmailLogs(prev => [newLog, ...prev]);

    showToast(`Invoice ${invoiceId} marked as Paid. Full student resources unlocked.`);
  };

  // 4. Manually Send Payment Due Reminder
  const handleSendPaymentReminder = (payment) => {
    setPayments(prev => prev.map(p => {
      if (p.invoiceId === payment.invoiceId) {
        return { ...p, remindersSent: p.remindersSent + 1 };
      }
      return p;
    }));

    const newLog = {
      id: `EML-${Date.now().toString().slice(-3)}`,
      recipient: payment.studentEmail,
      recipientName: payment.studentName,
      type: 'payment-reminder',
      subject: `Payment Reminder: Tuition Due for ${payment.courseCode} (${payment.amount})`,
      time: 'Just now',
      status: 'Delivered (250 OK)',
      provider: 'AWS SES / SendGrid'
    };
    setEmailLogs(prev => [newLog, ...prev]);

    showToast(`Payment reminder dispatched to ${payment.studentEmail}.`);
  };

  // 5. Send Broadcast Update Information
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    const count = broadcastForm.audience === 'all-students' 
      ? students.length 
      : broadcastForm.audience === 'all-trainers' 
      ? trainers.length 
      : students.length + trainers.length;

    const newLog = {
      id: `EML-${Date.now().toString().slice(-3)}`,
      recipient: `${broadcastForm.audience}@ngntc.edu (${count} recipients)`,
      recipientName: `All Registered ${broadcastForm.audience.replace('all-', '').toUpperCase()}`,
      type: 'broadcast',
      subject: broadcastForm.subject,
      time: 'Just now',
      status: 'Delivered (100% Success)',
      provider: 'AWS SES Broadcast Queue'
    };

    setEmailLogs(prev => [newLog, ...prev]);
    showToast(`Broadcast sent to ${count} registered email addresses.`);
  };

  // 6. Send Course Completion & Certification Notification
  const handleSendCertNotification = (student) => {
    const certTitle = student.certificationsEarned.length > 0 
      ? student.certificationsEarned[0] 
      : 'NGNTC Certified Next-Gen Network Architect (NGN-CNA)';

    const newLog = {
      id: `EML-${Date.now().toString().slice(-3)}`,
      recipient: student.email,
      recipientName: student.name,
      type: 'certification',
      subject: `Official Credential Issued: ${certTitle} (${student.id})`,
      time: 'Just now',
      status: 'Delivered (250 OK)',
      provider: 'AWS SES / SendGrid'
    };

    setEmailLogs(prev => [newLog, ...prev]);
    showToast(`Certification email with verification hash sent to ${student.email}.`);
  };

  // Filtered Students & Payments
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.id.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const filteredPayments = payments.filter(p => {
    if (paymentFilter === 'All') return true;
    return p.status === paymentFilter;
  });

  const totalRevenue = payments
    .filter(p => p.status === 'Paid')
    .reduce((acc, p) => acc + parseInt(p.amount.replace('$', ''), 10), 0);

  const pendingAmount = payments
    .filter(p => p.status !== 'Paid')
    .reduce((acc, p) => acc + parseInt(p.amount.replace('$', ''), 10), 0);

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-cyan-950 border border-cyan-500 text-cyan-200 text-xs font-mono shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/20 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={CURRENT_ADMIN.avatar}
              alt={CURRENT_ADMIN.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-cyan-500/50 shadow-2xl"
            />
            <span className="absolute -bottom-1 -right-1 p-1 bg-cyan-500 rounded-lg text-slate-950 font-bold" title="Chancellor Clear">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Admin Operations &amp; Management Center
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                MASTER ADMIN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-cyan-300 font-medium">
              {CURRENT_ADMIN.name} • {CURRENT_ADMIN.title}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
              <span>Security: {CURRENT_ADMIN.securityClearance}</span>
              <span>•</span>
              <span className="text-emerald-400">System Nominal (1M Concurrency Ready)</span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'students' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Students &amp; Access ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('trainers')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'trainers' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Trainers ({trainers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'payments' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payments &amp; Dues ({payments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'notifications' ? 'bg-cyan-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email &amp; Broadcasts</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 block">Total Students</span>
          <span className="text-xl font-bold text-white">{students.length}</span>
          <span className="text-[10px] text-cyan-400 block mt-0.5">482 in Active Cohort</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 block">Faculty Trainers</span>
          <span className="text-xl font-bold text-purple-400">{trainers.length} Active</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">4 Flagship Tracks</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 block">Revenue Collected</span>
          <span className="text-xl font-bold text-emerald-400">${totalRevenue.toLocaleString()}</span>
          <span className="text-[10px] text-emerald-400 block mt-0.5">PCI-DSS Gateway</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30">
          <span className="text-[10px] uppercase text-slate-500 block">Pending / Overdue</span>
          <span className="text-xl font-bold text-rose-400">${pendingAmount.toLocaleString()}</span>
          <span className="text-[10px] text-rose-300 block mt-0.5">3 Outstanding Invoices</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 block">Auto-Reminders</span>
          <span className={`text-xl font-bold ${autoPaymentReminders ? 'text-emerald-400' : 'text-slate-400'}`}>
            {autoPaymentReminders ? 'ACTIVE' : 'PAUSED'}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Daily 09:00 AM Cron</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] uppercase text-slate-500 block">Cert Auto-Dispatch</span>
          <span className={`text-xl font-bold ${autoCertNotifications ? 'text-cyan-400' : 'text-slate-400'}`}>
            {autoCertNotifications ? 'ENABLED' : 'MANUAL'}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Instant on Exam Pass</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: STUDENTS MANAGEMENT & GRANULAR ACCESS CONTROL                      */}
      {/* ========================================================================= */}
      {activeTab === 'students' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                Student Roster &amp; Resource Access Governance
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Grant or restrict access to GPU Cloud Sandboxes, P4 Hardware Switch Labs, Video Lectures, and Exam Vouchers as per demand.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search students, emails, IDs..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Student &amp; Credentials</th>
                  <th className="py-3 px-4">Enrolled Track &amp; Batch</th>
                  <th className="py-3 px-4">Payment Status</th>
                  <th className="py-3 px-4">Active Defined Access Options</th>
                  <th className="py-3 px-4 text-right">Admin Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Student Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={std.avatar}
                          alt={std.name}
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-white">
                            <span>{std.name}</span>
                            {std.email.includes('@gmail.com') && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-950 text-blue-400 border border-blue-800">
                                Gmail
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 block">{std.email}</span>
                          <span className="text-[10px] font-mono text-cyan-400">ID: {std.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Track */}
                    <td className="py-3.5 px-4">
                      <span className="text-slate-200 font-medium block truncate max-w-xs">{std.enrolledTrack}</span>
                      <span className="text-[10px] font-mono text-slate-500">{std.batch} • Joined {std.registeredDate}</span>
                    </td>

                    {/* Payment Status */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 font-mono">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                          std.paymentStatus === 'Paid'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : std.paymentStatus === 'Pending'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}>
                          {std.paymentStatus}
                        </span>
                        {std.paymentStatus !== 'Paid' && (
                          <span className="text-[10px] text-slate-400 block">Due: {std.dueAmount} by {std.dueDate}</span>
                        )}
                      </div>
                    </td>

                    {/* Defined Access Options Pills */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs font-mono text-[9px]">
                        <span className={`px-1.5 py-0.5 rounded border ${
                          std.accessOptions.gpuSandbox 
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-800' 
                            : 'bg-slate-950 text-slate-600 border-slate-800 line-through'
                        }`}>
                          GPU Sandbox
                        </span>
                        <span className={`px-1.5 py-0.5 rounded border ${
                          std.accessOptions.p4SwitchLab 
                            ? 'bg-cyan-950 text-cyan-300 border-cyan-800' 
                            : 'bg-slate-950 text-slate-600 border-slate-800 line-through'
                        }`}>
                          P4 Lab
                        </span>
                        <span className={`px-1.5 py-0.5 rounded border ${
                          std.accessOptions.videoVault 
                            ? 'bg-purple-950 text-purple-300 border-purple-800' 
                            : 'bg-slate-950 text-slate-600 border-slate-800 line-through'
                        }`}>
                          Video Vault
                        </span>
                        <span className={`px-1.5 py-0.5 rounded border ${
                          std.accessOptions.examVouchers 
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                            : 'bg-slate-950 text-slate-600 border-slate-800 line-through'
                        }`}>
                          Exam Vouchers
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedStudentForAccess(std)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                          title="Define / Toggle Allowed Resources"
                        >
                          <Sliders className="w-3 h-3" />
                          <span>Define Access</span>
                        </button>

                        <button
                          onClick={() => handleSendCertNotification(std)}
                          className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono text-[11px] cursor-pointer"
                          title="Send Course Completion / Certificate Email"
                        >
                          <Award className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FACULTY & TRAINER MANAGEMENT                                       */}
      {/* ========================================================================= */}
      {activeTab === 'trainers' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-purple-400" />
                Faculty &amp; Trainer Management ({trainers.length} Active Leads)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage lead instructors, approve faculty credentials, and assign cohort tracks.
              </p>
            </div>
            <button
              onClick={() => showToast("Faculty invitation link generated: https://ngntc.edu/join-faculty?token=TRN-2026")}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Invite New Faculty Lead</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainers.map((trn) => (
              <div key={trn.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={trn.avatar}
                      alt={trn.name}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-500/40"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{trn.name}</h3>
                      <p className="text-xs text-purple-300 font-mono">{trn.id}</p>
                      <p className="text-[11px] text-slate-400">{trn.department}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {trn.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 font-mono text-[11px] space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Credentials:</span>
                    <span className="text-white truncate max-w-xs">{trn.credentials}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Students Trained:</span>
                    <span className="text-cyan-400 font-bold">{trn.studentsTrained.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Assigned Courses:</span>
                    <span className="text-slate-200">{trn.assignedCourses.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                  <span className="text-amber-400 font-mono text-[11px]">★ {trn.rating} Student Rating</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => showToast(`Faculty update notification dispatched to ${trn.email}`)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Mail className="w-3 h-3 text-cyan-400" />
                      <span>Contact Lead</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FINANCIALS, DUE NOTIFICATIONS & DUE EXTENSION                     */}
      {/* ========================================================================= */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          {/* Top Automated Reminder Controls */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Automated Payment Due Notification Dispatcher
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Automatically scans for tuition fees approaching due date (3 days prior) and triggers email notifications to student's registered email.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setAutoPaymentReminders(!autoPaymentReminders);
                  showToast(autoPaymentReminders ? "Automated payment reminder daemon paused." : "Automated payment reminder daemon activated.");
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  autoPaymentReminders
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{autoPaymentReminders ? 'Auto-Notification: ON' : 'Auto-Notification: PAUSED'}</span>
              </button>

              <button
                onClick={() => {
                  // Trigger immediate manual sweep
                  payments.filter(p => p.status !== 'Paid').forEach(p => handleSendPaymentReminder(p));
                  showToast("Bulk sweep executed: Reminders sent to all pending/overdue invoices.");
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold font-mono flex items-center gap-2 cursor-pointer shadow transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Reminders to All Due</span>
              </button>
            </div>
          </div>

          {/* Payments List Table */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                Tuition Transactions, Dues &amp; Invoices
              </h2>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                {['All', 'Paid', 'Pending', 'Overdue'].map(st => (
                  <button
                    key={st}
                    onClick={() => setPaymentFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      paymentFilter === st
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Student &amp; Registered Email</th>
                    <th className="py-3 px-4">Track &amp; Amount</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Status &amp; Reminders</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredPayments.map((pmt) => (
                    <tr key={pmt.invoiceId} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-cyan-400 font-bold">{pmt.invoiceId}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{pmt.studentName}</div>
                        <div className="text-[11px] font-mono text-slate-400">{pmt.studentEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <span className="text-slate-200 block">{pmt.courseCode}</span>
                        <span className="text-emerald-400 font-bold text-sm">{pmt.amount}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <span className={pmt.status === 'Overdue' ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                          {pmt.dueDate}
                        </span>
                        {pmt.status === 'Overdue' && (
                          <span className="text-[10px] text-rose-400 block font-bold">● OVERDUE</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          pmt.status === 'Paid'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : pmt.status === 'Pending'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}>
                          {pmt.status}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                          Reminders sent: {pmt.remindersSent}
                        </span>
                      </td>

                      {/* Financial Action Options */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2 font-mono text-[11px]">
                          {pmt.status !== 'Paid' ? (
                            <>
                              <button
                                onClick={() => handleSendPaymentReminder(pmt)}
                                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 cursor-pointer transition-colors"
                                title="Send payment due notification to registered email"
                              >
                                Send Reminder
                              </button>

                              <button
                                onClick={() => setSelectedPaymentForExtension(pmt)}
                                className="px-2.5 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 cursor-pointer transition-colors"
                                title="Increase payment pay time / extend due date"
                              >
                                Extend Due Date
                              </button>

                              <button
                                onClick={() => handleMarkAsPaid(pmt.invoiceId)}
                                className="px-2.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 cursor-pointer transition-colors"
                                title="Manually mark as paid (bank/cash override)"
                              >
                                Mark Paid
                              </button>
                            </>
                          ) : (
                            <span className="text-emerald-400 text-xs flex items-center gap-1 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: BROADCAST INFORMATION & EMAIL NOTIFICATION LOGS                   */}
      {/* ========================================================================= */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Compose Broadcast Announcement */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-400" />
              Broadcast Any Update to Registered Emails
            </h2>
            <p className="text-xs text-slate-400">
              Deliver urgent announcements, syllabus changes, and system updates to all student and faculty inboxes.
            </p>

            <form onSubmit={handleSendBroadcast} className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-slate-400 font-mono mb-1">Target Audience</label>
                <select
                  value={broadcastForm.audience}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, audience: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all-students">All Registered Students ({students.length} recipients)</option>
                  <option value="all-trainers">All Faculty Trainers ({trainers.length} recipients)</option>
                  <option value="everyone">Entire Academy Community (Students + Faculty)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Email Subject Line</label>
                <input
                  type="text"
                  value={broadcastForm.subject}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, subject: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Update Message Body</label>
                <textarea
                  rows={4}
                  value={broadcastForm.message}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                <span>Priority: High Dispatch</span>
                <span className="text-emerald-400">AWS SES + Web Push</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Update to Registered Emails</span>
              </button>
            </form>
          </div>

          {/* Right: Live Dispatched Email Log */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  Live Registered Email Dispatch Logs
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Audit trail of payment due alerts, course completion emails, and broadcast updates.
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800">
                SMTP Gateway: Healthy (100%)
              </span>
            </div>

            <div className="divide-y divide-slate-800 max-h-[460px] overflow-y-auto">
              {emailLogs.map((log) => (
                <div key={log.id} className="py-3.5 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.2 rounded text-[9px] font-bold uppercase ${
                        log.type === 'certification'
                          ? 'bg-purple-950 text-purple-400 border border-purple-800'
                          : log.type === 'payment-reminder'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      }`}>
                        {log.type}
                      </span>
                      <span className="text-white font-bold">{log.recipientName}</span>
                      <span className="text-slate-400">({log.recipient})</span>
                    </div>
                    <span className="text-slate-500">{log.time}</span>
                  </div>

                  <p className="text-slate-200 font-medium pl-1">{log.subject}</p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pl-1">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {log.status}
                    </span>
                    <span>Relay: {log.provider}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: GRANULAR STUDENT ACCESS CONTROL (DEFINED OPTIONS)                */}
      {/* ========================================================================= */}
      {selectedStudentForAccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-7 shadow-2xl space-y-5 text-slate-100">
            
            <button
              onClick={() => setSelectedStudentForAccess(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 text-xs font-mono">
                <Sliders className="w-3.5 h-3.5" />
                <span>Defined Resource Access Governance</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Define Access Options for {selectedStudentForAccess.name}
              </h3>
              <p className="text-xs text-slate-400">
                ID: <span className="font-mono text-cyan-400">{selectedStudentForAccess.id}</span> • Email: {selectedStudentForAccess.email}
              </p>
            </div>

            {/* Toggle Switch Options */}
            <div className="space-y-3 pt-2 font-mono text-xs">
              
              {/* Option 1: GPU Sandbox */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    <span className="font-bold text-white">Dedicated GPU Cloud Sandbox</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">8x A100 GPU pod allocation for AI/LLM models</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleAccessOption(selectedStudentForAccess.id, 'gpuSandbox')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedStudentForAccess.accessOptions.gpuSandbox
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {selectedStudentForAccess.accessOptions.gpuSandbox ? 'ENABLED' : 'LOCKED'}
                </button>
              </div>

              {/* Option 2: P4 Switch Lab */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="font-bold text-white">P4 BMv2 Virtual Switch Appliance</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Hardware packet forwarding &amp; eBPF sandbox</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleAccessOption(selectedStudentForAccess.id, 'p4SwitchLab')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedStudentForAccess.accessOptions.p4SwitchLab
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {selectedStudentForAccess.accessOptions.p4SwitchLab ? 'ENABLED' : 'LOCKED'}
                </button>
              </div>

              {/* Option 3: Video Lecture Vault */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-rose-400" />
                    <span className="font-bold text-white">4K DRM Video Lecture Vault</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Watermarked recorded lectures and code walk-throughs</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleAccessOption(selectedStudentForAccess.id, 'videoVault')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedStudentForAccess.accessOptions.videoVault
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {selectedStudentForAccess.accessOptions.videoVault ? 'ENABLED' : 'LOCKED'}
                </button>
              </div>

              {/* Option 4: Exam Certification Vouchers */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white">Proctored Certification Exam Vouchers</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Official NGN-CNA &amp; NGN-AIS exam attempts</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleAccessOption(selectedStudentForAccess.id, 'examVouchers')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedStudentForAccess.accessOptions.examVouchers
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {selectedStudentForAccess.accessOptions.examVouchers ? 'ENABLED' : 'LOCKED'}
                </button>
              </div>

              {/* Option 5: Architecture Document Downloads */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-white">Architecture Blueprints &amp; PCAP Vault</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">AES-256 encrypted manuals and packet captures</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleAccessOption(selectedStudentForAccess.id, 'downloadVault')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedStudentForAccess.accessOptions.downloadVault
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {selectedStudentForAccess.accessOptions.downloadVault ? 'ENABLED' : 'LOCKED'}
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudentForAccess(null)}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors shadow"
            >
              Done &amp; Save Permission Rules
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: EXTEND PAYMENT DUE DATE (INCREASE PAY TIME)                      */}
      {/* ========================================================================= */}
      {selectedPaymentForExtension && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 sm:p-7 shadow-2xl space-y-5 text-slate-100">
            
            <button
              onClick={() => setSelectedPaymentForExtension(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950 border border-amber-800 text-amber-400 text-xs font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>Grace Period &amp; Due Date Extension</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Extend Payment Due Date
              </h3>
              <p className="text-xs text-slate-400">
                Invoice <strong className="text-white">{selectedPaymentForExtension.invoiceId}</strong> for {selectedPaymentForExtension.studentName}
              </p>
            </div>

            <form onSubmit={handleExtendDueDate} className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Current Due Date:</span>
                  <span className="text-white font-bold">{selectedPaymentForExtension.dueDate}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Amount Due:</span>
                  <span className="text-emerald-400 font-bold">{selectedPaymentForExtension.amount}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Select Days to Add:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[7, 14, 21, 30].map(days => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setExtensionDays(days)}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        extensionDays === days
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      +{days} Days
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-[11px] text-cyan-300">
                ✔ Automatically sends an updated invoice notification to {selectedPaymentForExtension.studentEmail} with the revised due date.
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md transition-all"
              >
                Confirm Extension (+{extensionDays} Days)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
