import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data: hotelsData, loading: hotelsLoading, error: hotelsError } = useFetch("/hotels?featured=true&limit=1");
  const { data: apartmentsData, loading: apartmentsLoading, error: apartmentsError } = useFetch("/apartments?featured=true&limit=1");
  const { data: cabinsData, loading: cabinsLoading, error: cabinsError } = useFetch("/cabins?featured=true&limit=1");
  const { data: resortsData, loading: resortsLoading, error: resortsError } = useFetch("/resorts?featured=true&limit=1");
  const { data: villasData, loading: villasLoading, error: villasError } = useFetch("/villas?featured=true&limit=1");

  return (
    <div className="fp">
      {/* Render Featured Hotel */}
      {hotelsLoading ? (
        "Loading"
      ) : (
        <>
          {hotelsData.map((item) => (
            <div className="fpItem" key={item._id}>
              <Link to={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
              </Link>
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from &#8360;&nbsp;{item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* Render Featured Apartment */}
      {apartmentsLoading ? (
        ""
      ) : (
        <>
          {apartmentsData.map((item) => (
            <div className="fpItem" key={item._id}>
              <Link to={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
              </Link>
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from &#8360;&nbsp;{item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {/* Render Featured Cabin */}
      {cabinsLoading ? (
        ""
      ) : (
        <>
          {cabinsData.map((item) => (
            <div className="fpItem" key={item._id}>
              <Link to={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
              </Link>
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from &#8360;&nbsp;{item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {resortsLoading ? (
        ""
      ) : (
        <>
          {resortsData.map((item) => (
            <div className="fpItem" key={item._id}>
              <Link to={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
              </Link>
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from &#8360;&nbsp;{item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}

      {villasLoading ? (
        ""
      ) : (
        <>
          {villasData.map((item) => (
            <div className="fpItem" key={item._id}>
              <Link to={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
              </Link>
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from &#8360;&nbsp;{item.cheapestPrice}</span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
