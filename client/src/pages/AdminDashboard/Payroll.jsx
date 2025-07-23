import React from 'react'

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

const payrollData = [
  {
    id: 1,
    name: "John Smith",
    salary: "$75,000",
    monthYear: "December 2024",
    paymentDate: "-",
    status: "Pending",
    avatar: "JS",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    salary: "$85,000",
    monthYear: "December 2024",
    paymentDate: "-",
    status: "Pending",
    avatar: "SJ",
  },
  {
    id: 3,
    name: "Michael Chen",
    salary: "$65,000",
    monthYear: "December 2024",
    paymentDate: "-",
    status: "Pending",
    avatar: "MC",
  },
  {
    id: 4,
    name: "Emily Davis",
    salary: "$95,000",
    monthYear: "December 2024",
    paymentDate: "-",
    status: "Pending",
    avatar: "ED",
  },
  {
    id: 5,
    name: "David Wilson",
    salary: "$70,000",
    monthYear: "November 2024",
    paymentDate: "2024-11-30",
    status: "Paid",
    avatar: "DW",
  },
];

const Payroll = () => {

  const renderBadge = (status) => {
    if (status === "Pending") {
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
    <div className='p-2 sm:p-4'>
      <Card className="p-6 w-full overflow-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <h2 className="text-xl font-bold">Payroll Management</h2>
          <div className="flex items-center gap-2">
            <Input placeholder="Search payment requests..." className="max-w-sm" />
            <div className="text-sm px-3 py-1 border rounded text-gray-500">10 per page</div>
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
            {payrollData.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-indigo-300 text-white rounded-full flex items-center justify-center font-semibold">
                    {emp.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{emp.name}</div>
                    <div className="text-sm text-gray-500">Employee</div>
                  </div>
                </TableCell>
                <TableCell>{emp.salary}</TableCell>
                <TableCell>{emp.monthYear}</TableCell>
                <TableCell>{emp.paymentDate}</TableCell>
                <TableCell>{renderBadge(emp.status)}</TableCell>
                <TableCell>
                  {emp.status === "Pending" ? (
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                      Pay Now
                    </Button>
                  ) : (
                    <span className="text-gray-500 text-sm">Completed</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>Showing 1 to 5 of 5 payment requests</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <div className="bg-indigo-600 text-white px-3 py-1 rounded">1</div>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Payroll