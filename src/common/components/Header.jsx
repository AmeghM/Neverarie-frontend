import { useState } from "react";
import logoImg from "../../assets/media/Logo.png";
import { CircleUserRound, Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

function Header() {
  const NavbarMenu = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    {
      id: 2,
      title: "Discover",
      link: "/discover",
    },
    {
      id: 3,
      title: "About",
      link: "/about",
    },
    {
      id: 4,
      title: "Support",
      link: "/support",
    },
  ];

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();

  const [LogBtn, setLogBtn] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });
  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ paddingTop: scrolled ? 12 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <motion.nav
          initial={false}
          animate={{
            maxWidth: scrolled ? 1200 : "100%",
            marginInline: "auto",
            width: "100%",
            borderRadius: scrolled ? 20 : 0,
            backgroundColor: scrolled
              ? "rgba(14, 9, 25, 0.55)"
              : "rgba(14, 9, 25, 0.55)",
            borderColor: scrolled
              ? "rgba(139, 92, 246, 0.28)"
              : "rgba(139, 92, 246, 0)",
            borderBottomColor: scrolled
              ? "rgba(139, 92, 246, 0.28)"
              : "rgba(139, 92, 246, 0.45)",
            paddingLeft: scrolled ? 36 : 56,
            paddingRight: scrolled ? 36 : 56,
            paddingTop: scrolled ? 12 : 20,
            paddingBottom: scrolled ? 12 : 20,
            boxShadow: scrolled
              ? "0 8px 35px rgba(139, 92, 246, 0.14)"
              : "0 0px 0px rgba(0, 0, 0, 0)",
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="relative mx-auto flex items-center justify-between border backdrop-blur-xs"
        >
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/50 blur-xl" />
              <img
                src={logoImg}
                alt="Neverarie Logo"
                className="relative z-10 h-10 w-10 object-contain"
              />
            </div>
            <span className="text-lg font-extrabold uppercase tracking-wide text-white sm:text-xl">
              Neverarie
            </span>
          </a>

          {/* links */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <ul className="flex items-center gap-5 lg:gap-8">
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className="py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:text-white"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* cta */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLogBtn((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-all hover::border-[#8B5CF6]/60 hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]"
              >
                <CircleUserRound size={21} strokeWidth={1.7} />
              </button>

              {/* Account Buttons */}
              <AnimatePresence>
                {LogBtn && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 8, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute bg-[#171020]/95 border border-[#8B5CF6]/40 w-4 h-4 overflow-hidden top-11 right-1 z-60  rotate-45 backdrop-blur-xl shadow-xl shadow-black/30"
                    ></motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 8, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute text-white bg-[#171020]/95 border border-[#8B5CF6]/40 w-36 overflow-hidden p-2 top-full right-0 z-60 mt-2 rounded-xl backdrop-blur-xl shadow-xl shadow-black/30"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <a
                          href="/Login"
                          className="block rounded-lg px-4 py-2.5  text-sm font-medium hover:bg-[#8B5CF6]/15
                hover:text-[#A78BFA] transition-all duration-100"
                        >
                          Login
                        </a>
                        <div className="mx-2 w-full h-px bg-white/30"></div>
                        <a
                          href="/auth"
                          className="block rounded-lg px-4 py-2.5 text-sm font-medium
                transition-colors hover:bg-[#8B5CF6]/15
                hover:text-[#A78BFA]"
                        >
                          Sign Up
                        </a>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute left-4 right-4 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#171020]/95 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col p-3">
                {NavbarMenu.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a
                      href={item.link}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]"
                    >
                      {item.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* mobile dropdown  */}

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute left-4 right-4 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#171020]/95 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col p-3">
              {NavbarMenu.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-[#8B5CF6]/10 hover:text-[#8B5CF6]"
                  >
                    {item.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
