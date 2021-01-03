import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./lottie-loading.json";

const Loading = () => {
  return <Lottie animationData={loadingAnimation} />;
};

export default Loading;
