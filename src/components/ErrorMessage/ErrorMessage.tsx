import React from "react";

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = ({
  message
}) => {
  return <small className="text-danger">{message}</small>;
};

export default ErrorMessage;
