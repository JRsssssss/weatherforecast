export interface hourlyWeatherData{
    city:{
        timezone: number,
    }
    list: Array<{
        dt: number,
        main:{
            temp: number,
        }
        weather: Array<{
            description: string
        }>
        dt_txt: string
    }>
}