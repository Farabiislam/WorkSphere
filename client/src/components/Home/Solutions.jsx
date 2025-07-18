import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShieldCheck,
  Clock,
  FileText,
  DollarSign,
  BarChart2,
  Users,
} from "lucide-react";
const features = [
  { 
    icon: <Users className="text-white w-10 h-10 bg-blue-500 p-2 " />,
    title: "Employee Management",
    desc: "Comprehensive employee profiles, role management, and team organization tools for efficient workforce coordination.",
  },
  {
    icon: <BarChart2 className="text-white w-10 h-10 bg-blue-500 p-2 " />,
    title: "Performance Tracking",
    desc: "Real-time productivity monitoring, goal setting, and performance analytics to drive team success.",
  },
  {
    icon: <DollarSign className="text-white w-10 h-10 bg-blue-500 p-2 " />,
    title: "Payroll Processing",
    desc: "Automated salary calculations, payment processing, and financial reporting for seamless payroll management.",
  },
  {
    icon: <Clock className="text-white w-10 h-10 bg-blue-500 p-2 " />,
    title: "Time & Attendance",
    desc: "Digital time tracking, attendance monitoring, and work schedule management for accurate record keeping.",
  },
  {
    icon: <FileText className="text-white w-10 h-10 bg-blue-500 p-2 " />,
    title: "Document Management",
    desc: "Secure storage and management of employee documents, contracts, and important HR paperwork.",
  },
  {
    icon: <ShieldCheck className="text-white w-10 h-10 bg-blue-500 p-2 " />,
    title: "Compliance & Security",
    desc: "Ensure regulatory compliance and data security with advanced protection and audit capabilities.",
  },
];

const Solutions = () => {
    return (
      <div className="py-20">
        <div className=" flex flex-col mb-15 justify-center items-center ">
          <h1 className='text-3xl font-bold ' >Comprehensive HR Solutions</h1>
          <p>
            Discover powerful features designed to streamline your workforce
            management and drive organizational success.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6  ">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
              <div>{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
};

export default Solutions;