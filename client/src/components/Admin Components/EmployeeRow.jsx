// src/components/Admin Components/PayrollRow.jsx
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

// Hook to check if any payment for emp/month/year is already paid
const usePaymentStatus = (emp_id, month, year) => {
  return useQuery({
    queryKey: ["paymentStatus", emp_id, month, year],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/payroll/status`,
        {
          params: { emp_id, month, year },
        }
      );
      return res.data.pay; // true or false
    },
    enabled: !!emp_id && !!month && !!year,
  });
};

const PayrollRow = ({ emp, refetch }) => {
  const initials = emp.employee_name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const { data: alreadyPaid, isLoading: statusLoading } = usePaymentStatus(
    emp.employee_id,
    emp.month,
    emp.year
  );

  const handlePay = async () => {
    const pay = await axios.patch(
      `${import.meta.env.VITE_API_URL}/payroll/${emp._id}`,
      {
        isPaid: true,
      }
    );

    if (pay.status === 200) {
      toast.success("Payment successful");
    } else {
      toast.error("Payment failed");
    }

    refetch(); // Refresh parent data
  };

  const renderBadge = (status) => {
    if (!status) {
      return (
        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
          🟨 Pending
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-300">
          ✅ Paid
        </Badge>
      );
    }
  };

  return (
    <TableRow>
      <TableCell className="flex gap-3 items-center">
        <div className="w-10 h-10 bg-indigo-300 text-white rounded-full flex items-center justify-center font-semibold">
          {initials}
        </div>
        <div>
          <div className="font-medium">{emp.employee_name}</div>
          <div className="text-sm text-gray-500">Employee</div>
        </div>
      </TableCell>

      <TableCell>{emp.salary}</TableCell>
      <TableCell>
        {emp.month} , {emp.year}
      </TableCell>
      <TableCell>{emp.payment_date || "_ _ - _ _ - _ _ _ _"}</TableCell>
      <TableCell>{renderBadge(alreadyPaid)}</TableCell>
      <TableCell>
        {statusLoading ? (
          <span className="text-sm text-gray-400">Checking...</span>
        ) : !alreadyPaid ? (
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={handlePay}
          >
            Pay Now
          </Button>
        ) : (
          <span className="text-gray-500 text-sm">Already Paid</span>
        )}
      </TableCell>
    </TableRow>
  );
};

export default PayrollRow;
