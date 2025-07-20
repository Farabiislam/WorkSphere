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
    <div className="flex flex-col md:flex-row gap-4" >

      <div className="md:w-1/2 flex flex-col justify-center items-start gap-4 ">
        <h1 className="text-5xl font-bold">Transform Your <br /> <span className="text-stone-500 text-4xl">Workforce Management</span></h1>
        <p>
          Streamline HR operations, boost productivity, and empower your team
          with our comprehensive employee management platform designed for
          modern businesses.
        </p>
        <div className="flex gap-4">
          <Button variant="linear">Start Free Trial</Button>
          <Button variant="outline" className="border border-primary">Watch Demo</Button>
        </div>
        <div className="flex w-full justify-between items-center text-center">
          <p className="flex flex-col">
            <span className="font-bold">10,000+</span>
            <small className="text-muted-foreground">Active Users</small>
          </p>
          <p className="flex flex-col">
            <span className="font-bold">500+</span>
            <small className="text-muted-foreground">Companies</small>
          </p>
          <p className="flex flex-col">
            <span className="font-bold">99.9%</span>
            <small className="text-muted-foreground">Uptime</small>
          </p>
          <p>
            <span className="flex font-bold">24/7</span>
            <small className="text-muted-foreground">Support</small>
          </p>
        </div>
      </div>
      <div className="md:w-1/2 p-4 ">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="rounded "
        >
          <CarouselContent className="text-primary text-3xl font-bold h-[300px] md:h-[400px] lg:h-[300px] rounded-xl">
            <CarouselItem className="">
              <div className="bg-secondary border border-primary flex justify-center items-center rounded-xl h-full">Performance</div>

            </CarouselItem>

            <CarouselItem className="">
              <div className="bg-secondary border border-primary flex justify-center items-center rounded-xl h-full">Security</div>
            </CarouselItem>
            <CarouselItem className="">
              <div className="bg-secondary border border-primary flex justify-center items-center rounded-xl h-full">Management</div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Header;
