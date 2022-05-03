import React from "react";
import './Rides.css';
export const SingleRide = ({ride, index})=>{
    return(
         <article>
                             <div className="image-container">
                    <img src={ride.map_url + '?random=' + index} alt='map picture' className="image"/>
                </div>
                <div className="description">
                    <h3>ride id:<span>{ride.id}</span></h3>
                    <h3>origin station:<span>{ride.origin_station_code}</span></h3>
                    <h3>station path:<span>[{ride.station_path.join(", ")}]</span></h3>
                    <h3>date:<span>{ride.date}</span></h3>
                    <h3>distance:<span>{ride.destination_station_code - ride.origin_station_code}</span></h3>
                </div>
                <div className="location">
                    <button className="location-btn">{ride.city}</button>
                    <button className="location-btn">{ride.state}</button>
                </div>
                        </article>
    )
}