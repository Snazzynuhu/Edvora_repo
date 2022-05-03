import React, { useState, useContext, useEffect } from "react";
const url = "https://assessment.api.vweb.app/rides";
const profile_url = "https://assessment.api.vweb.app/user";
const localUrl = "dummy-data/rides.json";
const localProfileUrl = "dummy-data/userProfile.json";

// SUBMISSION LINK https://assessment.api.vweb.app/user

// NEAREST RIDES
const getNearestRidesArray = (user, rides) => {
  let stationCode = user.station_code;
  console.log(user)
  const ridesArray = [...rides];
  const nearestRides = [];

  let iteration = 0;
//   const MAX_ITERATION = rides.length * rides.length;

  while (ridesArray.length) {
    ridesArray.forEach((ride, index) => {
      const isInclude = ride.station_path.includes(stationCode);
      if (isInclude) {
        nearestRides.push(ride);
        ridesArray.splice(index, 1);
      }
      iteration += 1;
    });
    stationCode += 1;

    // if (iteration >= MAX_ITERATION) break;
  }

  console.log(nearestRides)
  return nearestRides;
};
console.log(new Date().getFullYear() - 1);
// UPCOMING RIDES
let currentTime = new Date("");
let currentYear = currentTime.getFullYear();
let currentMonth = currentTime.getMonth();
let currentDate = currentTime.getDate();
let currentDay = currentTime.getDay();
let currentTimes = currentTime.getDay();

const getDateTimeDifference = (date1, date2) => {
  const diffTime = new Date(date1) - new Date(date2);
  return diffTime;
};

const getUpcomingRidesArray = (rides) => {
  const upcomingRides = rides.filter((ride) =>
    getDateTimeDifference(ride?.date, currentTime) >= 0 ? true : false
  );

  return upcomingRides;
};
// PAST RIDES
const getPastRidesArray = (rides) => {
  const upcomingRides = rides.filter((ride) =>
    getDateTimeDifference(ride?.date, currentTime) < 0 ? true : false
  );
  return upcomingRides;
};

// STATE ARRAY
const getStates = (rides) => {
  const newArray = rides.map((ride) => {
    return ride.state;
  });
  return newArray;
};
// CITY ARRAY
const getCities = (rides) => {
  const newArray = rides.map((ride) => {
    return ride.city;
  });
  return newArray;
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = React.useState(true);
  const [nearestRides, setNearestRides] = useState([]);
  const [upcomingRides, setUpComingRides] = useState([]);
  const [pastRides, setPastRides] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [states, setStates] = useState({});
  const [cities, setCities] = useState({});

  //  FETCH ALL RIDES DATA IN JSON
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    setRides(data);
    setFilteredRides(data);
  };

  // FETCH USER'S PROFILE
  const fetchUser = async () => {
    const response = await fetch(profile_url);
    const data = await response.json();
    setUser(data);
  };

  const filterByStateAndCity = (filterObj) => {
    const data = rides?.filter((ride) => {
      if (
        ride?.state.includes(filterObj.state) ||
        ride?.city.includes(filterObj.city)
      ) {
        return true;
      }
      return false;
    });
    console.log(data);
    setFilteredRides(data);
  };
  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  useEffect(() => {
    if (!rides.length || !user || !filteredRides.length) return;

    const nearestRideArray = getNearestRidesArray(user, filteredRides);
    setNearestRides(nearestRideArray);
    const upcomingRidesArray = getUpcomingRidesArray(filteredRides);
    setUpComingRides(upcomingRidesArray);
    const pastRidesArray = getPastRidesArray(filteredRides);
    setPastRides(pastRidesArray);
    const states = getStates(rides);
    setStates(states);
    const cities = getCities(rides);
    setCities(cities);
  }, [rides, user, filteredRides]);

  return (
    <AppContext.Provider
      value={{
        rides,
        setRides,
        user,
        loading,
        nearestRides,
        upcomingRides,
        pastRides,
        setIsModalOpen,
        isModalOpen,
        states,
        cities,
        filterByStateAndCity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
