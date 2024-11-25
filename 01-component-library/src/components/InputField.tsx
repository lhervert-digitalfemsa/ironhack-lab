import React from "react";

interface InputFieldProps<T extends string | number> {
  /** The value of the input field */
  value: T;
  /** The function to call when the input field value changes */
  onChange: (value: T) => void;
  /** The placeholder text of the input field */
  placeholder?: string;
  /** Prop to make the input field required */
  required?: boolean;
  /** Prop to define the type of the input field */
  type?: "text" | "password" | "email";
  /** Prop to disable the input field */
  disabled?: boolean;
}

type InputFieldErrorType = {
  type: "error" | "change_error" | "type_error";
  message: string;
}

/*
  InputField component
  * @param {T} value - The value of the input field
  * @param {function} onChange - The function to call when the input field value changes
  * @param {string} placeholder - The placeholder text of the input field
  * @param {boolean} required - Prop to make the input field required
  * @param {string} type - Prop to define the type of the input field
  * @param {boolean} disabled - Prop to disable the input field
*/
const InputField = <T extends string | number>({
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  disabled = false,
}: InputFieldProps<T>): JSX.Element => {
  const [error, setError] = React.useState<InputFieldErrorType | null>(null);

  //function to validate the error
  const validateError = (): boolean => {
    let isValid = false;
    if (typeof value !== "string" && typeof value !== "number") {
      setError({ type: "type_error", message: "value prop must be a string or number" });
    }
    if (required && !value) {
      setError({ type: "error", message: "value prop is required" });
    }
    if (onChange === undefined) {
      setError({ type: "change_error", message: "onChange handler is required" });
    }
    isValid = true;

    return isValid;
  }

  //function to handle the change event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateError()) onChange(event.target.value as T);
  }

  //function to render the error message
  const renderError = (error: InputFieldErrorType) => (
    <p>Error: {error.message}</p>
  )

  if (error) return renderError(error);

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
    />
  )
};

export default InputField;