import React from "react";
import Header from "../components/Home/Header";
import Solutions from "../components/Home/Solutions";
import Selection from "../components/Home/Selection";
import ClientSection from "../components/Home/ClientSection";
import Banner from "../components/Home/Banner";

const Home = () => {
  return (
    <div className="">
     <Header/>
      <Solutions />
      <Selection />
      <ClientSection />
      <Banner/>
    </div>
  );
};

export default Home;
