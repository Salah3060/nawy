// React
import React from "react";

// Loading Component
const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingComponent;
