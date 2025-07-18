import React from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Header = () => {
  return (
    <div className="flex py-20" >

      <div className="w-1/2 ">
        <h1>Transform Your Workforce Management</h1>
        <p>
          Streamline HR operations, boost productivity, and empower your team
          with our comprehensive employee management platform designed for
          modern businesses.
        </p>
        <div>
          <Button variant="linear">Start Free Trial</Button>
          <Button variant="outline">Watch Demo</Button>
        </div>
        <div className="flex gap-10">
          <p className="flex flex-col">
            <span>10,000+</span>
            <small>Active Users</small>
          </p>
          <p className="flex flex-col">
            <span>500+</span>
            <small>Companies</small>
          </p>
          <p className="flex flex-col">
            <span>99.9%</span>
            <small>Uptime</small>
          </p>
          <p>
            <span className="flex flex-col">24/7 </span>
            <small>Support</small>
          </p>
        </div>
      </div>
      <div className="w-1/2 p-4 ">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent className="text-white text-3xl font-bold h-[300px]">
            <CarouselItem className="bg-red-300 flex justify-center items-center ">
              Performance
            </CarouselItem>
            <CarouselItem className="bg-green-300 flex justify-center items-center ">
              Security
            </CarouselItem>
            <CarouselItem className="bg-blue-500 flex justify-center items-center ">
              Management
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Header;
