import cn from "../utils/cn";

const Button = ({
  children,
  value,
  className,
  onClick,
  icon: Icon,
  iconClassName,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `${
          Icon ? "flex items-center gap-3.5" : "text-center"
        } ring-2 ring-gray-700 rounded-xl py-2 px-4 bg-gray-900`,
        className
      )}
    >
      {Icon && <Icon className={cn("size-7", iconClassName)} />}
      {children || value}
    </button>
  );
};

export default Button;
