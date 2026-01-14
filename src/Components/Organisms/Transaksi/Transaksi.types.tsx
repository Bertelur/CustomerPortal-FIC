import type { IconType } from "react-icons";

export type TransactionStatus = "PENDING" | "PAID" | "SETTLED";

export type StatusConfig = {
  label: string;
  icon: IconType;
  color: string;
  bgColor: string;
  borderColor: string;
};

export type InvoiceItem = {
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

export interface DataTransaction {
  id: number;
  productName: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  external_id: string;
  created: string;
  items?: InvoiceItem[];
  payment_method?: string;
  bank_code?: string;
  invoice_url?: string;
}
