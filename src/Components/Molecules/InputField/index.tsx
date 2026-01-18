import { Button } from "../../Atoms/Button";
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
    type,
    ...rest
  } = props;

  const isPassword = type === "password" || type === "text";

  return (
    <div className={containerClassName ?? "w-full"}>
      <Label text={label} htmlFor={name} />

      <div
        className="
          mt-1 flex h-11 w-full items-center gap-2
          rounded-lg border border-input bg-background
          px-3
          focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2
        "
      >
        {Icon ? (
          <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : null}

        <Input
          id={name}
          name={name}
          type={type}
          className={`h-full w-full border-0 bg-transparent p-0 text-sm outline-none focus-visible:ring-0 ${className ?? ""}`}
          {...rest}
        />

        {IconLeading ? (
          <Button
            variant={"ghost"}
            type="button"
            onClick={togglePassword}
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-foreground"
            aria-label={isPassword ? "Tampilkan/Sembunyikan password" : "Toggle"}
          >
            <IconLeading className="h-4 w-4 cursor-pointer" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
