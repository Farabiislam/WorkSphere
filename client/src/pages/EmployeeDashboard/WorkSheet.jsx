import React, { useState } from "react";
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
import axios from "axios";

const tasks = ["Sales", "Support", "Content"];
const PAGE_SIZE = 5;

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

  // const deleteEntry = (index) => {
  //   alert("Delete functionality not implemented yet");
  // };

  const totalPages = Math.ceil(entries.length / PAGE_SIZE);
  const paginatedEntries = entries.slice(0, page * PAGE_SIZE);

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
};

export default WorkSheet;
