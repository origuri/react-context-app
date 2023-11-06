import React from "react";

const ErrorBanner = ({ message }: { message: string }) => {
  return (
    <div style={{ backgroundColor: "tomato" }}>
      에러
      <p />
      {message}
    </div>
  );
};

export default ErrorBanner;
