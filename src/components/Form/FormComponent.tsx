import React, { memo, useState } from "react";

/* Styles */
import "./FormComponent.scss";

/* Interface */
import type { IInput, ISubmit } from "../../interface/formComponent";

/* Icons */
import { AiOutlineEye } from "react-icons/ai";
import BlinkLoader from "../Loader/Loader";

// ================================================= Form Components Start =================================================

/*==================
👉 Input With Label
===================*/

const MyInput = memo((props: IInput) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="input_wrapper label_input_wrapper">
        {props.labelName && (
          <label htmlFor={props.id} className="label input_label">
            {props.labelName}
          </label>
        )}

        {props.type === "password" && (
          <AiOutlineEye
            className="eye_icon"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}

        <input
          type={`${
            props.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : props.type
          }`}
          id={props.id}
          className="input Label_input"
          placeholder={props.placeholder}
          name={props.labelName}
          onClick={props.onClick}
          onChange={props.onChange}
          value={props.value}
          autoComplete={props.type === "password" ? "new-password" : "off"}
          required={props.required}
          disabled={props.disabled}
          readOnly={props.readOnly}
        />
      </div>
      {props.error && <p className="error">{props.error}</p>}
    </>
  );
});

/*========
👉 Submit
=========*/

const Submit = memo((props: ISubmit) => {
  return (
    <button
      type="submit"
      className="myBtn input_submit"
      onClick={props.onClick}
    >
      {props.loading ? <BlinkLoader /> : "Submit"}
    </button>
  );
});

// =================================================== Form Components End ==================================================

export { MyInput, Submit };
