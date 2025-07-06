import cn from "../utils/cn";

const BackgroundBlurWrapper = ({ children, className }) => {
  return (
    <div
      className={cn(
        "area-wrapper bg-content-blur font-bangla text-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BackgroundBlurWrapper;
