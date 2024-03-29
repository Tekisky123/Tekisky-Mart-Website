import React, { useEffect } from "react";
import Banner from "../common/Banner";
import ProductMain from "../Pages/MainProduct";
import "../App.css";
import DealOfTheDay from "../common/DealOfTheDay";
import { useLocation, useParams } from "react-router-dom";

const Home = () => {
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, id]);
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
    <div className="heading-of-category home-marquee">
    <marquee
        direction="left"
        style={{ color: "#004AAD", fontWeight: "bold" }}
      >
        <span style={{ marginLeft:"100px" , color:"#004AAD" }}>Delivery within 24 hours</span>
        <span style={{ marginLeft:"100px" , color:"#004AAD" }}>Returns without questions</span>
        <span style={{ marginLeft:"100px"  , color:"#004AAD"}}>Quality product at best price</span>
        <span style={{ marginLeft:"100px" , color:"#004AAD" }}>Low price compare to your retail outlet</span>
        <span style={{ marginLeft:"100px" , color:"#004AAD" }}>cheaper than amazon and flipkart</span>
      </marquee>

    </div>
      <Banner banners={bannersData} />
      <DealOfTheDay />

      <ProductMain />
    </>
  );
};

export default Home;
