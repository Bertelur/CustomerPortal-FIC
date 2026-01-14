const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Logo/Brand */}
        <div className="mb-8 animate-[fadeIn_0.6s_ease-out]">
          <span className="text-4xl sm:text-5xl font-black tracking-tight">
            <span className="text-white">F</span>
            <span className="text-emerald-400">I</span>
            <span className="text-white">C</span>
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 animate-[fadeIn_0.8s_ease-out]">
          <span className="block">Something</span>
          <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Amazing
          </span>
          <span className="block mt-2">Is Coming</span>
        </h1>

        {/* Tagline */}
        <p className="text-slate-400 text-lg sm:text-xl md:text-2xl mb-12 max-w-xl mx-auto leading-relaxed animate-[fadeIn_1s_ease-out]">
          We're working hard to bring you the best shopping experience. Stay
          tuned for our launch.
        </p>

        {/* CTA Button */}
        <div className="animate-[fadeIn_1.2s_ease-out]">
          <button
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg rounded-full 
            shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 
            transform hover:scale-105 transition-all duration-300 ease-out
            focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
          >
            <span className="relative z-10">Notify Me</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Decorative divider */}
        <div className="mt-16 flex items-center justify-center gap-3 animate-[fadeIn_1.4s_ease-out]">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-slate-600" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-slate-600" />
        </div>

        {/* Footer text */}
        <p className="mt-8 text-slate-500 text-sm animate-[fadeIn_1.6s_ease-out]">
          &copy; {new Date().getFullYear()} FIC. All rights reserved.
        </p>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
