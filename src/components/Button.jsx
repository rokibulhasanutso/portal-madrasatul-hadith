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
        "text-center ring-2 ring-gray-700 rounded-xl flex items-center gap-2 py-2 px-4 bg-gray-900",
        className
      )}
    >
      {Icon && <Icon className={cn("size-7", iconClassName)} />}
      {children || value}
    </button>
  );
};

export default Button;
