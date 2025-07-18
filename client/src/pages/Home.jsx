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
import Header from "../components/Home/Header";
import Solutions from "../components/Home/Solutions";

const Home = () => {
  return (
    <div className="">
     <Header/>
     <Solutions/>
    </div>
  );
};

export default Home;
