import type { IconType } from "react-icons";

export type TransactionStatus = "paid" | "pending" | "expired" | "failed";

export interface StatusConfig {
  label: string;
  icon: IconType;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;

  productId: string;
  productIdType: "objectId" | string;

  sku: string;
}

export interface DataTransaction {
  id: string;
  userId: string;

  amount: number;
  currency: string;

  status: TransactionStatus;

  paymentMethod: string;
  paymentExternalId: string;
  xenditInvoiceId: string;

  invoiceUrl: string;

  customer: any | null;
  items: InvoiceItem[];

  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
}
