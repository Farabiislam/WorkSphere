import React, { use, useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Pencil, X } from "lucide-react";
import { format } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";import { AuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import axios from "axios";


const tasks = [
  "Sales",
  "Support",
  "Content Writing",
  "Design Review",
  "Team Meeting",
  "Code Review",
  "Development",
  "Testing",
  "Client Call",
  "Bug Fixing",
];


const fetchEntries = async () => {
  const res = await axios.get("http://localhost:3000/api/entries");
  return res.data;
};

const WorkSheet = () => {
  const [task, setTask] = useState("Sales");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);

  // const queryClient = useQueryClient();

  const {
    data: entries = [],
    isLoading,
    refetch, // available if needed
  } = useQuery({
    queryKey: ["workEntries"],
    queryFn: fetchEntries,
  });

  const addEntry = async () => {
    if (!hours || !date) return;

    // const formattedDate = format(new Date(date), "MMM dd, yyyy");
    const newEntry = {
      task,
      hours: parseInt(hours),
      date
    };

    try {
      await axios.post("http://localhost:3000/api/entries", newEntry);
      await refetch();
      // Clear inputs
      setHours("");
      setDate("");
    } catch (err) {
      console.error("Failed to add entry:", err);
    }
  };
  console.log("Fetched entries:", JSON.stringify(entries, null, 2));
  const { user } = useContext(AuthContext)
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [taskAdded, setTaskAdded] = useState(false);
  const [taskDeleted, setTaskDeleted] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    data.email = user.email;
    const formattedDate = format(new Date(data.date), "MMM dd, yyyy");
    data.date = formattedDate;
    console.log("Submitted Work Entry:", data);
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/works`, data);
    if (res.data.acknowledged) {
      console.log("Work entry added successfully");
      setTaskAdded(true);
    }
    reset();
    console.log("Submitted Work Entry:", res.data);
  };

  // const deleteEntry = (index) => {
  //   alert("Delete functionality not implemented yet");
  // };
  const deleteEntry = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
  };
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/works?email=${user.email}`)
      .then(res => setEntries(res.data))
      .catch(err => console.error("Error fetching work entries:", err));
  }, [taskAdded])
  console.log("Entries:", entries);
  const PAGE_SIZE = Math.ceil(entries.length / 4);

  const totalPages = Math.ceil(entries.length / PAGE_SIZE);
  const paginatedEntries = entries.slice(0, page * PAGE_SIZE);
  const totalPages = Math.ceil(entries.length / PAGE_SIZE);
  const paginatedEntries = entries.slice(0, page * PAGE_SIZE);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const loadMore = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Add Work Entry</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={task} onValueChange={setTask}>
              <SelectTrigger>
                <SelectValue placeholder="Select Task" />
              </SelectTrigger>
              <SelectContent>
                {tasks.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Enter hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              type="number"
            />
            <Input
              placeholder="Select Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
            <Button className="w-full" onClick={addEntry}>
              Add Entry
            </Button>
          </div>
        </CardContent>
      </Card>
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Add Work Entry</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Task Select */}
              <Select onValueChange={(val) => setValue("task", val)} >
                <SelectTrigger>
                  <SelectValue placeholder="Select Task" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("task", { required: "Task is required" })}
              />
              {errors.task && (
                <span className="text-sm text-red-500 col-span-full">
                  Task is required.
                </span>
              )}

              {/* Hours Input */}
              <Input
                type="number"
                placeholder="Enter hours"
                {...register("hours", {
                  required: "Hours are required",
                  min: { value: 1, message: "Minimum 1 hour" },
                })}
              />
              {errors.hours && (
                <span className="text-sm text-red-500 col-span-full">
                  {errors.hours.message}
                </span>
              )}

              {/* Date Input */}
              <Input className="text-end"
                type="date"
                {...register("date", {
                  required: "Date is required",
                })}
              />
              {errors.date && (
                <span className="text-sm text-red-500 col-span-full">
                  {errors.date.message}
                </span>
              )}

              {/* Submit */}
              <Button type="submit" className="w-full">
                Add
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 pb-2 relative">
          <h2 className="text-xl font-semibold mb-4">Work Entries</h2>
          <div className="overflow-y-auto max-h-96 scrollbar-hide">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Task</th>
                    <th className="py-2">Hours</th>
                    <th className="py-2">Date</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEntries.map((entry, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2">{entry.task}</td>
                      <td className="py-2">{entry.hours} hrs</td>
                      <td className="py-2">{entry.date}</td>
                      <td className="py-2 space-x-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => deleteEntry(idx)}
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {page < totalPages && (
              <div className="text-center mt-4">
                <Button onClick={loadMore}>Load More</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
      <Card>
        <CardContent className="p-6 pb-2 relative ">
          <h2 className="text-xl font-semibold mb-4">Work Entries</h2>
          <div className="overflow-y-auto min-h-content scrollbar-hide">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-1">Task</th>
                  <th className="py-2 px-1">Hours</th>
                  <th className="py-2 px-1">Date</th>
                  <th className="py-2 px-1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEntries.map((entry, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{entry.task}</td>
                    <td className="py-2">{entry.hours} hrs</td>
                    <td className="py-2">{entry.date}</td>
                    <td className="py-2 space-x-2 flex items-center flex-wrap">
                      <Button variant="ghost" size="icon">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEntry(idx)}
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {page < totalPages && (
              <div className="text-center mt-4">
                <Button onClick={loadMore}>Load More</Button>
              </div>
            )}
          </div>
          <div className="absolute p-1 right-2 text-sm text-gray-500">
            Page {page} of {totalPages}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkSheet;
