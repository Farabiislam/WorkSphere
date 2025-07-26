import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";

const Payroll = () => {
  const { user } = useContext(AuthContext);

  // Fetch payroll data
  const fetchPayrollData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/payroll`);
    if (res.status !== 200) throw new Error("Failed to fetch payroll");
    return res.data;
  };

  const {
    data: payrollData = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["payrollData", user?.email],
    queryFn: fetchPayrollData,
    enabled: !!user?.email,
  });

  // ✅ Handle payment
  const handlePay = async (pay_id, employee_id) => {
    try {
      const pay = await axios.patch(
        `${import.meta.env.VITE_API_URL}/payroll/${pay_id}`,
        {
          isPaid: true,
          employee_id,
        }
      );

      if (pay.status === 200) {
        toast.success("Payment successful");
        refetch();
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      toast.error("Payment error",error);
    }
  };

  const renderBadge = (status) =>
    status ? (
      <Badge className="bg-green-100 text-green-700 border-green-300">
        ✅ Paid
      </Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">
        🟨 Pending
      </Badge>
    );

  // Group key map for disabling buttons
  const paymentGroupMap = {};
  payrollData.forEach((record) => {
    const key = `${record.employee_id}-${record.month}-${record.year}`;
    if (!paymentGroupMap[key]) {
      paymentGroupMap[key] = record.isPaid;
    } else {
      paymentGroupMap[key] = paymentGroupMap[key] || record.isPaid;
    }
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading data</p>;

  return (
    <div className="p-2 sm:p-4">
      <Card className="p-6 w-full overflow-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <h2 className="text-xl font-bold">Payroll Management</h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search payment requests..."
              className="max-w-sm"
            />
            <div className="text-sm px-3 py-1 border rounded text-gray-500">
              10 per page
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Month & Year</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollData.map((emp) => {
              const initials = emp.employee_name
                .split(" ")
                .map((n) => n[0])
                .join("");

              const groupKey = `${emp.employee_id}-${emp.month}-${emp.year}`;
              const groupIsPaid = paymentGroupMap[groupKey];

              return (
                <TableRow key={emp._id}>
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
                    {emp.month}, {emp.year}
                  </TableCell>
                  <TableCell>
                    {emp.payment_date || "_ _ - _ _ - _ _ _ _"}
                  </TableCell>
                  <TableCell>{renderBadge(emp.isPaid)}</TableCell>
                  <TableCell>
                    {groupIsPaid ? (
                      <span className="text-gray-500 text-sm">Pay Now</span>
                    ) : (
                      <Button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={() => handlePay(emp._id, emp.employee_id)}
                        disabled={groupIsPaid}
                      >
                        Pay Now
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>Showing {payrollData.length} payment request(s)</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <div className="bg-indigo-600 text-white px-3 py-1 rounded">1</div>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Payroll;
