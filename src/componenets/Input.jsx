import React from "react";

const CustomInput = ({
  type = "text",
  className = "form-control",
  style = { width: "100%" },
  ...rest
}) => {
  return <input type={type} className={className} style={style} {...rest} />;
};

export default CustomInput;
