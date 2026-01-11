import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

export type LabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
> & {
  text: string;
};
