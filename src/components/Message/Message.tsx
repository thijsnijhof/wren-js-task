import React from "react";
import "./Message.css";

interface IErrorMessageProps {
  message: string;
  type: string;
}

const Message: React.FunctionComponent<IErrorMessageProps> = ({
  message,
  type
}) => {
  return (
    <div
      className={`${
        type === "success" ? "message-success" : "message-error"
      } message font-weight-light mt-2`}
    >
      <small>{message}</small>
    </div>
  );
};

export default Message;
