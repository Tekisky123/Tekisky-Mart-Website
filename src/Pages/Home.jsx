import React from "react";
import Banner from "../common/Banner";
import ProductMain from "../Pages/MainProduct";
import "../App.css";
import DealOfTheDay from "../common/DealOfTheDay";

const Home = () => {
  const bannersData = [
    {
      imgSrc:
        "https://media.istockphoto.com/id/1432450558/photo/dates-in-a-white-bowl.jpg?s=170667a&w=0&k=20&c=jN3E_e0mE3k8oDUHkAZck2tb9JyC76Ns5zeiy8ySc-M=",
      subtitle: "Trending item",
      title:
        "Indulge in Nature's Sweetness: Explore Our Exquisite Dates Collection!",

      price: "199.00",
      link: "/category/DATES",
    },
    {
      imgSrc:
        "https://www.shutterstock.com/image-photo/stack-colorful-clothes-pile-clothing-600nw-2203081765.jpg",
      subtitle: "Trending item",
      title: "Elevate Your Style: Unleash the Latest Trends in Fashion!",
      price: "249.00",
      link: "/category/CLOTHES",
    },
    {
      imgSrc:
        "https://nichestory.eu/wp-content/uploads/2022/09/44blg-single.jpg",
      subtitle: "Trending accessories",
      title: 
      "Captivate the Senses: Discover Signature Scents for Every Occasion!",
      price: "349.00",
      link: "/category/PERFUMES",
    },
    // Add more banner objects as needed
  ];
  return (
    <>
      <Banner banners={bannersData} />
      <DealOfTheDay />

      <ProductMain />
    </>
  );
};

export default Home;
