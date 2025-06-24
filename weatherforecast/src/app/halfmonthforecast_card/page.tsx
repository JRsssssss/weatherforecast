/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { CardProps } from '../interface/cardprops';
import { hourlyWeatherData } from '../interface/hourlyweather';

export default function SixteenDayForecast({namePlace} :CardProps) {
  const [data, setData] = useState<hourlyWeatherData|null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
      async function fetchdata(){
          try {
              const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${namePlace}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`)
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
      <div className='flex rounded-lg border border-gray-200 shadow-sm max-w-7xl mx-auto mt-4 p-4 overflow-x-scroll'>
          <div className='flex flex-row gap-4'>
              {data?.list.slice(6, 30).map((item,index)=>(
                  <div key = {index} className='flex flex-col border rounded-md shadow-sm bg-blue-50'>
                      <div>{item.dt_txt}</div>
                      <div>{item.main.temp}</div>
                      <div>{item.weather[0].description}</div>
                  </div>
              ))}
          </div>
          
      </div>
  )
}
