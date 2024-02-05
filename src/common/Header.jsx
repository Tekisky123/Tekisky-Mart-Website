import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../Assets/Styles/Header.css"
import "../App.css";
import logo from "../Assets/Images/TekiskyMartNewLogo-removebg-preview.png";
import { CiHome, CiLinkedin, CiSearch } from "react-icons/ci";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Context } from "./Context";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const { cartItems } = useContext(Context);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userRole = localStorage.getItem("userRole");

  const handleSearchChange = async (event) => {
    const newSearchQuery = event.target.value;

    // Update the search query as the user types
    setSearchQuery(newSearchQuery);

    try {
      setIsLoading(true);

      // Check if the search query is non-empty before making the API call
      if (newSearchQuery.trim() !== "") {
        const response = await fetch(
          `https://tekiskymart.onrender.com/product/getproduct?search=${newSearchQuery}`
        );
        const data = await response.json();

        if (data.success) {
          const matchingProducts = data.products.filter((product) =>
            product.productName
              .toLowerCase()
              .includes(newSearchQuery.toLowerCase())
          );

          setSearchResults(matchingProducts);
        } else {
          setSearchResults([]);
        }
      } else {
        // If the search query is empty, clear the search results
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSearchResults([]);
    setSearchQuery(""); // Clear the search input
  };

  const handleSuggestionClick = async (id) => {
    console.log("Suggestion clicked with ID:", id);

    try {
      const response = await fetch(
        `https://tekiskymart.onrender.com/product/getoneproduct/${id}`
      );
      const data = await response.json();

      console.log("Product data:", data);

      if (data.success) {
        const product = data.getOneProduct;

        // Product found, navigate to the product page using the _id
        console.log(
          "Navigating to product page:",
          `/single-product/${product._id}`
        );
        navigate(`/single-product/${product._id}`);
        // Close the search results dropdown and clear the search input
        closeModal();
      } else {
        // Log the full response for debugging purposes
        console.error("Unexpected response:", response);
        // Product not found, handle accordingly (e.g., show an error message)
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle the error (e.g., show an error message)
    }
  };

  useEffect(() => {
    // Fetch product categories from your API endpoint
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://tekiskymart.onrender.com/product/getproduct"
        );
        const data = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.productCategory))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleMobileMenuClose = () => {
      setIsMobileMenuOpen(false);
    };

    const handleOverlayClick = (event) => {
      if (overlayRef.current && event.target === overlayRef.current) {
        handleMobileMenuClose();
      }
    };

    document.addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleDynamicAccordionToggle = (category) => {
    // Close the mobile menu when an option is clicked
    handleMobileMenuClose();

    // Add your logic for navigation based on the selected category
    navigate(`/category/${category}`);
  };

  const handleStaticAccordionToggle = (path) => {
    // Close the mobile menu when an option is clicked
    handleMobileMenuClose();

    // Add your logic for navigation based on the selected path
    navigate(path);
  };
  return (
    <header>
      <div className="header-top">
        <div className="container">
          <ul className="header-social-container">
            <li>
              <Link href="#" className="social-link">
                <FaWhatsapp className="social-link-icon" />
              </Link>
            </li>
            <li>
              <Link href="#" className="social-link">
                <FaInstagram className="social-link-icon" />
              </Link>
            </li>
            <li>
              <Link href="#" className="social-link">
                <CiLinkedin className="social-link-icon" />
              </Link>
            </li>
            <li>
              <Link href="#" className="social-link">
                <FaFacebookSquare className="social-link-icon" />
              </Link>
            </li>
          </ul>

          <div className="header-alert-news">
            <b>Delivery Only In Nanded </b>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <Link className="header-logo">
            <img src={logo} alt="Anon's logo" className="header-logo" />
          </Link>
        {currentPath === '/pre-orders-page' ||
         currentPath === '/customer-support' ||
         currentPath === '/saleWithUs' ||
         currentPath === '/pre-order' ||
         currentPath === '/payment-step' ||
         currentPath === '/sp-payment-step' ||
         currentPath === '/add-product' ||
         currentPath === '/seller-orders' ||
         currentPath === '/users' ||
         currentPath === '/create-user' ||
         currentPath === '/enquiry-table' ? null : (<>
         
         <div className="header-search-container">
            <div className="search-container">
              <input
                type="search"
                name="search"
                className="search-field"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchResults.length > 0 && (
                <div className="search-results-dropdown">
                  <button className="close-modal-btn" onClick={closeModal}>
                    <IoCloseSharp className="close-icon" />
                  </button>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <>
                      {searchResults.map((product) => (
                        <div
                          key={product.productId}
                          onClick={() => handleSuggestionClick(product._id)}
                        >
                          <img
                            src={product.imageURL[0]}
                            alt={product.productName}
                          />
                          <p>{product.productName}</p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
              {!isLoading &&
                searchQuery.trim() !== "" &&
                searchResults.length === 0 && <p>No products found</p>}
            </div>
            <button className="search-btn">
              <CiSearch className="search" />
            </button>
          </div>
         </>)}
  

          <div className="header-user-actions">
            {/* <button className="action-btn">
              <CiUser />
            </button>

            <button className="action-btn">
              <LuLogIn />
              <span className="count">0</span>
            </button> */}

            <button
              className="action-btn"
              onClick={() => navigate("/shopping-cart")}
            >
              <AiOutlineShoppingCart />
              <span className="count">{cartItems ? cartItems.length : 0}</span>
            </button>

            {/* <button className="action-btn">
              <LuLogIn />
            </button> */}
          </div>
        </div>
      </div>

      <nav className="desktop-navigation-menu">
        <div className="main-container">
          <ul className="desktop-menu-category-list">
            <li className="menu-category" onClick={() => navigate("/")}>
              <Link to="/" className="menu-title">
                Home
              </Link>
            </li>
            {userRole !== "seller" && (
              <>
                {categories.map((category) => (
                  <li className="menu-category" key={category}>
                    <Link to={`/category/${category}`} className="menu-title">
                      {category}
                    </Link>
                  </li>
                ))}
                 <li className="menu-category">
              <Link to="/pre-order" className="menu-title">
                Pre-Order
              </Link>
            </li>
            <li className="menu-category">
              <Link to="/saleWithUs" className="menu-title">
                Sell with Us
              </Link>
            </li>
            <li className="menu-category">
              <Link to="/customer-support" className="menu-title">
                Customer Support
              </Link>
            </li>
              </>
            )}

            {userRole == "superadmin" && (
              <>
                <li className="menu-category">
                  <Link to="/all-orders" className="menu-title">
                    All Orders
                  </Link>
                </li>
                <li className="menu-category">
                  <Link to="/products-list" className="menu-title">
                    Products
                  </Link>
                </li>
                {/* <li className="menu-category">
                  <Link to="/add-Product" className="menu-title">
                    Add Product
                  </Link>
                </li> */}
                <li className="menu-category">
                  <Link to="/users" className="menu-title">
                    Users
                  </Link>
                </li>
                <li className="menu-category">
                  <Link to="/pre-orders-page" className="menu-title">
                    Pre Order Requests
                  </Link>
                </li>
                <li className="menu-category">
                  <Link to="/enquiry-table" className="menu-title">
                    Sell With Us
                  </Link>
                </li>

              </>
            )}

            {userRole == "seller" && (
              <>
              
                <li className="menu-category">
                  <Link to="/add-product" className="menu-title">
                    Add Product
                  </Link>
                </li>
              </>
            )}

           
          </ul>
        </div>
      </nav>

      {/* mobile menu start */}

      <div className="mobile-bottom-navigation">
        <button data-mobile-menu-open-btn onClick={handleMobileMenuToggle}>
          <GiHamburgerMenu className="hamburger" />
        </button>

        <button className="action-btn" onClick={() => navigate("/")}>
          <CiHome />
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/shopping-cart")}
        >
          <AiOutlineShoppingCart />
          <span className="count">{cartItems ? cartItems.length : 0}</span>
        </button>

        {/* <button className="action-btn">
          <CiHeart />
          <span className="count">0</span>
        </button> */}

        {/* <button
          className="action-btn hamburger"
          onClick={() => navigate("/login")}
        >
          <LuLogIn />
        </button> */}
      </div>

      <nav
        ref={mobileMenuRef}
        className={`mobile-navigation-menu has-scrollbar ${
          isMobileMenuOpen ? "active" : ""
        }`}
        data-mobile-menu
      >
        <div className="menu-top">
          <h2 className="menu-title">Menu</h2>
          <button data-mobile-menu-close-btn onClick={handleMobileMenuClose}>
            <IoCloseSharp className="hamburger" />
          </button>
        </div>

        <ul className="mobile-menu-category-list">
          <li className="menu-category">
            <button
              className="accordion-menu"
              data-accordion-btn
              onClick={() => handleStaticAccordionToggle("/")}
            >
              <Link to="/" className="menu-title">
                Home
              </Link>
            </button>
          </li>

          {/* Dynamically render product categories */}
          {categories.map((category) => (
            <li className="menu-category" key={category}>
              <button
                className="accordion-menu"
                data-accordion-btn
                onClick={() => handleDynamicAccordionToggle(category)}
              >
                <Link to={`/category/${category}`} className="menu-title">
                  {category}
                </Link>
                <div>
                  <ion-icon name="add-outline" className="add-icon"></ion-icon>
                  <ion-icon
                    name="remove-outline"
                    className="remove-icon"
                  ></ion-icon>
                </div>
              </button>
              <ul className="submenu-category-list" data-accordion>
                {/* You can add submenu items here if needed */}
              </ul>
            </li>
          ))}

          {userRole === "superadmin" && (
            <>
              <li className="menu-category">
                <button
                  className="accordion-menu"
                  data-accordion-btn
                  onClick={() => handleStaticAccordionToggle("/all-orders")}
                >
                  <Link to="/all-orders" className="menu-title">
                    All Order
                  </Link>
                </button>
              </li>
              <li className="menu-category">
                <button
                  className="accordion-menu"
                  data-accordion-btn
                  onClick={() => handleStaticAccordionToggle("/products-list")}
                >
                  <Link to="/products-list" className="menu-title">
                    Products
                  </Link>
                </button>
              </li>
              <li className="menu-category">
                <button
                  className="accordion-menu"
                  data-accordion-btn
                  onClick={() => handleStaticAccordionToggle("/users")}
                >
                  <Link to="/users" className="menu-title">
                    Users
                  </Link>
                </button>
              </li>
              <li className="menu-category">
                <button
                  className="accordion-menu"
                  data-accordion-btn
                  onClick={() => handleStaticAccordionToggle("/pre-orders-page")}
                >
                  <Link to="/pre-orders-page" className="menu-title">
                  Pre orders request
                  </Link>
                </button>
              </li>
              <li className="menu-category">
                <button
                  className="accordion-menu"
                  data-accordion-btn
                  onClick={() => handleStaticAccordionToggle("/add-product")}
                >
                  <Link to="/add-product" className="menu-title">
                  Add Product
                  </Link>
                </button>
              </li>
              <li className="menu-category">
                <button
                  className="accordion-menu"
                  data-accordion-btn
                  onClick={() => handleStaticAccordionToggle("/enquiry-table")}
                >
                  <Link to="/enquiry-table" className="menu-title">
                  Sell With Us Requests 
                  </Link>
                </button>
              </li>
              
              
            </>
          )}

          {/* Static categories for seller */}
          {userRole === "seller" && (
            <>
              <li className="menu-category">
                <button
                  className="accordion-menu"
                  data-accordion-btn
                  onClick={() => handleStaticAccordionToggle("/add-product")}
                >
                  <Link to="/add-product" className="menu-title">
                    Add Product
                  </Link>
                </button>
              </li>
            </>
          )}

          {/* Common static categories */}
          <li className="menu-category">
            <button
              className="accordion-menu"
              data-accordion-btn
              onClick={() => handleStaticAccordionToggle("/pre-order")}
            >
              <Link to="/pre-order" className="menu-title">
                Pre Order
              </Link>
            </button>
          </li>
          <li className="menu-category">
            <button
              className="accordion-menu"
              data-accordion-btn
              onClick={() => handleStaticAccordionToggle("/saleWithUs")}
            >
              <Link to="/saleWithUs" className="menu-title">
                Sell with Us
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
