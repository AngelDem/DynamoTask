import React, { useEffect, useState } from 'react';

export default function NextDay() {
    const [weeks, setWeek] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weekResponse = await fetch( 'https://api.openweathermap.org/data/2.5/forecast?q=Sofia,bg&appid=3d9f3c7242d9d5f5ca8aae8e020b0dd6&units=metric' );
                if (!weekResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const weekData = await weekResponse.json();
                setWeek(weekData.list);
                // console.log('------');
                // console.log(weekData.list);
                // console.log('------');
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, []);

    const highestTempByDate = {};

    weeks.forEach((weatherObj) => {
        const today = new Date().toLocaleDateString('en-US');
        const dayLimit = new Date().getTime() + (1000 * 60 * 60 * 24 * 5);
        const dayLimitFormat = new Date(dayLimit).toLocaleDateString('en-US');
        const date = new Date(weatherObj.dt * 1000).toLocaleDateString('en-US');
        const temp = weatherObj.main.temp;

        if(today < date && date < dayLimitFormat){
            if (!highestTempByDate[date] || temp > highestTempByDate[date].main.temp) {
                highestTempByDate[date] = weatherObj;
            }
        }

    });

    const highestTempArray = Object.values(highestTempByDate);

    console.log('!!!');
    console.log(highestTempByDate);
    console.log('!!!');

    return (
        <div id='nextDays'>
        {highestTempArray.length > 0 &&
            highestTempArray.map((day, index) => (
            <div className='nextDay' key={index} index={index}>
                <div>
                    <figure>
                        <img src={'https://openweathermap.org/img/wn/' + day?.weather?.[0]?.icon + '.png'} alt="" />
                    </figure>
                    {Math.round(day.main.temp)}C
                    <time> {new Date(day.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', })} </time>
                </div>
            </div>
        ))}
        </div>
    );
}
