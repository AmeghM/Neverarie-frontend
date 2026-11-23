import React from "react";
import { Link } from "react-router-dom";

function Pnf() {
  return (
    <div className="min-h-screen bg-[#222] flex items-center justify-center px-6 py-12 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute w-80 h-80 bg-[#8B5CF6]/20 blur-[120px] rounded-full top-10 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* 404 */}
        <div className="relative mb-8">
          <h1 className="text-[140px] sm:text-[190px] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#A78BFA] to-[#6D28D9]">
            404
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#A78BFA] text-xs font-semibold tracking-[0.2em] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            Error 404
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Oops! Lost in Space?
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            The page you're looking for seems to have disappeared into another
            dimension. Let's get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:-translate-y-1"
          >
            ← Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/10 text-gray-300 hover:bg-white/5 hover:border-[#8B5CF6]/50 transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-white/5">
          <p className="text-xs text-gray-500 tracking-wide">
            LOST YOUR WAY? IT HAPPENS. LET'S FIND YOUR PATH.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pnf;
