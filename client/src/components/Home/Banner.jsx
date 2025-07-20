import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
     useEffect(() => {
       AOS.init({ duration: "1000" });
     });
  return (
    <section
      data-aos="zoom-in"
      data-aos-easing="ease-in-sine"
      className="bg-gradient-to-r from-blue-500 to-blue-900 py-16 text-white
      text-center px-4 my-10"
    >
      <div
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-delay="100"
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Workforce?
        </h2>
        <p className="text-lg text-white/80 mb-8">
          Join thousands of companies already using WorkSphere to streamline
          their HR operations and boost productivity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="">Start Free Trial</Button>
          <Button variant="outline" className="text-primary">
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Banner