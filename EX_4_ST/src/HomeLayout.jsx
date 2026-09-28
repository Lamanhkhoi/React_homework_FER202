import Navigation from "./NavigationComponent/Navigation";
import "./HomeLayout.css";
import Player from "./Players/Players";


function HomeLayout() {
  
  return (
    <>
      {/* NAVBAR */}
      <Navigation/>

      {/* CAROUSEL */}
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="placeholder-img">1920 x 530</div>
          </div>
          <div className="carousel-item">
            <div className="placeholder-img">1920 x 530</div>
          </div>
          <div className="carousel-item">
            <div className="placeholder-img">1920 x 530</div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* NEW PRODUCT SECTION */}
      <div className="container my-5">
        <h2 className="mb-1">NEW PRODUCT</h2>
        <p className="text-muted mb-4">List product description</p>
        <Player/>
      </div>  
      


    </>
   );
 }





export default HomeLayout;
