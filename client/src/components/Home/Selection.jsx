import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
const features = [
    {
        title: "Intuitive Interface",
        description:
            "User-friendly design that requires minimal training and maximizes productivity from day one.",
    },
    {
        title: "Scalable Solution",
        description:
            "Grows with your business from startup to enterprise with flexible pricing and features.",
    },
    {
        title: "Advanced Analytics",
        description:
            "Data-driven insights and reporting to make informed decisions about your workforce.",
    },
    {
        title: "24/7 Support",
        description:
            "Round-the-clock customer support to ensure your operations run smoothly.",
    },
];



const Selection = () => {
          useEffect(()=>{
              AOS.init({duration:"1000"});
          })
  return (
    <section data-aos="zoom-in" className="bg-secondary py-16 px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <div data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-6">Why Choose WorkSphere?</h2>

          <ul data-aos="fade-up" className="space-y-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckIcon className="bg-blue-600 text-white rounded p-1 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg ">{feature.title}</h3>
                  <p className=" text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Button
            data-aos="zoom-in"
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Learn More
          </Button>
        </div>

        {/* Right Side - Dashboard Preview */}
        <div
          data-aos="fade-right"
          className="flex justify-center md:justify-end relative"
        >
          <div
            data-aos="fade-down"
            data-aos-delay="500"
            data-aos-easing="ease-in-sine"
            className="h-[300px] w-full border-30 border-white  bg-blue-600 rounded-xl shadow-lg flex items-center justify-center text-white text-xl font-semibold relative z-10"
          >
            Dashboard Preview
          </div>

          <div
            style={{
              opacity: 0.4,
              background: "linear-gradient(90deg, #F16397 0%, #18D13A 100%)",
            }}
            className="absolute -top-10 -right-10 w-26 h-26 bg-purple-300 opacity-30 rounded-full z-10"
          />
          <div className="absolute -bottom-10 -left-10 w-20 h-20 opacity-35 bg-blue-300 rounded-full z-0" />
        </div>
      </div>
    </section>
  );
}

export default Selection