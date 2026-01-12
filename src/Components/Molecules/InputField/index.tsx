import { Input } from "../../Atoms/Input";
import { Label } from "../../Atoms/Label";
import type { InputFieldProps } from "./InputField.types";

export default function InputField({ label, ...props }: InputFieldProps) {
  const inputId = props.id || props.name;

  return (
    <div
      className={`flex flex-col gap-1 ${
        props.containerClassName ? `${props.containerClassName}` : `w-80`
      }`}
    >
      <Label text={label} htmlFor={inputId} />
      <Input
        id={inputId}
        aria-describedby={props["aria-describedby"]}
        {...props}
      />
    </div>
  );
}
