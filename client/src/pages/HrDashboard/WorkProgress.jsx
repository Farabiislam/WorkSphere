import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const workRecords = [
  {
    employee: "Sarah Johnson",
    initials: "SJ",
    task: "Cloud Infrastructure Setup",
    date: "2024-02-12",
    description:
      "Set up AWS infrastructure with auto-scaling, load balancing, and monitoring. Implemented CI/CD pipeline.",
    status: "In Progress",
    priority: "High",
    hours: 30,
    tags: ["Infrastructure", "Work Record"],
  },
  {
    employee: "Michael Chen",
    initials: "MC",
    task: "Security Implementation",
    date: "2024-02-08",
    description:
      "Implemented OAuth 2.0, encryption, and security audit. Conducted vulnerability assessment.",
    status: "Completed",
    priority: "Critical",
    hours: 26,
    tags: ["Security", "Work Record"],
  },
  {
    employee: "Michael Chen",
    initials: "MC",
    task: "Security Implementation",
    date: "2024-02-08",
    description:
      "Implemented OAuth 2.0, encryption, and security audit. Conducted vulnerability assessment.",
    status: "Completed",
    priority: "Critical",
    hours: 26,
    tags: ["Security", "Work Record"],
  },
  {
    employee: "Michael",
    initials: "MC",
    task: "Security Implementation",
    date: "2024-03-08",
    description:
      "Implemented OAuth 2.0, encryption, and security audit. Conducted vulnerability assessment.",
    status: "Completed",
    priority: "Critical",
    hours: 26,
    tags: ["Security", "Work Record"],
  },

];

const ITEMS_PER_PAGE = 2;

const WorkProgress = () => {
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return workRecords.filter((item) => {
      const empMatch =
        employeeFilter === "All" || item.employee === employeeFilter;
      const monthMatch =
        monthFilter === "All" ||
        new Date(item.date).toLocaleString("default", { month: "long" }) ===
          monthFilter;
      return empMatch && monthMatch;
    });
  }, [employeeFilter, monthFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const allMonths = [
    ...new Set(
      workRecords.map((r) =>
        new Date(r.date).toLocaleString("default", { month: "long" })
      )
    ),
  ];
  const allEmployees = [...new Set(workRecords.map((r) => r.employee))];

  return (
    <Card className="max-w-6xl mx-auto mt-10 p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Work Progress Records</h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-auto">
          <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Employees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Employees</SelectItem>
              {allEmployees.map((emp, idx) => (
                <SelectItem key={idx} value={emp}>
                  {emp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Months</SelectItem>
              {allMonths.map((month, idx) => (
                <SelectItem key={idx} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {paginated.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex gap-4 w-full md:w-auto">
              <Avatar>
                <AvatarFallback>{item.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm md:text-base">{item.task}</p>
                <p className="text-gray-500 text-xs md:text-sm">{item.employee}</p>
                <p className="text-xs md:text-sm mt-1">{item.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      className={tag === "Work Record" ? "bg-green-500" : ""}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 text-xs md:text-sm w-full md:w-auto">
              <div>{new Date(item.date).toLocaleDateString()}</div>
              <Badge
                className={
                  item.status === "Completed"
                    ? "bg-green-600"
                    : "bg-blue-500 text-white"
                }
              >
                {item.status}
              </Badge>
              <Badge
                className={
                  item.priority === "Critical"
                    ? "bg-red-500"
                    : "bg-orange-400 text-white"
                }
              >
                {item.priority}
              </Badge>
              <div className="font-bold">{item.hours}h</div>
              <div className="flex flex-wrap justify-end gap-2 mt-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button size="sm" className="bg-violet-600 text-white">
                  Approve
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <p>
          Showing {paginated.length} of {filtered.length} work records
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button variant="default" size="sm" disabled>
            {page}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WorkProgress;
