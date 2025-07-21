/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardProps } from '@/app/interface/cardprops';
import { currentWeatherData } from '@/app/interface/currentweather';
import React, { useEffect, useState } from 'react'
import { WiThermometer, WiHumidity, WiStrongWind, WiTime2 } from 'react-icons/wi';
import { getWeatherIcon } from '@/app/Components/Icon';
import './icon.css';

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
  function convertTimeStamp(unixtimeStamp: number) {
    const date = new Date(unixtimeStamp * 1000);
    return {
      day: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'long' }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString('en-US', { hour12: false }),
    };
  }
  const { day, month, year, time } = data ? convertTimeStamp(data.dt) : {
    day: '',
    month: '',
    year: '',
    time: '',
  };

  return (
    // delete the border
    <div className='flex flex-row rounded-lg border border-gray-200 shadow-sm max-w-2xl mx-auto justify-center'>
        {data&& (
        // delete the border
        <div className='flex flex-row'>
          <div className='flex flex-col w-[200px] justify-center items-center'>
            <div className='flex flex-col'>
              <div className='flex items-center gap-1'>
                <span><WiTime2 size={30} color='#000000'/></span>
                <div className='flex flex-col'>
                  <div>
                    <div className=''>{day} {month} {year}</div>
                    <div className=''>{time}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col text-[50px] items-center'>
              {data.name} <br />
              <div className='flex text-[35px] items-center'>
                <span className=''><WiThermometer size={50} color={data.main.temp < 10? '#2ca7f3' : '#ed812d'}/></span> {data.main.temp}°C
              </div>
              <div className='h-[200px]'>
                {getWeatherIcon(data.weather[0].description, data.dt, data.timezone, true)}
              </div>
              <div className='text-[30px]'>
                "{data.weather[0].description}"
              </div>
            </div>
          </div>
          <div className='flex flex-col w-[200px] justify-center items-center'>
            <div className='flex flex-col'>
              <div className='flex items-center'>
                <span><WiThermometer size={30} color={data.main.temp < 10? '#2ca7f3' : '#ed812d'}/></span>Feel likes {data.main.feels_like} °C
              </div>
              <div className='flex items-center'>
                <span><WiStrongWind size={30} color='#77f8e8'/></span>Wind Speed {data.wind.speed} k/h
              </div>
              <div className='flex items-center'>
                <span><WiHumidity size={30} color='#316efa'/></span>Humidity {data.main.humidity}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
