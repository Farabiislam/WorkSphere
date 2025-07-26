import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: employee,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/employee/details/${id}`
      );
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !employee) return <p>Employee not found.</p>;

  const {
    fullName,
    emailAddress,
    phoneNumber,
    bankAccountNumber,
    monthlySalary,
    designation,
    profilePhoto,
    role,
    isFired,
    created_at,
    payments = [],
  } = employee;

 const monthOrder = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
 ];

 const salaryData = payments
   .map((p) => ({
     month: p.month,
     amount: p.salary,
   }))
   .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <Button variant="link" className="text-sm" onClick={() => navigate(-1)}>
        ← Back to Employee List
      </Button>

      {/* Header Card */}
      <Card>
        <CardContent className="flex gap-8 p-6">
          <div className=" flex flex-col mt-2  gap-2">
            <Avatar className="w-30 h-30 text-2xl">
              <AvatarImage src={profilePhoto} />
              <AvatarFallback>{fullName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center gap-2 text-sm mt-2">
              {role !== "admin" && !isFired ? (
                <div className="flex items-center">
                  <Check className=" bg-green-600 text-white rounded-sm w-5 h-5 mr-1  " />
                  Verified
                </div>
              ) : (
                <div className="text-red-600">Inactive</div>
              )}
              <span className="text-gray-500">
                Bank: **** {bankAccountNumber?.slice(-4)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-3xl font-bold">{fullName}</h2>
              <p className="text-xl font-semibold  text-blue-800 ">
                {designation}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div>
                <p className="">
                  <b>Email Address </b>
                </p>
                <p>{emailAddress}</p>
              </div>
              <div>
                <p>
                  <b>Phone </b>
                </p>
                <p> {phoneNumber}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground">Current Salary </p>
              <p className="text-lg font-semibold">${monthlySalary}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Salary Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Salary History</CardTitle>
        </CardHeader>
        <CardContent>
          {salaryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salaryData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#5B21B6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-sm">No salary data available.</p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Monthly Salary Progression ({new Date().getFullYear()})
          </p>
        </CardContent>
      </Card>

      {/* Grid Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <b>Projects Completed:</b> 24
            </p>
            <p>
              <b>Average Rating:</b> 4.8/5.0
            </p>
            <p>
              <b>Team Collaboration:</b> Excellent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              <b>Start Date:</b> {new Date(created_at).toDateString()}
            </p>
            <p>
              <b>Employment Type:</b> Full-time
            </p>
            <p>
              <b>Department:</b> Engineering
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button>Edit Employee</Button>
        <Button variant="secondary">Generate Report</Button>
        <Button variant="destructive">Terminate Employment</Button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
