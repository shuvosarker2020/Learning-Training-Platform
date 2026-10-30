import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  Receipt, 
  ShieldCheck, 
  Download, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { COURSES, CURRENT_STUDENT } from '../data/mockData';

export default function Payments() {
  const [selectedMethod, setSelectedMethod] = useState('card'); // 'card' | 'mfs' | 'paypal' | 'corp'
  const [selectedCourseId, setSelectedCourseId] = useState('ngn-ai-301');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [lastTxId, setLastTxId] = useState('TX-NGN-2026-98421');

  const selectedCourse = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];

  const handleCheckout = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
      setLastTxId(`TX-NGN-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>PCI-DSS Level 1 &amp; ISO 27001 Gateway</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tuition &amp; Payment Options
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
            Choose from credit card, local mobile financial services (bKash/Nagad/SSLCommerz), PayPal, or corporate purchase order. All transactions are 256-bit encrypted.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>SSL 256-Bit Encrypted</span>
        </div>
      </div>

      {paymentSuccess ? (
        /* Payment Success & Receipt Voucher */
        <div className="p-8 rounded-2xl bg-slate-900 border border-emerald-800/80 max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 shadow-xl shadow-emerald-950/60">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white">Payment Confirmed!</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Your enrollment in <strong>{selectedCourse.title}</strong> is active. An official tax invoice has been dispatched to {CURRENT_STUDENT.email}.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Transaction Reference:</span>
              <span className="text-cyan-400 font-bold">{lastTxId}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Student ID:</span>
              <span className="text-white">{CURRENT_STUDENT.id}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Enrolled Course:</span>
              <span className="text-white truncate max-w-xs">{selectedCourse.title}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Amount Paid:</span>
              <span className="text-emerald-400 font-bold text-sm">{selectedCourse.price} USD</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Payment Gateway:</span>
              <span className="text-slate-200 uppercase">{selectedMethod} Encrypted Rail</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => alert(`Downloaded Official Tax Invoice PDF for ${lastTxId}`)}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download PDF Invoice</span>
            </button>
            <button
              onClick={() => setPaymentSuccess(false)}
              className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Back to Payment Portal</span>
            </button>
          </div>
        </div>
      ) : (
        /* Main Payment Terminal Grid */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Gateway Selector & Billing Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                Step 1: Choose Payment Method
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'card'
                      ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-2 text-cyan-400" />
                  <div className="text-xs font-bold text-white">Credit / Debit</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Visa, MC, Amex</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('mfs')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'mfs'
                      ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 mb-2 text-rose-400" />
                  <div className="text-xs font-bold text-white">MFS / Local</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">bKash, Nagad</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('paypal')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'paypal'
                      ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Receipt className="w-5 h-5 mb-2 text-blue-400" />
                  <div className="text-xs font-bold text-white">PayPal / Global</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Instant Checkout</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('corp')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMethod === 'corp'
                      ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Building2 className="w-5 h-5 mb-2 text-emerald-400" />
                  <div className="text-xs font-bold text-white">Corporate PO</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Institutional Invoice</div>
                </button>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-slate-800 text-xs">
                {selectedMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Cardholder Name</label>
                      <input
                        type="text"
                        defaultValue="Alex Rahman"
                        required
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Card Number (Encrypted)</label>
                      <input
                        type="text"
                        defaultValue="•••• •••• •••• 4242"
                        required
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-400 mb-1 font-mono">Expiry Date</label>
                        <input
                          type="text"
                          defaultValue="12/28"
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1 font-mono">CVC / CVV</label>
                        <input
                          type="password"
                          defaultValue="982"
                          required
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === 'mfs' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">MFS Provider</label>
                      <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500">
                        <option>bKash Merchant Direct</option>
                        <option>Nagad Enterprise</option>
                        <option>Rocket Wallet</option>
                        <option>SSLCommerz Multi-Bank Gateway</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Registered Mobile Number</label>
                      <input
                        type="tel"
                        defaultValue="+880 1700-000000"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>
                )}

                {selectedMethod === 'paypal' && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                    <p className="text-slate-300">
                      You will be redirected to PayPal's high-speed enterprise portal to complete the authentication token.
                    </p>
                    <span className="text-[11px] font-mono text-cyan-400 block">Instant course unlock upon return</span>
                  </div>
                )}

                {selectedMethod === 'corp' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Company / Enterprise Name</label>
                      <input
                        type="text"
                        defaultValue="Telecom Systems Global Inc."
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-mono">Purchase Order (PO) Number</label>
                      <input
                        type="text"
                        defaultValue="PO-2026-ENG-998"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {processing ? "Authorizing with Secured Bank Switch..." : `Pay ${selectedCourse.price} USD & Activate Track`}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Col: Order Summary & Course Selection */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Enrollment Order Summary
              </h3>

              {/* Course Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Select Track:</label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  {COURSES.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.code}: {c.title} ({c.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Tuition Fee:</span>
                  <span className="text-white font-bold">{selectedCourse.price}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Live Sandbox Labs:</span>
                  <span className="text-emerald-400 font-bold">Included (Free)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Certification Exam Attempt:</span>
                  <span className="text-emerald-400 font-bold">Included (2 Attempts)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Zero-Trust Infrastructure Fee:</span>
                  <span className="text-slate-300">$0.00</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                  <span>Total Due:</span>
                  <span className="text-cyan-400">{selectedCourse.price} USD</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-200 block">30-Day Money-Back Guarantee</span>
                <p>If not fully satisfied with lab depth, receive a full refund with one click.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
