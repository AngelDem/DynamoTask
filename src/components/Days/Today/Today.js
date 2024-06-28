import React, { useEffect, useState } from 'react';

export default function Today() {
    const [current, setCurrent] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dayResponse = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Sofia,bg&APPID=3d9f3c7242d9d5f5ca8aae8e020b0dd6&units=metric');
                if (!dayResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const dayData = await dayResponse.json();
                setCurrent(dayData);
                // console.log('------');
                // console.log(dayData);
                // console.log('------');
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    const TodayWeatherIcon = 'https://openweathermap.org/img/wn/' + current?.weather?.[0]?.icon + '@4x.png';

    return (
        <div id="CurrentDay">
            <figure>
                <img src={TodayWeatherIcon} alt="" />
            </figure>
            <h5>
                { Math.round(current?.main?.temp) } C
                <span>{ current?.weather?.[0]?.main } ( { current?.weather?.[0]?.description } )</span>
            </h5>
            <div className="additional-info">
                <div><p><i class="fa-regular fa-location-dot"></i> { current?.name }</p></div>
                <div><i class="fa-sharp fa-regular fa-calendar-days"></i> <time>{ new Date(current.dt * 1000).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}) }</time></div>
            </div>
            <div className="moreInfo">
              <div>
                  <p>
                      <strong>Feels Like</strong>
                      { Math.round(current?.main?.feels_like) }C
                  </p>
              </div>
              <div>
                  <p>
                      <strong>Humidity</strong>
                      { current?.main?.humidity }%
                  </p>
              </div>
              <div>
                  <p>
                      <strong>Wind speed</strong>
                      { current?.wind?.speed } m/s
                  </p>
              </div>
            </div>
        </div>
    );
}
