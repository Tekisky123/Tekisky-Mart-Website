import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../Assets/Styles/Header.css"
import "../App.css";
import logo from "../Assets/Images/logo-removebg-preview.png";
import { CiHome, CiLinkedin, CiSearch } from "react-icons/ci";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { LuLogIn } from "react-icons/lu";

import { GiHamburgerMenu } from "react-icons/gi";
import { TbCategory } from "react-icons/tb";
import { Context } from "./Context";

const Header = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(Context);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const overlayRef = useRef(null);

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

  const handleAccordionToggle = (event) => {
    const accordionBtn = event.currentTarget;
    const accordionPanel = accordionBtn.nextElementSibling;

    if (accordionPanel) {
      accordionPanel.classList.toggle("active");
      accordionBtn.classList.toggle("active");
    }
  };
  return (
    <header>
      <div className="header-top">
        <div className="container">
          <ul className="header-social-container">
            <li>
              <Link href="#" className="social-link">
                <FaWhatsapp />
              </Link>
            </li>
            <li>
              <Link href="#" className="social-link">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link href="#" className="social-link">
                <CiLinkedin />
              </Link>
            </li>
            <li>
              <Link href="#" className="social-link">
                <FaFacebookSquare />
              </Link>
            </li>
          </ul>

          <div className="header-alert-news">
            <b>Free Shipping </b>
            <span> In Nanded </span>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <Link className="header-logo">
            <img src={logo} alt="Anon's logo" className="header-logo" />
          </Link>

          <div className="header-search-container">
            <input
              type="search"
              name="search"
              className="search-field"
              placeholder="Enter your product name..."
            />
            <button className="search-btn">
              <CiSearch />
            </button>
          </div>

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
              <HiOutlineShoppingCart />
              <span className="count">{cartItems ? cartItems.length : 0}</span>
            </button>

            <button className="action-btn" onClick={() => navigate("/login")}>
              <LuLogIn />
            </button>
          </div>
        </div>
      </div>

      <nav className="desktop-navigation-menu">
        <div className="container">
          <ul className="desktop-menu-category-list">
            <li className="menu-category" onClick={() => navigate("/")}>
              <Link href="#" className="menu-title">
                Home
              </Link>
            </li>

            <li className="menu-category">
              <Link href="#" className="menu-title">
                Categories
              </Link>

              <div className="dropdown-panel">
                <ul className="dropdown-panel-list">
                  <li className="menu-title">
                    <Link href="#">Clothes</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Formal</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Casual</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Sports</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Jacket</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Sunglasses</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">
                      {/* <img src="./assets/images/mens-banner.jpg" alt="men's fashion" width="250" height="119" /> */}
                    </Link>
                  </li>
                </ul>

                <ul className="dropdown-panel-list">
                  <li className="menu-title">
                    <Link href="#">HomeMade Snacks</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Formal</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Casual</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Perfume</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Cosmetics</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Bags</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">
                      {/* <img src="./assets/images/womens-banner.jpg" alt="women's fashion" width="250" height="119" /> */}
                    </Link>
                  </li>
                </ul>

                <ul className="dropdown-panel-list">
                  <li className="menu-title">
                    <Link href="#">Perfumes</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Smart Watch</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Smart TV</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Keyboard</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Mouse</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">Microphone</Link>
                  </li>
                  <li className="panel-list-item">
                    <Link href="#">
                      {/* <img src="./assets/images/electronics-banner-2.jpg" alt="mouse collection" width="250" height="119" /> */}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="menu-category">
              <Link href="#" className="menu-title">
                Dates <span>(Khajurr)</span>
              </Link>
              {/* <ul className="dropdown-list">
                <li className="dropdown-item">
                  <Link>Dry Dates</Link>
                </li>

                <li className="dropdown-item">
                  <Link>Dry Fruits</Link>
                </li>

                <li class="dropdown-item">
                  <Link>Seedless Dates</Link>
                </li>

                <li className="dropdown-item">
                  <Link>Stuffed Dates</Link>
                </li>
              </ul> */}
            </li>
            <li className="menu-category">
              <Link href="#" className="menu-title">
                HomeMade Snacks
              </Link>
              {/* <ul className="dropdown-list">
                <li className="dropdown-item">
                  <Link>Shirt</Link>
                </li>

                <li className="dropdown-item">
                  <Link>Shorts & Jeans</Link>
                </li>

                <li class="dropdown-item">
                  <Link>Safety Shoes</Link>
                </li>

                <li className="dropdown-item">
                  <Link>Wallet</Link>
                </li>
              </ul> */}
            </li>
            <li className="menu-category">
              <Link href="#" className="menu-title">
                Clothes
              </Link>
              <ul className="dropdown-list">
                <li className="dropdown-item">
                  <Link>Shirt</Link>
                </li>

                <li className="dropdown-item">
                  <Link>Shorts & Jeans</Link>
                </li>

                <li class="dropdown-item">
                  <Link>Womens</Link>
                </li>

                <li className="dropdown-item">
                  <Link>Kids</Link>
                </li>
              </ul>
            </li>
            <li className="menu-category">
              <Link href="#" className="menu-title">
                Perfumes
              </Link>
              {/* <ul className="dropdown-list">
                <li className="dropdown-item">
                  <Link>Shirt</Link>
                </li>

                <li className="dropdown-item">
                  <Link>Shorts & Jeans</Link>
                </li>

                <li class="dropdown-item">
                  <Link>Safety Shoes</Link>
                </li>

                <li className="dropdown-item">
                  <Link>Wallet</Link>
                </li>
              </ul> */}
            </li>
          </ul>
        </div>
      </nav>

      {/* mobile menu start */}

      <div className="mobile-bottom-navigation">
        <button data-mobile-menu-open-btn onClick={handleMobileMenuToggle}>
          <GiHamburgerMenu className="hamburger" />
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/shopping-cart")}
        >
          <HiOutlineShoppingCart />
          <span className="count">{cartItems ? cartItems.length : 0}</span>
        </button>

        <button className="action-btn" onClick={() => navigate("/")}>
          <CiHome />
        </button>

        {/* <button className="action-btn">
          <CiHeart />
          <span className="count">0</span>
        </button> */}

        <button
          className="action-btn hamburger"
          onClick={() => navigate("/login")}
        >
          <LuLogIn />
        </button>
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
            <Link to={"/"} className="menu-title">
              Home
            </Link>
          </li>

          <li className="menu-category">
            <button
              className="accordion-menu"
              data-accordion-btn
              onClick={handleAccordionToggle}
            >
              <p className="menu-title">Clothes</p>
              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon
                  name="remove-outline"
                  className="remove-icon"
                ></ion-icon>
              </div>
            </button>
            <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <Link href="#" className="submenu-title">
                  Shirts
                </Link>
              </li>
              <li className="submenu-category">
                <Link href="#" className="submenu-title">
                  Shorts & Jeans
                </Link>
              </li>
              <li className="submenu-category">
                <Link href="#" className="submenu-title">
                  Womens
                </Link>
              </li>
              <li className="submenu-category">
                <Link href="#" className="submenu-title">
                  Kids
                </Link>
              </li>
              {/* ... other submenu items ... */}
            </ul>
          </li>

          <li className="menu-category">
            {/* <button className="accordion-menu" data-accordion-btn   onClick={handleAccordionToggle}>
              <p className="menu-title">Clothes</p>
              <div>
                <ion-icon name="add-outline" className="add-icon"></ion-icon>
                <ion-icon
                  name="remove-outline"
                  className="remove-icon"
                ></ion-icon>
              </div>
            </button> */}
            {/* <ul className="submenu-category-list" data-accordion>
              <li className="submenu-category">
                <Link href="#" className="submenu-title">
                  Dress & Frock
                </Link>
              </li>
              <li className="submenu-category">
                <Link href="#" className="submenu-title">
                  Dress & Frock
                </Link>
              </li>
              <li className="submenu-category">
                <Link href="#" className="submenu-title">
                  Dress & Frock
                </Link>
              </li>
              <li className="submenu-category">
                <Link href="#" className="submenu-title">
                  Dress & Frock
                </Link>
              </li>
            </ul> */}
          </li>

          {/* ... other menu categories ... */}

          <li className="menu-category">
            <Link href="#" className="menu-title">
              Dates
            </Link>
          </li>

          <li className="menu-category">
            <Link href="#" className="menu-title">
              HomeMade Snacks
            </Link>
          </li>
          <li className="menu-category">
            <Link href="#" className="menu-title">
              Perfumes
            </Link>
          </li>
        </ul>

        {/* <div className="menu-bottom">
          <ul className="menu-category-list">
            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Language</p>
                <ion-icon
                  name="caret-back-outline"
                  className="caret-back"
                ></ion-icon>
              </button>
              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <Link href="#" className="submenu-title">
                    English
                  </Link>
                </li>
              </ul>
            </li>

            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Currency</p>
                <ion-icon
                  name="caret-back-outline"
                  className="caret-back"
                ></ion-icon>
              </button>
              <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <Link href="#" className="submenu-title">
                    USD &dollar;
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="menu-social-container">
            <li>
              <Link href="#" className="social-link">
                <ion-icon name="logo-facebook"></ion-icon>
              </Link>
            </li>
          </ul>
        </div> */}
      </nav>
    </header>
  );
};

export default Header;
