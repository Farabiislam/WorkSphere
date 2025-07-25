import React, { use, useState } from 'react'

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
import { useQuery } from '@tanstack/react-query';
import { AvatarImage } from '@radix-ui/react-avatar';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from "sonner"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form';

// const employees = [
//     {
//         name: "John Smith",
//         email: "john.smith@company.com",
//         designation: "Software Engineer",
//         salary: "$75,000",
//         isHR: false,
//         isFired: false,
//     },
//     {
//         name: "Sarah Johnson",
//         email: "sarah.johnson@company.com",
//         designation: "Senior Developer",
//         salary: "$85,000",
//         isHR: true,
//         isFired: false,
//     },
//     {
//         name: "Michael Chen",
//         email: "michael.chen@company.com",
//         designation: "Junior Developer",
//         salary: "$65,000",
//         isHR: false,
//         isFired: false,
//     },
//     {
//         name: "Emily Davis",
//         email: "emily.davis@company.com",
//         designation: "Team Lead",
//         salary: "$95,000",
//         isHR: true,
//         isFired: false,
//     },
//     {
//         name: "David Wilson",
//         email: "david.wilson@company.com",
//         designation: "QA Engineer",
//         salary: "$70,000",
//         isHR: false,
//         isFired: true,
//     },
// ];


const AllEmployee = () => {
  const { user } = use(AuthContext)
  const [salary, setSalary] = useState("")
  
  const fetchEmployees = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/employees`);
    if (res.status !== 200) throw new Error("Failed to fetch employees");
    return res.data;
  };
  const { data: employees = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['employees', user?.email],
    queryFn: fetchEmployees,
    enabled: !!user?.email,
  });
  console.log("Employees:", employees);

  const makeHR = async (id) => {
    const res = await axios.patch(`${import.meta.env.VITE_API_URL}/make-hr/${id}`);
    res.data.success && toast(res.data.message);
    refetch(); 
  }
  const fireEmployee = (id) => {
    toast("Are you sure you want to fire this employee?", {
      action: {
        label: "confirm",
        onClick: async () => {
          console.log("fired employee")
          try {
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/user-fire/${id}`);
            //console.log(res.data);
            res.data.success && toast(res.data.message);
            refetch();
          } catch (err) {
            console.error("Error firing employee", err);
          }
        },
      },
    })
   
  }
  const handleSalary = (id,salaryy) => { 
    //convert salary to number
    salaryy = parseFloat(salaryy);
    console.log("handle salary", id, "salary:", salaryy);
    axios.patch(`${import.meta.env.VITE_API_URL}/update-salary/${id}`, { salary: salaryy })
      .then(res => {
        console.log("Salary updated:", res.data);
        toast.success("Salary updated successfully");
        refetch();
      })
      .catch(err => {
        console.error("Error updating salary", err);
        toast.error("Failed to update salary", { variant: "destructive" });
      });

  }

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading data</p>;

  return (
    <div className='w-full overflow-x-auto '>
      <div className="p-6 bg-base shadow rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">Employee Management</h2>
          <div className="flex gap-2 items-center">
            <Input placeholder="Search employees..." className="w-64" />
            <select className="border bg-secondary text-primary px-3 py-1 rounded-md text-sm">
              <option>10 per page</option>
              <option>20 per page</option>
              <option>50 per page</option>
            </select>
          </div>
        </div>

        <div className='w-full overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Make HR</TableHead>
                <TableHead>Fire</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp, idx) => {
                
                //console.log("salary:", salary);
                const initials =
                  emp.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("");
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      <div className="flex items-center gap-4">

                        <Avatar className="border-3 border-primary rounded-full">
                          <AvatarImage src={emp.profilePhoto} className="w-full h-full object-cover" />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-none">{emp.fullName}</p>
                          <p className="text-sm text-muted-foreground">{emp.designation || "employee"}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{emp.emailAddress}</TableCell>
                    <TableCell>
                      
                      <Dialog>
                        <form>
                          <DialogTrigger asChild>
                            <p className='cursor-pointer'>{emp.monthlySalary || 20000}</p>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Salary</DialogTitle>
                              <DialogDescription>
                                Make changes to your employee salary here. Click save when you&apos;re
                                done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="grid gap-3">
                                <Label htmlFor="name-1">Employee Name</Label>
                                <Input id="name-1" name="name" defaultValue={emp.fullName} disabled />
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="salary-1">Salary</Label>
                                <Input id="salary-1" name="salary" defaultValue={emp.monthlySalary} onChange={(e) => setSalary(e.target.value)} />
                              </div>                            
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button type="submit" onClick={() => handleSalary(emp._id,salary)}>Save changes</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </form>
                      </Dialog>
                      
                    </TableCell>
                    <TableCell>
                      {emp.isFired == true ? (
                        <Badge variant="destructive">{emp.role}</Badge>
                      ) : (
                        <>
                          {
                            emp.role == "hr" ? (
                              <Badge variant="outline">HR</Badge>
                            ) : (
                              <Button size="sm" onClick={() => makeHR(emp._id)}>Make HR</Button>
                            )
                          }
                        </>
                      )
                      }
                    </TableCell>
                    <TableCell>
                      {emp.isFired||false ? (
                        <Badge variant="destructive">Fired</Badge>
                      ) : (
                          <Button size="icon" variant="destructive" onClick={() => fireEmployee(emp._id)}>
                          ✕
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

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