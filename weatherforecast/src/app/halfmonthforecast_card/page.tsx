/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { CardProps } from '../interface/cardprops';
import { halfmonthWeatherData } from '../interface/16dailyweather';
import { getWeatherIcon } from '../Components/Icon';

export default function SixteenDayForecast({namePlace} :CardProps) {
  const [data, setData] = useState<halfmonthWeatherData|null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [day, setDay] = useState("No");
  const [month, setMonth] = useState("No");
  
  function convertTimeStamp(unixtimeStamp: number) {
    const date = new Date(unixtimeStamp * 1000);
    return {
      day: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'long' }),
    };
  }
  

  useEffect(() => {
      async function fetchdata(){
          try {
              const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${namePlace}&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`)
              const result = await response.json();
              console.log(result);
              setData(result);
          } catch (error) {
              console.error("Failed to fetch weather data:", error);
              setLocationError("Failed to fetch weather data");
          }
      }

      fetchdata();
  }, [namePlace]);
  return (
    <div className='flex flex-col mt-4'>
        <div className='flex justify-center'>
            <div className='flex border p-1 rounded-lg border-gray-200 bg-sky-300'>
                Daily Forecast
            </div>
        </div>
        <div className='flex rounded-lg border border-gray-200 shadow-sm max-w-7xl mx-auto mt-1 p-4 overflow-x-scroll'>
            <div className='flex flex-row gap-4'>
                {data?.list.map((item, index) => {
                    const { day, month } = convertTimeStamp(item.dt);
                    return (
                    <div key={index} className='flex flex-col justify-center items-center rounded-md shadow-sm bg-blue-50 w-[200px]'>
                        <div>{day} {month}</div>
                        <div>{item.temp.day}°C</div>
                        {getWeatherIcon(item.weather[0].description, item.dt, data.city.timezone, false)}
                        <div>{item.weather[0].description}</div>
                    </div>
                    );
                })}
            </div>
            
        </div>
    </div>

  )
}
