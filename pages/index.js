
import BookTablePopup from "../components/BookTable"; // Import the popup component\
import { useState } from "react";
const RestaurantCard = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);
    return (
  
<>
{showPopup && <BookTablePopup onClose={handleClosePopup} />}
  <div id="fh5co-header">
    <header id="fh5co-header-section" style={{background:'#ceb52e'}}>
      <div className="container">
        <div className="nav-header">
          <a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle">
            <i />
          </a>
          <h1 id="fh5co-logo">
            <img src="/logo.svg" style={{
                height:'30px'
            }}></img>
          </h1>
          <nav id="fh5co-menu-wrap" role="navigation">
            <ul className="sf-menu" id="fh5co-primary-menu">
              <li>
                <a style={{
                color:'black !important' 
            }} className="active" href="index.html">
                  Home
                </a>
              </li>
              <li>
                <a href="hotel.html" className="fh5co-sub-ddown">
                Restaurant
                </a>
                <ul className="fh5co-sub-menu">
                  <li>
                    <a href="#">Luxe Hotel</a>
                  </li>
                  <li>
                    <a href="#">Deluxe Hotel</a>
                  </li>
                  <li>
                    <a href="#" className="fh5co-sub-ddown">
                      King Hotel
                    </a>
                    <ul className="fh5co-sub-menu">
                      <li>
                        <a
                          href="http://freehtml5.co/preview/?item=build-free-html5-bootstrap-template"
                          target="_blank"
                        >
                          Build
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://freehtml5.co/preview/?item=work-free-html5-template-bootstrap"
                          target="_blank"
                        >
                          Work
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://freehtml5.co/preview/?item=light-free-html5-template-bootstrap"
                          target="_blank"
                        >
                          Light
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://freehtml5.co/preview/?item=relic-free-html5-template-using-bootstrap"
                          target="_blank"
                        >
                          Relic
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://freehtml5.co/preview/?item=display-free-html5-template-using-bootstrap"
                          target="_blank"
                        >
                          Display
                        </a>
                      </li>
                      <li>
                        <a
                          href="http://freehtml5.co/preview/?item=sprint-free-html5-template-bootstrap"
                          target="_blank"
                        >
                          Sprint
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Five Star Hotel</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="/admin/login">Dashboard</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  </div>
  {/* end:fh5co-header */}
  <aside id="fh5co-hero" className="js-fullheight">
    <div className="flexslider js-fullheight">
      <ul className="slides">
      <li style={{ backgroundImage: "url(/images/608268123.jpg)" }}>

          <div className="overlay-gradient" />
          <div className="container">
            <div className="col-md-12 col-md-offset-0 text-center slider-text">
              <div className="slider-text-inner js-fullheight">
                <div className="desc">
                  <p>
                    <span>Bora Hotel</span>
                  </p>
                  <h2>Reserve Room for Family Vacation</h2>
                  <p>
                    <a href="#" className="btn btn-primary btn-lg">
                       Book A Table
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li style={{ backgroundImage: "url(/images/slider2.jpg)" }}>
          <div className="overlay-gradient" />
          <div className="container">
            <div className="col-md-12 col-md-offset-0 text-center slider-text">
              <div className="slider-text-inner js-fullheight">
                <div className="desc">
                  <p>
                    <span>Deluxe Hotel</span>
                  </p>
                  <h2>Make Your Vacation Comfortable</h2>
                  <p>
                    <a href="#" className="btn btn-primary btn-lg">
                       Book A Table
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li style={{ backgroundImage: "url(/images/slider3.jpg)" }}>
          <div className="overlay-gradient" />
          <div className="container">
            <div className="col-md-12 col-md-offset-0 text-center slider-text">
              <div className="slider-text-inner js-fullheight">
                <div className="desc">
                  <p>
                    <span>Luxe Hotel</span>
                  </p>
                  <h2>A Best Place To Enjoy Your Life</h2>
                  <p>
                    <a href="#" className="btn btn-primary btn-lg">
                       Book A Table
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </aside>


  <div id="featured-hotel" className="fh5co-bg-color">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="section-title text-center">
            <h2>Featured Hotels</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="feature-full-1col">
          <div
            className="image"
            style={{ backgroundImage: "url(/images/608268123.jpg)" }}
          >
            <div className="descrip text-center">
              <p>
              <small>Available Tables</small>
              <span>13</span>
              </p>
            </div>
          </div>
          <div className="desc">
            <h3>IMPERIAL KITCHEN - MUSCAT</h3>
            <p>
              Pellentesque habitant morbi tristique senectus et netus ett mauada
              fames ac turpis egestas. Etiam euismod tempor leo, in suscipit
              urna condimentum sed. Vivamus augue enim, consectetur ac interdum
              a, pulvinar ac massa. Nullam malesuada congue{" "}
            </p>
            <p>
              <a href="#"    onClick={handleOpenPopup} className="btn btn-primary btn-luxe-primary">
                 Book A Table <i className="ti-angle-right" />
              </a>
            </p>
          </div>
        
        </div>
        <div className="feature-full-2col">
          <div className="f-hotel">
            <div
              className="image"
              style={{ backgroundImage: "url(/images/2021-08-14.jpg)" }}
            >
              <div className="descrip text-center">
                <p>
                  <small>Available Tables</small>
                  <span>21</span>
                </p>
              </div>
            </div>
            <div className="desc">
              <h3>Bait Al Luban Omani Restaurant - Mutrah</h3>
              <p>
                Taste the exotic spices and delightful ingredients. The Omani food combines flavors picked from the path taken by Omani travellers during their long years of trading. {" "}
              </p>
              <p>
                <a href="#"  onClick={handleOpenPopup}  className="btn btn-primary btn-luxe-primary">
                   Book A Table <i className="ti-angle-right" />
                </a>
              </p>
            </div>
          </div>
          <div className="f-hotel">
            <div
              className="image"
              style={{ backgroundImage: "url(/images/20231005_195131.jpg)" }}
            >
              <div className="descrip text-center">
                <p>
                  <small>Available Tables</small>
                  <span>13</span>
                </p>
              </div>
            </div>
            <div className="desc">
              <h3>Applebee's Oman</h3>
              <p>
              Applebee’s Neighborhood Grill + Bar is the place to be in the neighborhood. Our guests know they can always count on us for a delicious and affordable meal, refreshing and fun drinks.

{" "}
              </p>
              <p>
                <a href="#"  onClick={handleOpenPopup}  className="btn btn-primary btn-luxe-primary">
                   Book A Table <i className="ti-angle-right" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 
  
 
</>

)
};

export default RestaurantCard;