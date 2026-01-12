import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaUtensils,
  FaSpinner,
  FaArrowRight,
  FaUser,
} from "react-icons/fa";
import useTitle from "../../Hooks/useTitle";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";

const InputWrapper = ({ icon: Icon, children }) => (
  <div className="relative flex items-center group">
    <div className="absolute left-4 text-gray-400 group-focus-within:text-orange-500 transition-colors">
      <Icon />
    </div>
    {children}
  </div>
);

const Login = () => {
  useTitle("Login");
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Welcome Back!",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire("Login Failed", "Invalid email or password", "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-gray-950 p-4 sm:p-6 transition-colors duration-300">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl sm:rounded-4xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-none overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-gray-800">
        {/* Left Branding Panel (Matches Register) */}
        <div className="lg:w-[40%] bg-orange-600 p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden min-h-[200px] lg:min-h-auto">
          <div className="z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 sm:mb-8">
              <FaUtensils className="text-xl sm:text-2xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
              Welcome <br /> Back!
            </h2>
            <p className="mt-3 sm:mt-4 text-orange-100 font-medium text-sm sm:text-base">
              Log in to access your favorite meals and local chef community.
            </p>
          </div>

          <div className="z-10 pt-6 sm:pt-8 lg:pt-12 border-t border-orange-500/50">
            <p className="text-xs sm:text-sm opacity-80 italic">
              "Cooking is love made visible."
            </p>
          </div>

          {/* Decorative Background Element */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-50" />
        </div>

        {/* Right Form Panel */}
        <div className="lg:w-[60%] p-6 sm:p-8 lg:p-10 xl:p-14">
          <div className="mb-8 sm:mb-10 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Login to Account
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Please enter your credentials to continue.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:space-y-6"
          >
            <InputWrapper icon={FaEnvelope}>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl sm:rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all text-sm sm:text-base"
                placeholder="Email Address"
              />
            </InputWrapper>

            <div className="space-y-2">
              <InputWrapper icon={FaLock}>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-50 dark:bg-gray-800 border-none rounded-xl sm:rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/50 dark:text-white transition-all text-sm sm:text-base"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 text-gray-400 hover:text-orange-600 transition-colors p-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </InputWrapper>
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs font-semibold text-orange-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 sm:py-5 bg-gray-900 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white rounded-xl sm:rounded-2xl font-bold shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 group text-sm sm:text-base min-h-[48px]"
            >
              {loading ? (
                <FaSpinner className="animate-spin text-lg sm:text-xl" />
              ) : (
                <>
                  Secure Login{" "}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Demo Login Button */}
            <button
              type="button"
              onClick={() => {
                // Auto-fill demo credentials
                const demoEmail = "jamir@gmail.com";
                const demoPassword = "User3@";

                signIn(demoEmail, demoPassword)
                  .then(() => {
                    Swal.fire({
                      toast: true,
                      position: "top-end",
                      icon: "success",
                      title: "Demo Login Successful!",
                      showConfirmButton: false,
                      timer: 3000,
                    });
                    navigate(from, { replace: true });
                  })
                  .catch((error) => {
                    Swal.fire(
                      "Demo Login Failed",
                      "Demo account not available",
                      "error"
                    );
                  });
              }}
              className="w-full py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl sm:rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-sm sm:text-base min-h-[48px]"
            >
              <FaUser className="text-base sm:text-lg" />
              Try Demo Account
            </button>
          </form>

          {/* Social Divider */}
          <div className="my-6 sm:my-8 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-100 dark:border-gray-800"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Or Continue With
            </span>
            <div className="flex-1 border-t border-gray-100 dark:border-gray-800"></div>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 sm:py-4 border border-gray-100 dark:border-gray-800 rounded-xl sm:rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all font-bold text-gray-700 dark:text-gray-200 text-sm sm:text-base min-h-[48px]"
          >
            <FaGoogle className="text-red-500" /> Google Account
          </button>

          <p className="mt-6 sm:mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-600 font-bold hover:underline underline-offset-4 transition-all"
            >
              Register for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
