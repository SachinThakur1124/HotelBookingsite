import "./resort.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from '../../components/footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/Context";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

export default function Resort() {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(`/resorts/find/${id}`);
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = (dates?.[0]?.endDate && dates?.[0]?.startDate) ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;


  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    }
    else {
      newSlideNumber = slideNumber === 5 ? 1 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? ("Loading") : (<div className="resortContainer">
        {open && (<div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
        </div>)}
        <div className="resortWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="resortTitle">{data.name}</h1>
          <div className="resortAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="resortDistance">
            Excellent location - {data.distance} from center
          </span>
          <span className="resortPriceHighlight">
            Book a Stay over &#8360;{data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="resortImages">
            {data.photos?.map((photo, index) => (
              <div className="resortImageWrapper">
                <img onClick={() => handleOpen(index)} src={photo} alt="" className="resortImg" />
              </div>
            ))}
          </div>
          <div className="resortDetails">
            <div className="resortsDetailsTexts">
              <h1 className="resortTitle">{data.title}</h1>
              <p className="resortDesc">{data.desc}</p>
            </div>
            <div className="resortsDetailsPrice">
              <h1>Perfect for a {days}-night Stay!</h1>
              <span>Located in the real heart of krakrow, this property has an excellent location score of 9.8!</span>
              <h2>  <b>&#8360;{(days ?? 0) * (data?.cheapestPrice ?? 0) * (options?.room ?? 1)}</b> ({days}{" "}nights)</h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>)};
      {openModal && <Reserve setOpen={setOpenModal} resortId={id} />}
    </div>
  );
};
