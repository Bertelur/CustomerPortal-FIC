import type React from "react";

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  containerClassName?: string;
};
