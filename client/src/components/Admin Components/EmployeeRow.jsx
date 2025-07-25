import React from 'react'

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

const EmployeeRow = ({ emp, refetchh }) => {
    //console.log("EmployeeRow emp:", emp);
    const initials = emp.employee_name
        .split(" ")
        .map((n) => n[0])
        .join("");

    //check if payment is done or not from database
    const fetchPaymentStatus = async (emp_id, month, year) => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/payroll/status`, {
            params: { emp_id, month, year }
        });
        if (res.status !== 200) throw new Error("Failed to fetch employees");
        console.log("Payment status fetched:", res.data.pay);
        return res.data.pay;
    }

    const { data: isPaid={pay:false}, isLoading: statusLoading, refetch } = useQuery({
        queryKey: ['paymentStatus', emp.employee_id, emp.month, emp.year],
        queryFn: fetchPaymentStatus,
        enabled: !!emp.employee_id && !!emp.month && !!emp.year,
    });
   // refetchh();
    //console.log(isPaid)
    //pay action
    const handlePay = async (pay_id) => {
        const pay = await axios.patch(`${import.meta.env.VITE_API_URL}/payroll/${pay_id}`, {
            isPaid: true
        });
        if (pay.status === 200) {
            toast.success("Payment successful:", pay.data);
        } else {
            console.error("Payment failed:", pay.data);
        }
        refetchh();
        refetch();
    }



    const renderBadge = (status) => {
        if (status === false) {
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
            <TableCell>{emp.month} , {emp.year}</TableCell>
            <TableCell className="">{emp.payment_date || "_ _ - _ _ -_ _ _ _"}</TableCell>
            <TableCell>{renderBadge(emp.isPaid)}</TableCell>
            <TableCell>
                {!isPaid ? (
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={() => handlePay(emp._id)}
                    >
                        Pay Now
                    </Button>
                ) : (
                    <span className="text-gray-500 text-sm">Pay Now</span>
                )}
            </TableCell>
        </TableRow>
    )
}

export default EmployeeRow