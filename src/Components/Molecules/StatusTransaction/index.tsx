import type { StatusTransactionProps } from "./Status.types";

const StatusTransaction = ({
  Icon,
  color,
  status,
  orderId,
  created,
}: StatusTransactionProps) => {
  const formatDate = (dates: string) => {
    const date = new Date(dates);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex items-center gap-2">
        <Icon className={`${color} w-5 h-5`} />
        <span className={`${color} font-medium`}>{status}</span>
      </div>
      <div className="text-sm text-gray-600">
        <span className="font-medium">Order #{orderId}</span>
        <span className="mx-2">•</span>
        <span>{formatDate(created)}</span>
      </div>
    </div>
  );
};

export default StatusTransaction;
