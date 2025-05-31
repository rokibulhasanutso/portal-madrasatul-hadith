import React, { useState } from "react";
import IdInput from "./IdInput";
import PasswordInput from "./PasswordInput";

const LoginForm = ({ onSubmit = () => null }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, password });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <IdInput id={id} setId={setId} />
      <PasswordInput password={password} setPassword={setPassword} />
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-600 disabled:bg-gray-300 text-white rounded hover:bg-green-700"
        disabled={!id || !password}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
