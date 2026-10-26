import Balatro from "../../components/Balatro";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  return (
    <>
      <div className="min-h-screen  w-full relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Balatro
            color1="#DE443B"
            color2="#006BB4"
            color3="#162325"
            swirl={0.25}
            pixelSize={1.5}
            mouseInteraction
            contrast={3.5}
            lighting={0.4}
            speed={1}
            rotationSpeed={0}
            scale={1}
            detail={5}
            crt={0}
            mouseStrength={1}
            clickSwirl
            intro
            lightMode={false}
          />
        </div>

        <div className="absolute inset-0 bg-black/50" />
        {/*  */}
        <motion.header
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="absolute left-0 top-0 z-20 p-4 sm:p-8 lg:p-10"
        >
          <Link
            to="/"
            className="text-xl font-bold tracking-wide sm:text-3xl uppercase text-[#8B5CF6] hover:text-white transition-all"
          >
            Neverarie
          </Link>
        </motion.header>

        {/* card */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.65,
              rotate: 10,
              rotateX: 18,
              y: 35,
            }}
            animate={{ opacity: 1, scale: 1, rotate: 0, rotateX: 0, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-md rounded-3xl border border-white/20 bg-black/40 p-8 shadow-2xl backdrop-blur-2xl sm:p-10"
          >
            <h1 className="text-center text-white text-2xl font-semibold  sm:text-3xl">
              Welcome Back!
            </h1>
            <form action="" className="mt-6 space-y-5 sm:mt-8">
              <div>
                <label
                  htmlFor=""
                  className="mb-2 block font-medium text-sm text-white/80"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  placeholder="you@example.com"
                  required
                  className="w-full min-w-0 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-white/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full min-w-0 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-white/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-300 hover:text-blue-200"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#8B5CF6] px-4 py-3 font-semibold text-white transition hover:bg-[#a27df8] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                Login
              </button>
            </form>
            <p className="mt-6 text-center text-sm leading-6 text-white/60">
              Don't have an account?
              <Link
                to="/signup"
                className="font-medium text-[#8B5CF6] hover:text-[#ae8df9] ms-1"
              >
                Create account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Login;
