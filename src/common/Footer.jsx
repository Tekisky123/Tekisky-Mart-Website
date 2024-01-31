import React from "react";
import { FaFacebookSquare, FaLinkedin, FaTwitterSquare, FaWhatsappSquare } from "react-icons/fa";
import { Link} from "react-router-dom";
import paymentimg from "../Assets/Images/payment.png"

const MyFooter = () => {
  return (
    <footer>
      

      <div className="footer-nav">
        <div className="container">
          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Popular Categories</h2>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Dates <b>(Khajur)</b>
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Perfumes
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Clothes
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                HomeMade Snacks
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Watches
              </Link>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Products</h2>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Prices drop
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                New products
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Best sales
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Contact us
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Sitemap
              </Link>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Our Company</h2>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Delivery
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Legal Notice
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Terms and conditions
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                About us
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Secure payment
              </Link>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Services</h2>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Prices drop
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                New products
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Best sales
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Contact us
              </Link>
            </li>

            <li className="footer-nav-item">
              <Link className="footer-nav-link">
                Sitemap
              </Link>
            </li>
          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Contact</h2>
            </li>

            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="location-outline"></ion-icon>
              </div>

              <address className="content">
                2nd floor, opposite WaterTank, WorkShop Corner, Nanded,
                Maharashtra 431605 INDIA
              </address>
            </li>

            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="call-outline"></ion-icon>
              </div>

              <a href="tel:+607936-8058" className="footer-nav-link">
              +91 8625817334,<br />
              +91 9890796149
              </a>
            </li>

            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="mail-outline"></ion-icon>
              </div>

              <Link className="footer-nav-link">
                sales@tekisky.com
              </Link>
            </li>
            <li className="footer-nav-item flex">
              <div className="icon-box">
                <ion-icon name="mail-outline"></ion-icon>
              </div>

              <Link to={"/login"} className="footer-nav-link" >
                Login
              </Link>
            </li>

          </ul>

          <ul className="footer-nav-list">
            <li className="footer-nav-item">
              <h2 className="nav-title">Follow Us</h2>
            </li>

            <li>
              <ul className="social-link">
                <li className="footer-nav-item">
                  <Link className="footer-nav-link">
                  <FaFacebookSquare />
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link className="footer-nav-link">
                  <FaTwitterSquare />
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link className="footer-nav-link">
                  <FaLinkedin />
                  </Link>
                </li>

                <li className="footer-nav-item">
                  <Link className="footer-nav-link">
                  <FaWhatsappSquare />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <img
            src={paymentimg}
            alt="payment method"
            className="payment-img"
          />

          <p className="copyright">
            Copyright &copy; <Link>Tekisky Pvt Ltd</Link> all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
