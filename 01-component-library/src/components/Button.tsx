import React from 'react';

interface ButtonProps<T> {
  /** Prop that define the value of the button */
  value: T;
  /** The function to call when the button is clicked */
  onClick?: (value: T) => void;
  /** Prop to disable the button */
  disabled?: boolean;
}

type ButtonErrorType = {
  type: "error" | "handler_error"; message: string;
}

/* 
  Button component
  * @param {T} value - The value of the button
  * @param {function} onClick - The function to call when the button is clicked
  * @param {boolean} disabled - Prop to disable the button
*/
const Button = <T extends unknown>({
  value,
  disabled = false,
  onClick
}: ButtonProps<T>) => {
  const [error, setError] = React.useState<ButtonErrorType | null>(null);

  //function to validate the error
  const validateError = (): boolean => {
    let isValid = true;
    if (value === undefined || value === null) {
      setError({ type: "error", message: "value prop is required" });
      isValid = false;
    }

    if (!onClick) {
      setError({ type: "handler_error", message: "onClick handler is required" });
      isValid = false;
    }

    return isValid;
  }

  //function to handle the click event
  const handleClick = () => {
    if (!disabled && onClick && validateError()) {
      onClick(value);
    }
  }

  //function to render the error message
  const renderError = (error: ButtonErrorType) => (
    <div>
      <p>Error: {error.message}</p>
    </div>
  )

  if (error) return renderError(error);

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
    >
      {value as React.ReactNode} // Cast the value prop to ReactNode
    </button>
  )
};

export default Button;