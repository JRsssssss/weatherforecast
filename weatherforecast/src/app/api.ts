'use server'

export async function getWeatherdata() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=16.821123&lon=100.265854&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
        const data = await response.json();
        return {data};
    } catch (error) {
        console.log(error);
    }
}
