/* eslint-disable @typescript-eslint/no-unused-vars */
import { weatherData } from '@/app/interface/weather';
import React, { useEffect, useState } from 'react'
import { WiNightAltRain } from 'react-icons/wi';
export default function Card() {
  const [data, setData] = useState<weatherData | null>(null);
  const [namePlace, setNamePlace] = useState('Bangkok');
  const [locationError, setLocationError] = useState<string | null>(null);
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`);
                const result = await response.json();
                console.log(result);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch weather data:", error);
                setLocationError("Failed to fetch weather data");
            }
        },
        (error) => {
            console.error("Error getting location:", error);
            setLocationError("Permission denied or failed to get location");
        }
        );
  }, []);

  return (
    // delete the border
    <div className='flex rounded-lg border border-gray-200 shadow-sm max-w-3xl mx-auto justify-center'>
        {data&&(
        // delete the border
        <div className='flex flex-col border'>
          <div className='flex flex-col border'>
            <WiNightAltRain size={48} color='#000'/>
            <h3>{data.city.name}</h3>
            <h3>{data.list[0].weather[0].description}</h3>
            <h3>{data.list[0].temp.day} celcius</h3>
            <h3>feel likes {data.list[0].feels_like.day} celcius</h3>
          </div>
          <div className='flex'>
            <h3>Test</h3>
          </div>
        </div>
      )}
    </div>
  )
}
