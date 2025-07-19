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
import Selection from "../components/Home/Selection";

const Home = () => {
  return (
    <div className="">
     <Header/>
      <Solutions />
      <Selection/>
    </div>
  );
};

export default Home;
