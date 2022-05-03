import React, {useState, useRef, useEffect} from "react";
import { SingleRide } from "./SingleRide";
import { useGlobalContext } from "./Context";
import "./Rides.css";

const TABS = {
  nearestTab: "nearestTab",
  upcomingTab: "upcomingTab",
  pastTab: "pastTab",
};

export const RidesContainer = () => {
    const [activeTab, setActiveTab] = useState(TABS.nearestTab);
  const { rides, user, setRides, loading, nearestRides, upcomingRides, pastRides,setIsModalOpen, isModalOpen, states, cities, filterByStateAndCity } = useGlobalContext();
//   const stateRef = useRef('');
//   const cityRef = useRef('');
//   const stateValue = stateRef.current.value();

  


  const currentTabData = {
    nearestTab: nearestRides,
    upcomingTab: upcomingRides,
    pastTab: pastRides,
  };

  const handleTabChange = (event) => {
    const { name } = event.target;
    setActiveTab(name);
  };
  const openModal=()=>{
      setIsModalOpen(!isModalOpen)
  }

  const [filterObj, setFilteredObj] = useState({state: null, city: null})
  const handleChange = (event) => {
      const {value, name} = event.target;

      console.log({value, name})

      setFilteredObj((prev) => ({
          ...prev,
          [name]: value
      }))
  }

  useEffect(() => {
        filterByStateAndCity(filterObj)
  },[filterObj])
  
  if (loading) {
    return (
      <main>
        <div className="loading">&nbsp;</div>
      </main>
    );
  }
  return (
    <main>
      <div className="top-section">
        <div className="rides">
          <button
            name={TABS.nearestTab}
            className={`ride-btn ${activeTab === TABS.nearestTab ? 'active' : ''}`}
            onClick={handleTabChange}
          >
            nearest rides{" "}
          </button>
          <button
            name={TABS.upcomingTab}
           className={`ride-btn ${activeTab === TABS.upcomingTab ? 'active' : ''}`}
            onClick={handleTabChange}
          >
            upcoming rides<span>({upcomingRides?.length})</span>
          </button>
          <button
            name={TABS.pastTab}
           className={`ride-btn ${activeTab === TABS.pastTab ? 'active' : ''}`}
            onClick={handleTabChange}
          >
            past rides<span>({pastRides?.length})</span>
          </button>
        </div>
        <button className="ride-btn filter" onClick={openModal} >filter</button>
      </div>
      {isModalOpen &&
      <div className="modal-container">
            <h3 className="heading">filters</h3>
            <div className="underline">&nbsp;</div>
            <form className="form">
                <select name="state" onChange={handleChange}  className="state">
                    <option selected disabled>State</option>
                    {states?.map((state, index)=>{
                        return <option key={state + index} value={state}>{state}</option>
                    })}
                </select>
                <select onChange={handleChange} name="city" className="city">
                    <option selected disabled>City</option>
                      {cities?.map((city, index)=>{
                        return <option  key={city + index}>{city}</option>
                    })}
                </select>
            </form>
      </div>
      }
      <section>
        {currentTabData[activeTab].map((ride,index) => {
          return <SingleRide key={ride.id} ride={ride} index={index} />;
        })}
      </section>
    </main>
  );
};
