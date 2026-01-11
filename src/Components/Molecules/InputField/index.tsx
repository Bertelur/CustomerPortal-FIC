import { Input } from "../../Atoms/Input";
import { Label } from "../../Atoms/Label";
import type { InputFieldProps } from "./InputField.types";

export default function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-1 w-80`}>
      <Label text={label} htmlFor={props.name} />
      <Input {...props} />
    </div>
  );
}
