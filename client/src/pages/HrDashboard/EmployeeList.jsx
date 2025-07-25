import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Filter, Check, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { AvatarImage } from "@radix-ui/react-avatar";
import { toast } from "sonner";
import axios from "axios";

// const allEmployees = [
//   {
//     name: "John Smith",
//     email: "john.smith@company.com",
//     verified: false,
//     bank: "**** 1234",
//     salary: "$75,000",
//     role: "Software Engineer",
//     initials: "JS",
//   },
//   {
//     name: "Sarah Johnson",
//     email: "sarah.johnson@company.com",
//     verified: true,
//     bank: "**** 5678",
//     salary: "$85,000",
//     role: "Senior Developer",
//     initials: "SJ",
//   },
//   {
//     name: "Michael Chen",
//     email: "michael.chen@company.com",
//     verified: false,
//     bank: "**** 9012",
//     salary: "$65,000",
//     role: "Junior Developer",
//     initials: "MC",
//   },
//   {
//     name: "Emily Davis",
//     email: "emily.davis@company.com",
//     verified: true,
//     bank: "**** 3456",
//     salary: "$95,000",
//     role: "Team Lead",
//     initials: "ED",
//   },
//   {
//     name: "David Wilson",
//     email: "david.wilson@company.com",
//     verified: false,
//     bank: "**** 7890",
//     salary: "$70,000",
//     role: "QA Engineer",
//     initials: "DW",
//   },
// ];

// const ITEMS_PER_PAGE = 4;

const EmployeeList = () => {
  // const [search, setSearch] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [showOnlyVerified, setShowOnlyVerified] = useState(false);

  // const filteredEmployees = useMemo(() => {
  //   let result = allEmployees.filter(
  //     (emp) =>
  //       emp.name.toLowerCase().includes(search.toLowerCase()) ||
  //       emp.email.toLowerCase().includes(search.toLowerCase())
  //   );
  //   if (showOnlyVerified) {
  //     result = result.filter((emp) => emp.verified);
  //   }
  //   return result;
  // }, [search, showOnlyVerified]);

  // const paginatedEmployees = useMemo(() => {
  //   const start = (currentPage - 1) * ITEMS_PER_PAGE;
  //   return filteredEmployees.slice(start, start + ITEMS_PER_PAGE);
  // }, [filteredEmployees, currentPage]);

  // const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);



    const { user } = use(AuthContext);

    const fetchEmployees = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/hr_employees`);
      if (!res.ok) throw new Error("Failed to fetch employees");
      return res.json();
    };
    const {
      data: employees = [],
      isLoading,
      isError,
      refetch,
    } = useQuery({
      queryKey: ["employees", user?.email],
      queryFn: fetchEmployees,
      enabled: !!user?.email,
    });
    console.log("Employees:", employees);


    const toggleVerifyStatus = (id) => {
      toast("Are you sure you want to toggle verification status?", {
        action: {
          label: "Confirm",
          onClick: async () => {
            try {
              const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/toggle-verify/${id}`
              );
              if (res.data.success) {
                toast(res.data.message);
                refetch(); // Refresh the employee list
              }
            } catch (err) {
              console.error("Error toggling verification", err);
            }
          },
        },
      });
    };

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading data</p>;
  return (
    <Card className="max-w-6xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h2 className="text-xl font-semibold">Employee Management</h2>
        <div className="flex gap-2 flex-wrap">
          <Input
            className="w-64"
            placeholder="Search employees..."
            // value={search}
            // onChange={(e) => {
            //   setSearch(e.target.value);
            //   setCurrentPage(1);
            // }}
          />
          <Button
            variant="outline"
            // variant={showOnlyVerified ? "default" : "outline"}
            // onClick={() => setShowOnlyVerified((prev) => !prev)}
          >
            <Filter className="mr-2 h-4 w-4" /> Verified Only
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Bank Account</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((emp, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={emp.profilePhoto}
                        className="w-full h-full object-cover"
                      />
                      <AvatarFallback>{emp.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{emp.fullName}</div>
                      <div className="text-xs text-muted-foreground">
                        {emp.designation}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{emp.emailAddress}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => toggleVerifyStatus(emp._id)}
                    className="flex items-center gap-2"
                  >
                    {emp.isVerified ? (
                      <>
                        <Check className="text-green-500 w-5 h-5" />
                      </>
                    ) : (
                      <>
                        <X className="text-red-500 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </TableCell>
                <TableCell>{emp.bankAccountNumber}</TableCell>
                <TableCell>{emp.monthlySalary}</TableCell>
                <TableCell className="space-x-2">
                  <Button
                    disabled={!emp.isVerified}
                    variant="default"
                    size="sm"
                  >
                    Pay
                  </Button>
                  <Link
                    to={`/dashboard/employee-list/empolyeedetails/${emp.id}`}
                  >
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
        <span className="text-sm text-gray-500">
          Showing 1
          {/* {filteredEmployees.length === 0
            ? 0
            : (currentPage - 1) * ITEMS_PER_PAGE + 1} */}
          {" to "}
          {/* {Math.min(
            currentPage * ITEMS_PER_PAGE,
            filteredEmployees.length
          )} of {filteredEmployees.length} employees */}{" "}
          all employee
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            // disabled={currentPage === 1}
            // onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            // disabled={currentPage === totalPages}
            // onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeList;
