import React from "react";
import cn from "./../utils/cn";

const Logo = ({ className }) => {
  return (
    <div className={cn("size-24", className)}>
      <img
        src="/assets/logo-transparent.jpg"
        width={"100%"}
        height={"100%"}
        alt="App Logo"
      />
    </div>
  );
};

export default Logo;
