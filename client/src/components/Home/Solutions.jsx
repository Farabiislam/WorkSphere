import React, { useEffect } from 'react';
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

import AOS from "aos";
import "aos/dist/aos.css";
const features = [
  { 
    icon: <Users className="text-white w-10 h-10 bg-blue-500 p-2 rounded-2xl text-center" />,
    title: "Employee Management",
    desc: "Comprehensive employee profiles, role management, and team organization tools for efficient workforce coordination.",
  },
  {
    icon: <BarChart2 className="text-white w-10 h-10 bg-blue-500 p-2 rounded-2xl text-center" />,
    title: "Performance Tracking",
    desc: "Real-time productivity monitoring, goal setting, and performance analytics to drive team success.",
  },
  {
    icon: <DollarSign className="text-white w-10 h-10 bg-blue-500 p-2 rounded-2xl text-center" />,
    title: "Payroll Processing",
    desc: "Automated salary calculations, payment processing, and financial reporting for seamless payroll management.",
  },
  {
    icon: <Clock className="text-white w-10 h-10 bg-blue-500 p-2 rounded-2xl text-center" />,
    title: "Time & Attendance",
    desc: "Digital time tracking, attendance monitoring, and work schedule management for accurate record keeping.",
  },
  {
    icon: <FileText className="text-white w-10 h-10 bg-blue-500 p-2 rounded-2xl text-center" />,
    title: "Document Management",
    desc: "Secure storage and management of employee documents, contracts, and important HR paperwork.",
  },
  {
    icon: <ShieldCheck className="text-white w-10 h-10 bg-blue-500 p-2 rounded-2xl text-center" />,
    title: "Compliance & Security",
    desc: "Ensure regulatory compliance and data security with advanced protection and audit capabilities.",
  },
];

const Solutions = () => {
      useEffect(()=>{
          AOS.init({duration:"1000"});
      })
    return (
      <div className="py-20">
        <div className=" flex flex-col mb-15 justify-center items-center ">
          <h1 className="text-3xl font-bold mb-5">
            Comprehensive HR Solutions
          </h1>
          <p className="text-muted-foreground">
            Discover powerful features designed to streamline your workforce
            management and drive organizational success.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              data-aos="zoom-in"
              data-aos-delay="500"
              data-aos-anchor-placement="top-bottom"
            >
              <CardHeader>
                <div className="rounded-2xl mb-3">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
};

export default Solutions;