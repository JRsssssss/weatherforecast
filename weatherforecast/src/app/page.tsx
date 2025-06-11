'use client';

import React, { useEffect, useState } from "react";
import { weatherData } from "./interface/weather";

export default function Home() {
  const [data, setData] = useState<weatherData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=Bangkok&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen">
      <h1>Hello World!</h1>
      {data&&(
        <div>
          <h3>{data.city.name}</h3>
        </div>
      )}
    </div>
  );
}
