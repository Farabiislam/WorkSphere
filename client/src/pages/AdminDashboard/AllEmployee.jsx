import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const employees = [
  {
    name: "John Smith",
    email: "john.smith@company.com",
    designation: "Software Engineer",
    salary: "$75,000",
    isHR: false,
    isFired: false,
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    designation: "Senior Developer",
    salary: "$85,000",
    isHR: true,
    isFired: false,
  },
  {
    name: "Michael Chen",
    email: "michael.chen@company.com",
    designation: "Junior Developer",
    salary: "$65,000",
    isHR: false,
    isFired: false,
  },
  {
    name: "Emily Davis",
    email: "emily.davis@company.com",
    designation: "Team Lead",
    salary: "$95,000",
    isHR: true,
    isFired: false,
  },
  {
    name: "David Wilson",
    email: "david.wilson@company.com",
    designation: "QA Engineer",
    salary: "$70,000",
    isHR: false,
    isFired: true,
  },
];


const AllEmployee = () => {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState(dummyEmployees);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleHR = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, isHR: !emp.isHR } : emp
      )
    );
  };

  const fireEmployee = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, isFired: true } : emp
      )
    );
  };
  return (
    <div>
      <div className="p-6 bg-white shadow rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">Employee Management</h2>
          <div className="flex gap-2 items-center">
            <Input placeholder="Search employees..." className="w-64" />
            <select className="border px-3 py-1 rounded-md text-sm">
              <option>10 per page</option>
              <option>20 per page</option>
              <option>50 per page</option>
            </select>
          </div>
        </div>

        <ScrollArea className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Make HR</TableHead>
                <TableHead>Fire</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp, idx) => {
                const initials = emp.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-none">{emp.name}</p>
                          <p className="text-sm text-muted-foreground">{emp.designation}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>{emp.salary}</TableCell>
                    <TableCell>
                      {emp.isHR ? (
                        <Badge variant="outline">HR</Badge>
                      ) : (
                        <Button size="sm">Make HR</Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {emp.isFired ? (
                        <Badge variant="destructive">Fired</Badge>
                      ) : (
                        <Button size="icon" variant="destructive">
                          ✕
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing 1 to 5 of {employees.length} employees
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="default" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllEmployee