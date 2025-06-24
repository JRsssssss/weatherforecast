export interface hourlyWeatherData{
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