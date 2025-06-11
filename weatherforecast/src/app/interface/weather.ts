export interface weatherData{
    city:{
        country: string,
        name: string,
    }
    list: Array<{
        deg: number,
        dt: number,
        feels_like:{
            day: number,
            eve: number,
            morn: number,
            night: number,
        },
        speed: number,
        weather: Array<{
            description: string,
        }>

    }>
};