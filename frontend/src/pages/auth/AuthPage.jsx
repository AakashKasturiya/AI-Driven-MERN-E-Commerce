import { useState } from "react";
import { CreateAccount } from "./CreateAccount";
import { SignIn } from "./SignIn";



export const AuthPage = () => {
  const [loginToggle, setLoginToggle] = useState(true);

  return (
    <>
      <main className="pt-28 md:pt-32 pb-20 px-6 md:px-12 max-w-lg mx-auto">
        <div>
          <div className="text-center mb-10">
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-2">
              {loginToggle ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-medium-gray">
              {loginToggle
                ? "Sign in to access your orders and saved preferences."
                : "Join VELORA for personalized style recommendations."}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 mb-8">
            <button
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${loginToggle ? "bg-white text-charcoal shadow-sm" : "text-medium-gray"}`}
              onClick={() => setLoginToggle(true)}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${!loginToggle ? "bg-white text-charcoal shadow-sm" : "text-medium-gray"}`}
              onClick={() => setLoginToggle(false)}
            >
              Create Account
            </button>
          </div>
          
          {loginToggle ? <SignIn loginToggle={loginToggle} setLoginToggle={setLoginToggle} /> : <CreateAccount loginToggle={loginToggle} setLoginToggle={setLoginToggle} />}
        </div>
      </main>
    </>
  );
};
