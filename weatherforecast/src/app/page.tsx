'use client';

import React, { useEffect, useState } from "react";
import { getWeatherdata } from "./api";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getWeatherdata();
      console.log(result.data);
      setData(result.data);
    }

    fetchData();
  }, []);

  return (
    <div className="items-center justify-items-center min-h-screen">
      Hello World!
    </div>
  );
}
