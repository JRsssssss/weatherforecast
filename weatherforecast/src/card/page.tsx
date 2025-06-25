/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardProps } from '@/app/interface/cardprops';
import { currentWeatherData } from '@/app/interface/currentweather';
import React, { useEffect, useState } from 'react'
import { WiNightAltRain } from 'react-icons/wi';
import { getWeatherIcon } from '@/app/Components/Icon';

export default function Card({namePlace}: CardProps) {
  const [data, setData] = useState<currentWeatherData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  console.log(namePlace);
  useEffect(() => {
    async function fetchData() {
      try {
        const response_current = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${namePlace}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`);
        const result = await response_current.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setLocationError("Failed to fetch weather data");
      }
    }

    fetchData();
  }, [namePlace]);

  return (
    // delete the border
    <div className='flex rounded-lg border border-gray-200 shadow-sm max-w-3xl mx-auto justify-center'>
        {data&&(
        // delete the border
        <div className='flex flex-col border'>
          <div className='flex flex-col border'>
            {getWeatherIcon(data.weather[0].description, data.coord.dt)}
            <h3>{data.name}</h3>
            <h3>{data.weather[0].description}</h3>
            <h3>{data.main.temp} celcius</h3>
            <h3>feel likes {data.main.feels_like} celcius</h3>
          </div>
        </div>
      )}
    </div>
  )
}
