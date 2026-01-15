import type React from "react";

export type InputFieldProps = {
  Icon?: React.ElementType;
  IconLeading?: React.ElementType;
  label: string;
  containerClassName?: string;
  togglePassword?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;
