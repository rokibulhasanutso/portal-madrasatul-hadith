import { useNavigate } from "react-router-dom";
import cn from "../utils/cn";
import { Plus } from "lucide-react";

const AddButton = ({ children, className, value, buttonClassName, action }) => {
  const navigate = useNavigate();

  return (
    <div className={cn("flex justify-start my-4 font-bangla", className)}>
      <button
        onClick={() => navigate(action)}
        className={cn(
          "px-2 py-2.5 flex items-center ring-2 ring-gray-700 rounded-xl bg-gray-900",
          buttonClassName
        )}
      >
        <Plus />
        <span className="px-2">{children || value}</span>
      </button>
    </div>
  );
};

export default AddButton;
