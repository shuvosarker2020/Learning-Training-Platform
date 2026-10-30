import React from 'react';
import { CURRENT_STUDENT } from '../data/mockData';

/**
 * WatermarkOverlay:
 * Anti-Leak & Digital Rights Defense Mechanism
 * Projects dynamic, semi-transparent identifier tokens across proprietary
 * video frames and documents to prevent unauthorized redistribution or screen recording.
 */
export default function WatermarkOverlay({ text, opacity = 'opacity-10' }) {
  const displayId = text || `${CURRENT_STUDENT.id} • ${CURRENT_STUDENT.ipAddress} • ${new Date().toISOString().slice(0, 10)}`;

  return (
    <div className={`pointer-events-none select-none absolute inset-0 z-40 overflow-hidden flex flex-wrap items-center justify-around gap-24 p-8 ${opacity}`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="transform -rotate-12 text-slate-300 font-mono text-xs sm:text-sm tracking-wider font-semibold border border-dashed border-slate-400/20 px-3 py-1 rounded"
        >
          <span>{displayId}</span>
        </div>
      ))}
    </div>
  );
}
