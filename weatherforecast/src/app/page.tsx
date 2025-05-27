'use client';

import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?lat=16.821123&lon=100.265854&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`);
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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
