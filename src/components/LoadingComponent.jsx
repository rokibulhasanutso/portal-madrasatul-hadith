import { LoaderCircle, Network } from "lucide-react";
import NetworkStatus from "./NetworkStatus";

const LoadingComponent = ({ loadingState, title, children }) => {
  if (loadingState) {
    return (
      <>
        <div className="flex justify-center items-center gap-2 max-h-screen h-full">
          <LoaderCircle className="animate-spin size-7" />
          <p>{title || "অপেক্ষা করুন..."}</p>
        </div>
      </>
    );
  } else {
    return children;
  }
};

export default LoadingComponent;
