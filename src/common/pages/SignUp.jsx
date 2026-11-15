import Balatro from "../../components/Balatro";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { registerAPI } from "../../services/allAPI";

function SignUp() {
  const [viewPass, setViewPass] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(userDetails);
  const navigate = useNavigate();

  const HandleRegister = async () => {
    const { username, email, password } = userDetails;
    if (!username || !email || !password) {
      alert("Fill the details completely");
    } else {
      const result = await registerAPI(userDetails);
      console.log(result);
      if (result.status == 200) {
        alert("Registered successfully");
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else if (result.status == 404) {
        alert(result.response.data);
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      } else {
        alert("something went wrong");
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
      }
    }
  };
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
              Create Account
            </h1>
            <form action="" className="mt-6 space-y-4 sm:mt-8">
              <div>
                <label
                  htmlFor=""
                  className="mb-2 block font-medium text-sm text-white/80"
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={userDetails?.username}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                  required
                  className="w-full min-w-0 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-white/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
              <div>
                <label
                  htmlFor=""
                  className="mb-2 block font-medium text-sm text-white/80"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={userDetails?.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
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
                <div className="relative">
                  <input
                    id="password"
                    type={!viewPass ? "password" : "text"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={userDetails?.password}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                    required
                    className="w-full min-w-0 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white outline-none placeholder:text-white/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                  <button
                    onClick={() => setViewPass((prev) => !prev)}
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-white/40 transition hover:text-white focus:outline-none"
                    aria-label={!viewPass ? "Hide password" : "Show password"}
                  >
                    {!viewPass ? <EyeOff /> : <Eye />}

                    {/* <Eye />
                    <EyeOff /> */}
                  </button>
                </div>
                {userDetails.password.length < 8 && (
                  <p className="mt-1.5 text-xs text-red-400/55">
                    Use at least 8 characters.
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={HandleRegister}
                className="w-full rounded-xl bg-[#8B5CF6] px-4 py-3 font-semibold text-white transition hover:bg-[#a27df8] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                Create Account
              </button>
            </form>
            <p className="mt-6 text-center text-sm leading-6 text-white/60">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-[#8B5CF6] hover:text-[#ae8df9] ms-1"
              >
                Sign In
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
