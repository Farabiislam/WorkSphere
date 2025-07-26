import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, X } from "lucide-react";

const paymentData = [
  { month: "January", year:"2024", amount: "$5,500", transactionId: "TXN-2024-001" },
  { month: "February", year: "2024", amount: "$5,500", transactionId: "TXN-2024-002" },
  { month: "March ", year: "2024", amount: "$5,750", transactionId: "TXN-2024-003" },
  { month: "April ", year: "2024", amount: "$5,750", transactionId: "TXN-2024-004" },
  { month: "May ", year: "2024", amount: "$6,000", transactionId: "TXN-2024-005" },
  { month: "June ", year: "2024", amount: "$6,000", transactionId: "TXN-2024-006" },
  { month: "July ", year: "2024", amount: "$6,250", transactionId: "TXN-2024-007" },
  { month: "August", year: "2024", amount: "$6,250", transactionId: "TXN-2024-008" },
];

const PAGE_SIZE = 5;

const PaymentHistory = () => {
  const [payments, setPayments] = useState(paymentData);
  const [page, setPage] = useState(1);
  

  const totalPages = Math.ceil(payments.length / PAGE_SIZE);
  const paginated = payments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Card className="max-w-5xl mx-auto mt-10">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Payment History</h2>
          <p className="text-sm text-muted-foreground">
            Total: {payments.length} payments
          </p>
        </div>

        <div className="overflow-x-auto rounded-md border scrollbar-hide">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    Month <ArrowUpDown className="w-4 h-4 opacity-50" />
                  </div>
                </th>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    Year <ArrowUpDown className="w-4 h-4 opacity-50" />
                  </div>
                </th>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    Amount <ArrowUpDown className="w-4 h-4 opacity-50" />
                  </div>
                </th>
                <th className="p-3 text-left">
                  <div className="flex items-center gap-1">
                    Transaction ID{" "}
                    <ArrowUpDown className="w-4 h-4 opacity-50" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((payment, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3">{payment.month}</td>
                  <td className="p-3">{payment.year}</td>
                  <td className="p-3">{payment.amount}</td>
                  <td className="p-3">{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div>
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, payments.length)} to{" "}
            {Math.min(page * PAGE_SIZE, payments.length)} of {payments.length}{" "}
            entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
              {page}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
