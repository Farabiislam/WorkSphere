import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router";

const salaryData = [
  { month: "Jan", amount: 7000 },
  { month: "Feb", amount: 7000 },
  { month: "Mar", amount: 7000 },
  { month: "Apr", amount: 7000 },
  { month: "May", amount: 7000 },
  { month: "Jun", amount: 7000 },
  { month: "Jul", amount: 7000 },
  { month: "Aug", amount: 7000 },
  { month: "Sep", amount: 7000 },
  { month: "Oct", amount: 7000 },
  { month: "Nov", amount: 7000 },
  { month: "Dec", amount: 7000 },
];

const EmployeeDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 max-w-6xl mx-auto p-6">
      <Button className="flex justify-start" variant="link" onClick={() => navigate(-1)}>
        ← Back to Employee List
      </Button>

      <Card>
        <CardContent className="flex gap-6 items-center py-6">
          <Avatar className="w-20 h-20 text-2xl">
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Sarah Johnson</h2>
            <p className="text-muted-foreground">Senior Developer</p>
            <div className="mt-2 flex gap-4 items-center">
              <div className="flex items-center text-green-600 text-sm">
                <Check className="w-4 h-4 mr-1" /> Verified
              </div>
              <p className="text-sm text-gray-600">Bank: **** 5678</p>
            </div>
            <p className="mt-2 text-lg font-semibold">
              Current Salary: $85,000
            </p>
            <p className="text-sm text-muted-foreground">
              <b>Email Address :</b> sarah.johnson@company.com
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Salary History</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={salaryData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#6D28D9" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2">
            Monthly Salary Progression (2024)
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Projects Completed:</strong> 24
            </p>
            <p>
              <strong>Average Rating:</strong> 4.8/5.0
            </p>
            <p>
              <strong>Team Collaboration:</strong> Excellent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <strong>Start Date:</strong> Jan 15, 2022
            </p>
            <p>
              <strong>Employment Type:</strong> Full-time
            </p>
            <p>
              <strong>Department:</strong> Engineering
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 justify-end">
        <Button>Edit Employee</Button>
        <Button variant="secondary">Generate Report</Button>
        <Button variant="destructive">Terminate Employment</Button>
      </div>
    </div>
  );
};

export default EmployeeDetails;
