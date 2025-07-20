import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
    {
        initials: "EC",
        name: "Emily Chen",
        role: "CEO",
        company: "StartupHub",
        color: "bg-yellow-400",
    },
    {
        initials: "JS",
        name: "John Smith",
        role: "CTO",
        company: "TechHive",
        color: "bg-green-500",
    },
    {
        initials: "AK",
        name: "Ayesha Khan",
        role: "HR Manager",
        company: "PeopleFirst",
        color: "bg-blue-500",
    },
];
const ClientSection = () => {
  return (
      <section className="py-16 px-4 md:px-10  text-center">
          <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold  mb-2">
                  What Our Clients Say
              </h2>
              <p className="text-muted-foreground mb-10">
                  Trusted by thousands of companies worldwide to manage their most
                  valuable asset – their people.
              </p>

              <Carousel className="w-full max-w-xl mx-auto"
              plugins={[
                          Autoplay({
                            delay: 2000,
                          }),
                        ]}
              >
                  <CarouselContent>
                      {testimonials.map((item, i) => (
                          <CarouselItem key={i}>
                              <div className="bg-secondary rounded-xl p-6 shadow-md">
                                  <div className="flex justify-center mb-4">
                                      {Array(5)
                                          .fill(0)
                                          .map((_, i) => (
                                              <Star
                                                  key={i}
                                                  className="w-5 h-5 text-primary fill-primary  mx-0.5"
                                              />
                                          ))}
                                  </div>
                                  <div className="flex flex-col items-center gap-2">
                                      <div
                                          className={`w-12 h-12 rounded-full  font-semibold flex items-center justify-center ${item.color}`}
                                      >
                                          {item.initials}
                                      </div>
                                      <div>
                                          <h4 className="font-semibold ">
                                              {item.name}
                                          </h4>
                                          <p className="text-sm ">{item.role}</p>
                                          <p className="text-sm text-indigo-600 font-medium">
                                              {item.company}
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
              </Carousel>
          </div>
      </section>
  )
}

export default ClientSection