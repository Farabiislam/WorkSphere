import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Filter } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const allEmployees = [
  {
    name: "John Smith",
    email: "john.smith@company.com",
    verified: false,
    bank: "**** 1234",
    salary: "$75,000",
    role: "Software Engineer",
    initials: "JS",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    verified: true,
    bank: "**** 5678",
    salary: "$85,000",
    role: "Senior Developer",
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    email: "michael.chen@company.com",
    verified: false,
    bank: "**** 9012",
    salary: "$65,000",
    role: "Junior Developer",
    initials: "MC",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@company.com",
    verified: true,
    bank: "**** 3456",
    salary: "$95,000",
    role: "Team Lead",
    initials: "ED",
  },
  {
    name: "David Wilson",
    email: "david.wilson@company.com",
    verified: false,
    bank: "**** 7890",
    salary: "$70,000",
    role: "QA Engineer",
    initials: "DW",
  },
];

const ITEMS_PER_PAGE = 4;

const EmployeeList = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);

  const filteredEmployees = useMemo(() => {
    let result = allEmployees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase())
    );
    if (showOnlyVerified) {
      result = result.filter((emp) => emp.verified);
    }
    return result;
  }, [search, showOnlyVerified]);

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  return (
    <Card className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employee Management</h2>
        <div className="flex gap-2">
          <Input
            className="w-64"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <Button
            variant={showOnlyVerified ? "default" : "outline"}
            onClick={() => setShowOnlyVerified((prev) => !prev)}
          >
            <Filter className="mr-2 h-4 w-4" /> Verified Only
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b text-left">
            <tr>
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Bank Account</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((emp, idx) => (
              <tr key={idx} className="border-b">
                <td className="flex items-center gap-3 py-4">
                  <Avatar>
                    <AvatarFallback>{emp.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium leading-none">{emp.name}</div>
                    <div className="text-xs text-gray-500">{emp.role}</div>
                  </div>
                </td>
                <td>{emp.email}</td>
                <td>
                  {emp.verified ? (
                    <Check className="text-green-500 w-5 h-5" />
                  ) : (
                    <X className="text-red-500 w-5 h-5" />
                  )}
                </td>
                <td>{emp.bank}</td>
                <td>{emp.salary}</td>
                <td className="space-x-2">
                  <Button disabled={!emp.verified} variant="default" size="sm">
                    Pay
                  </Button>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Showing{" "}
          {filteredEmployees.length === 0
            ? 0
            : (currentPage - 1) * ITEMS_PER_PAGE + 1}
          {" to "}
          {Math.min(
            currentPage * ITEMS_PER_PAGE,
            filteredEmployees.length
          )} of {filteredEmployees.length} employees
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeList;
