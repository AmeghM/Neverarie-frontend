import LogoImg from "../../assets/media/Logo.png";
import { MoveUpRight, ShieldCheck, ScrollText, Copyright } from "lucide-react";

function Footer() {
  return (
    <>
      <footer className="border-t-2 border-[#8B5CF6]/40 bg-[#09090B] text-gray-200">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* info */}
          <div className="min-w-0">
            <div className="flex gap-3 items-center mb-4">
              <div className="relative flex items-center justify-between">
                <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/10 blur-xl scale-125"></div>
                <img
                  src={LogoImg}
                  alt="Neverarie Logo"
                  className="relative z-10 h-10 w-10 object-contain drop-shadow-[0_0_8px_#8B5CF6]"
                />
              </div>
              <span className="text-xl font-extrabold uppercase tracking-wide">
                Neverarie
              </span>
            </div>

            <p className="mb-1 text-md font-semibold text-gray-300">
              A graveyard of untold stories.
            </p>
            <p className="mb-5 text-sm leading-6 text-gray-400">
              Some of them might come alive.
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                href="/privacy"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1c1231] px-2.5 py-2 text-xs text-gray-300 hover:text-[#C4B5FD] transition-all"
              >
                <ShieldCheck size={13} /> Privacy Policy
              </a>
              <a
                href="/terms"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1c1231] px-2.5 py-2 text-xs text-gray-300 hover:text-[#C4B5FD] transition-all"
              >
                <ScrollText size={13} /> Terms of Service
              </a>
              <a
                href="/copyright"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#1c1231] px-2.5 py-2 text-xs text-gray-300 hover:text-[#C4B5FD] transition-all"
              >
                <Copyright size={13} /> Copyright
              </a>
            </div>
          </div>

          {/* quick */}
          <div className="pt-1">
            <h2 className="mb-5 text-xs font-semibold tracking-wide text-[#8B5CF6]  opacity-60">
              Quick
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href="/"
                  className="transition-all duration-200 hover:text-[#A78BFA]"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/discover"
                  className="transition-all duration-200 hover:text-[#A78BFA]"
                >
                  Discover
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="transition-all duration-200 hover:text-[#A78BFA]"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* explore */}
          <div className="pt-1">
            <h2 className="mb-5 text-xs font-semibold tracking-wide text-[#8B5CF6]  opacity-60">
              Explore
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href="/support"
                  className="transition-all duration-200 hover:text-[#A78BFA]"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="/authors"
                  className="transition-all duration-200 hover:text-[#A78BFA]"
                >
                  Authors
                </a>
              </li>
              <li>
                <a
                  href="/partners"
                  className="transition-all duration-200 hover:text-[#A78BFA]"
                >
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* socials */}
          <div className="pt-1">
            <h2 className="mb-5 text-xs font-semibold tracking-wide text-[#8B5CF6]  opacity-60">
              Find Us
            </h2>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#A78BFA]"
                >
                  Instagram <MoveUpRight size={13} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#A78BFA]"
                >
                  Discord <MoveUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* copyright */}
        <div className="border-t border-white/10 px-6 py-5">
          <p className="mx-auto max-w-7xl text-xs text-[#8B5CF6]">
            © 2026 Neverarie. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
