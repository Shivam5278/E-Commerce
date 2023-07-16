import React from "react";
import playStore from "../../../images/playstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    // <footer id="footer">
    //   <div className="leftFooter">
    //     <h4>DOWNLOAD OUR APP</h4>
    //     <p>Download App for Android and IOS mobile phone</p>
    //     <img src={playStore} alt="playstore" />
    //   </div>

    //   <div className="midFooter">
    //     <h1>ECOMMERCE.</h1>
    //     <p>High Quality is our first priority</p>

    //     <p>Copyrights 2021 &copy; Shivamnahimila</p>
    //   </div>

    //   <div className="rightFooter">
    //     <h4>Follow Us</h4>
    //     <a href="instagram.com">Instagram</a>
    //     <a href="instagram.com">Youtube</a>
    //     <a href="instagram.com">Facebook</a>
    //   </div>
    // </footer>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              ultricies volutpat velit, vel ultrices est finibus eget.
            </p>
          </div>
          <div class="col-md-4">
            <h3>Contact Us</h3>
            <p>
              1234 Main St, Anytown USA
              <br />
              +1 (555) 123-4567
              <br />
              email@example.com
            </p>
          </div>
          <div class="col-md-4">
            <h3>Follow Us</h3>
            <ul class="social-links">
              <li>
                <a href="#">
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
