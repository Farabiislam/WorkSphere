import React, { useState, useMemo, use } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Loader2Icon } from "lucide-react";

const ITEMS_PER_PAGE = 5;

const WorkProgress = () => {
  const { user } = use(AuthContext)
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [monthFilter, setMonthFilter] = useState("All");
  const [page, setPage] = useState(1);

  const fetchWorks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/work-progress`);
    if (res.status !== 200) throw new Error("Failed to fetch work progress");
    console.log("Fetched work progress:", res.data);
    return res.data;
  };

  const { data: workRecords = [], isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["work-progress", user?.email],
    queryFn: fetchWorks,
    enabled: !!user?.email,
  });


  const filtered = useMemo(() => {
    return workRecords.filter((item) => {
      const empMatch =
        employeeFilter === "All" || item.employeeInfo?.fullName === employeeFilter;

      const recordMonth = new Date(item.date).toLocaleString("default", { month: "long" });
      const monthMatch = monthFilter === "All" || recordMonth === monthFilter;

      return empMatch && monthMatch;
    });
  }, [employeeFilter, monthFilter, workRecords]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );
  const allEmployees = [...new Set(workRecords.map((r) => r.employeeInfo?.fullName))];

  if (isLoading||isFetching) {
    return <div className="flex items-center justify-center p-10 "><Button size="sm" disabled>
      <Loader2Icon className="animate-spin" />
      Please wait
    </Button></div>
  }
  return (
    <Card className="w-11/12 mx-auto my-10 p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Work Progress Records</h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full md:w-auto">
          <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Employees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Employees</SelectItem>
              {allEmployees.map((email, idx) => (
                <SelectItem key={idx} value={email}>
                  {email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={monthFilter} onValueChange={setMonthFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Months</SelectItem>
              {months.map((month, idx) => (
                <SelectItem key={idx} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => {
            setEmployeeFilter('All')
            setMonthFilter('All')
            refetch()
          }}>Refresh</Button>
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
                <AvatarFallback>{item.initials}u</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm md:text-base">{item.task}</p>
                <p className="text-gray-500 text-xs md:text-sm">{item.employeeInfo?.fullName}</p>
                <p className="text-gray-400 text-xs">{item.employeeInfo?.designation}</p>

              </div>
            </div>

            <div className="flex flex-col items-end gap-2 text-xs md:text-sm w-full md:w-auto">
              <div>{new Date(item.date).toLocaleDateString()}</div>
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
            variant="secondary"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button variant="default" size="sm" >
            {page}
          </Button>
          <Button
            variant="secondary"
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

