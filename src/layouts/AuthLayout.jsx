import React, { useState } from "react";
import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";
import supabase from "../supabase/config";
import { Loader } from "lucide-react";
import { useAuth } from "../providers/AuthProvider";
import { redirect, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { saveAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    const { data: auth, error: authError } = await supabase
      .from("auth")
      .select("*")
      .eq("auth_id", formData.id)
      .eq("auth_password", formData.password)
      .limit(1);

    if (authError) {
      setErrorMessage("অনিবার্যিত কারণবশত সার্ভারে সমস্যা হচ্ছে");
    } else if (auth.length > 0) {
      const withTimeID = Date.now();

      const { data, error } = await supabase
        .from("auth")
        .upsert({
          id: auth[0].id,
          logged_in: true,
          logged_id: withTimeID,
        })
        .select();

      const mainData = data[0];
      delete mainData.auth_password;

      saveAuth(mainData);

      // redirect to home page
      navigate("/");
      if (error) {
        setErrorMessage("অনিবার্যিত কারণবশত সার্ভারে সমস্যা হচ্ছে");
      }
    } else {
      setErrorMessage("আপনার দেয়া ID এবং পাসওয়ার্ডটি সঠিক নয়");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-[512px] min-h-svh mx-auto flex flex-col justify-center items-center">
      <div className="flex-1 w-full flex flex-col justify-center items-center">
        <div className="py-10 space-y-3.5">
          <Logo className={"size-36 mx-auto"} />
          <h1 className="text-3xl text-center font-galada text-gray-700">
            মাদ্‌রাসাতুল হাদিস
          </h1>
        </div>

        {!loading ? (
          <div className="w-full max-w-sm px-4 mx-auto space-y-5">
            {errorMessage && (
              <div>
                <p className="text-red-500 text-center w-full">
                  {errorMessage}
                </p>
              </div>
            )}
            <LoginForm onSubmit={handleSubmit} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-y-2">
            <Loader className="animate-spin size-7" />{" "}
            <span className="ml-4">অনুগ্রহ করে অপেক্ষা করুন।</span>
          </div>
        )}
      </div>

      <div className="py-16 font-semibold text-gray-500 text-center">
        <p>Version: 0.0.2</p>
        <p>
          Develop by{" "}
          <a
            href="https://wa.me/+8801812410135"
            className="text-gray-700 hover:text-blue-500 hover:underline"
          >
            Rokibul Hasan
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
