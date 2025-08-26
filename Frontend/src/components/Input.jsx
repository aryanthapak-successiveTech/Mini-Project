import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.htmlFor} className={props.labelClasses}>
        {props.htmlFor}
      </label>
      <div className="mt-2">
        <input
          id={props.htmlFor}
          name={props.htmlFor}
          type={props.type}
          autoComplete={props.htmlFor}
          required
          className={props.inputClasses}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default Input;