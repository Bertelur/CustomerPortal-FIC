import { Input } from "../../Atoms/Input";
import { Label } from "../../Atoms/Label";
import type { InputFieldProps } from "./InputField.types";

export default function InputField({ label, ...props }: InputFieldProps) {
  const {
    containerClassName,
    Icon,
    IconLeading,
    name,
    className,
    togglePassword,
    ...rest
  } = props;

  return (
    <div className={`flex flex-col gap-1 ${containerClassName ?? "w-80"}`}>
      <Label text={label} htmlFor={name} />

      <div className="relative flex border-2 rounded-lg">
        {Icon && (
          <div className="pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}

        <Input
          id={name}
          name={name}
          className={`border-none ${className ?? ""}`}
          {...rest}
        />

        {IconLeading && (
          <button
            type="button"
            onClick={togglePassword}
            className="pr-3 flex items-center"
          >
            <IconLeading className="h-5 w-5 text-gray-400 cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
}
