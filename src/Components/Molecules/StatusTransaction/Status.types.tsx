import type { ElementType } from "react";

export type StatusTransactionProps = {
  status: string;
  orderId: string;
  created: string;
  Icon: ElementType;
  color?: string;
};
