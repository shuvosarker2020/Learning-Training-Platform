import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  ShieldCheck,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { EXAMS_LIST, CURRENT_STUDENT } from '../data/mockData';

export default function ExamPortal({ setActiveTab }) {
  const currentExam = EXAMS_LIST[0]; // NGN-CNA Certification Exam
  const [examStarted, setExamStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(45 * 60);

  // Timer countdown
  useEffect(() => {
    if (!examStarted || submitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examStarted, submitted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  // Calculate score
  const calculateResults = () => {
    let score = 0;
    currentExam.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1;
      }
    });
    const percentage = Math.round((score / currentExam.questions.length) * 100);
    const passed = percentage >= currentExam.passingScore;
    return { score, total: currentExam.questions.length, percentage, passed };
  };

  const results = calculateResults();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Proctored Certification Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Examinations &amp; Testing Engine
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-1">
            Standardized technical assessments evaluated by automated testing pipelines. Pass to unlock cryptographic enterprise certificates.
          </p>
        </div>

        {examStarted && !submitted && (
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 font-mono text-sm font-bold shadow-lg shadow-cyan-950">
            <Timer className="w-4 h-4 animate-spin text-cyan-400" />
            <span>Time Left: {formatTime(secondsRemaining)}</span>
          </div>
        )}
      </div>

      {/* Main Exam Area */}
      {!examStarted ? (
        /* Pre-Exam Instructions & Readiness Card */
        <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <div className="p-3 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Certification Track: {currentExam.course}
              </span>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {currentExam.title}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">Questions:</span>
              <span className="text-white font-bold">{currentExam.questions.length} Items</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">Time Limit:</span>
              <span className="text-white font-bold">{currentExam.durationMinutes} Minutes</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">Pass Threshold:</span>
              <span className="text-emerald-400 font-bold">{currentExam.passingScore}% Passing</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block">Attempts Left:</span>
              <span className="text-cyan-400 font-bold">{currentExam.attemptsLeft} of 3</span>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
            <h4 className="font-bold text-slate-200 font-mono uppercase tracking-wider text-[11px]">
              Anti-Cheating &amp; Integrity Rules:
            </h4>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-400">
              <li>Session telemetry is recorded with Zero-Trust tamper-evident logging.</li>
              <li>Switching tabs or minimizing full-screen window is flagged.</li>
              <li>Questions are dynamically drawn from an encrypted 500-question bank.</li>
            </ul>
          </div>

          <button
            onClick={() => setExamStarted(true)}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Begin Certification Assessment Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : !submitted ? (
        /* Active Examination Screen */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left 3 Cols: Active Question & Radio options */}
          <div className="lg:col-span-3 space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between text-xs font-mono pb-4 border-b border-slate-800">
                <span className="text-cyan-400 font-bold">
                  Question {currentQIndex + 1} of {currentExam.questions.length}
                </span>
                <span className="text-slate-400">
                  Multiple Choice • Single Answer
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentExam.questions[currentQIndex].question}
              </h2>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentExam.questions[currentQIndex].options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentExam.questions[currentQIndex].id] === optIdx;
                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(currentExam.questions[currentQIndex].id, optIdx)}
                      className={`p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 shadow-lg shadow-cyan-950'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 font-mono text-xs ${
                        isSelected ? 'border-cyan-400 bg-cyan-400 text-slate-950 font-bold' : 'border-slate-600 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {currentQIndex < currentExam.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setSubmitted(true)}
                    className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Exam</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Col: Question Grid Navigator */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Question Navigator
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {currentExam.questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentQIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-9 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-cyan-400 bg-cyan-500 text-slate-950'
                          : isAnswered
                          ? 'bg-slate-800 text-cyan-400 border border-cyan-800/60'
                          : 'bg-slate-950 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-cyan-500" />
                  <span>Current Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-slate-800 border border-cyan-800/60" />
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-slate-950 border border-slate-800" />
                  <span>Unanswered ({currentExam.questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors shadow"
              >
                Finish &amp; Grade
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Exam Results & Pass/Fail Certificate Evaluation */
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            {results.passed ? (
              <div className="inline-flex p-4 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 shadow-xl shadow-emerald-950/50">
                <Sparkles className="w-12 h-12 animate-pulse" />
              </div>
            ) : (
              <div className="inline-flex p-4 rounded-full bg-rose-950 text-rose-400 border border-rose-800 shadow-xl">
                <AlertCircle className="w-12 h-12" />
              </div>
            )}

            <h2 className="text-2xl font-extrabold text-white">
              {results.passed ? "Congratulations! You Passed!" : "Assessment Not Passed"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              {results.passed 
                ? "You have demonstrated master-level proficiency in Next-Generation Network Architecture. Your verifiable certificate has been issued."
                : "You did not achieve the 80% passing threshold. Review the explanations below and re-attempt when ready."}
            </p>
          </div>

          {/* Score breakdown metrics */}
          <div className="grid grid-cols-3 gap-4 text-center font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-xs block">Your Score</span>
              <span className={`text-2xl font-bold ${results.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                {results.percentage}%
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-xs block">Passing Score</span>
              <span className="text-2xl font-bold text-white">
                {currentExam.passingScore}%
              </span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-500 text-xs block">Correct Answers</span>
              <span className="text-2xl font-bold text-cyan-400">
                {results.score} / {results.total}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {results.passed && (
              <button
                onClick={() => setActiveTab('profile')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <FileCheck className="w-4 h-4" />
                <span>View &amp; Download Verifiable Certificate</span>
              </button>
            )}
            <button
              onClick={() => {
                setExamStarted(false);
                setSubmitted(false);
                setSelectedAnswers({});
                setSecondsRemaining(45 * 60);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Practice Test</span>
            </button>
          </div>

          {/* Question Explanations */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Detailed Question Analysis &amp; Rationale:
            </h3>
            <div className="space-y-3">
              {currentExam.questions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correct;
                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-slate-400 font-bold">Question {idx + 1}</span>
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1 font-bold">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-slate-200 font-medium">{q.question}</p>
                    <p className="text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed">
                      <strong className="text-cyan-400">Explanation: </strong>
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
