"use client";

import Link from "next/link";

export  function Navbar() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-neutral-300 bg-white/90 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.09)] backdrop-blur-md">
        
        <div className="flex items-center gap-1">
          
          <button
            onClick={scrollToTop}
            className="font-mono rounded-full cursor-pointer px-4 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-black"
          >
            Home
          </button>

          <a
            href="#features"
            className="font-mono rounded-full px-4 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-black"
          >
            Features
          </a>

          <Link
            href="/tools"
            className="font-mono rounded-full px-4 py-2 text-sm text-neutral-600 transition hover:bg-neutral-100 hover:text-black"
          >
            Tools
          </Link>
        </div>
      </div>
    </nav>
  );
}