import React, { useState } from 'react';
import { 
  FolderDown, 
  UploadCloud, 
  FileText, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  FileCode, 
  Search,
  Lock,
  HardDrive
} from 'lucide-react';
import { DOCUMENTS_VAULT } from '../data/mockData';

export default function DocumentsVault() {
  const [searchTerm, setSearchTerm] = useState('');
  const [docsList, setDocsList] = useState(DOCUMENTS_VAULT);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const filteredDocs = docsList.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSimulateUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      setDocsList(prev => [
        {
          id: `doc-${Date.now()}`,
          title: "Student_Lab_Submission_P4_BMv2_Dump.pcapng",
          type: "PCAP / Capture",
          size: "4.2 MB",
          category: "Student Lab Submission",
          course: "NET-401",
          downloads: 1,
          security: "Encrypted AES-256",
          updatedAt: new Date().toISOString().slice(0, 10)
        },
        ...prev
      ]);
      setTimeout(() => setUploadSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted Document &amp; Lab Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Documents, Slides &amp; Code Repository
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
            Download verified lab manuals, P4/eBPF source codes, and architecture PDFs. Submit your homework and research papers into the secure cloud vault.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents or codes..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Upload Zone & Storage Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Box */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-cyan-400" />
            Secure Student Upload &amp; Lab Submission
          </h2>

          <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 sm:p-8 text-center bg-slate-950/50 transition-colors">
            <UploadCloud className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-200">
              Drop lab reports, PCAP files, or Git patches here
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports PDF, ZIP, TAR, IPYNB, PCAP (Max size 500MB). Files are automatically scanned for malware &amp; encrypted with AES-256.
            </p>

            <button
              onClick={handleSimulateUpload}
              disabled={uploading}
              className="mt-4 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shadow-md"
            >
              {uploading ? "Scanning & Encrypting File..." : "Select File & Upload to Vault"}
            </button>
          </div>

          {uploadSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>File verified clean of threats and committed to separate cloud storage with AES-256 encryption.</span>
            </div>
          )}
        </div>

        {/* Vault Storage Quota */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            Vault Storage &amp; Isolation
          </h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Encrypted Storage Allocated:</span>
              <span className="text-white font-bold">100 GB</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Currently In Use:</span>
              <span className="text-cyan-400 font-bold">14.6 GB (14.6%)</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '14.6%' }} />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dedicated Storage Bucket (Isolated)</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every course file is sealed behind signed download tokens expiring in 15 minutes to defeat data scraping bots.
            </p>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
          Available Training Documentation ({filteredDocs.length} Files)
        </h2>

        <div className="divide-y divide-slate-800">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                  {doc.type.includes('Code') || doc.type.includes('ZIP') ? (
                    <FileCode className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                      {doc.course}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {doc.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {doc.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
                    <span>Size: {doc.size}</span>
                    <span>•</span>
                    <span>Format: {doc.type}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{doc.security}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Generated signed short-lived URL. Downloading ${doc.title}`)}
                className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Secure Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
