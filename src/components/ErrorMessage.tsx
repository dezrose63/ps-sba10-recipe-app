import React from "react";

interface ErrorMessageProps {
  title?: string;
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = "Oops!",
  message,
}) => {
  return (
    <div className="rounded-lg border border-red-500/60 bg-red-500/10 p-4 text-sm">
      <p className="font-semibold text-red-300">{title}</p>
      <p className="text-red-200">{message}</p>
    </div>
  );
};

export default ErrorMessage;
