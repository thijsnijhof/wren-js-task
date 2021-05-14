import React from "react";

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = ({
  message
}) => {
  return <p className="text-danger">{message}</p>;
};

export default ErrorMessage;
