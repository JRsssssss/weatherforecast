/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { WiDaySunny, WiNightClear, WiDayCloudy, WiNightAltCloudy, 
         WiCloudy, WiSnowflakeCold, WiSmoke, WiTornado, WiFog, WiDust, 
         WiSandstorm,
         WiNightAltRain,
         WiDayRain,
         WiDayStormShowers,
         WiNightAltStormShowers,
         WiNightAltThunderstorm,
         WiDayThunderstorm,
         WiNightAltLightning,
         WiDayLightning,
         WiDayShowers,
         WiNightAltShowers,
         WiAlien} from "react-icons/wi";

// function isNight(dt: number, timezone: number): boolean{
//     const hour = new Date((dt + timezone) * 1000).getUTCHours();
//     console.log(dt , hour);
//     return hour < 6 || hour >= 18;
// }

function isNight(dt: number, timezone: number): boolean {
    const localTimestamp = (dt + timezone) * 1000;
    const localDate = new Date(localTimestamp);
    const hour = localDate.getUTCHours();
    console.log("Hour in local Date:", hour);
    return hour < 6 || hour >= 18;
}


export const getWeatherIcon = (description: string, dt: number, timezone: number, isCard: boolean) => {
    const desc = description.toLowerCase();
    const night = isNight(dt, timezone);

    if(desc.includes('clear')){
        return night
        ? <WiNightClear  size={isCard? 200 : 48} color='#000' />
        : <WiDaySunny size={isCard? 200 : 48} color='#000' />;
    }
    if(desc.includes('few clouds')||desc.includes('scattered clouds')){
        return night
        ? <WiNightAltCloudy size={isCard? 200 : 48} color='#000'/>
        : <WiDayCloudy size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('broken clouds')||desc.includes('overcast clouds')){
        return <WiCloudy size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('snow')||desc.includes('freezing rain')){
        return <WiSnowflakeCold size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('smoke')){
        return <WiSmoke size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('tornado')||desc.includes('squalls')){
        return <WiTornado size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('haze')||desc.includes('mist')||desc.includes('fog')){
        return <WiFog size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('dust')||desc.includes('ash')){
        return <WiDust size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('sand')){
        return <WiSandstorm size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('rain')){
        if(desc.includes('shower')){
            return night
            ?<WiNightAltRain size={isCard? 200 : 48} color='#000'/>
            :<WiDayRain size={isCard? 200 : 48} color='#000'/>
        }
        return night
        ?<WiNightAltShowers size={isCard? 200 : 48} color='#000'/>
        :<WiDayShowers size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('dirzzle')){
        return night
        ?<WiNightAltRain size={isCard? 200 : 48} color='#000'/>
        :<WiDayRain size={isCard? 200 : 48} color='#000'/>
    }
    if(desc.includes('thunderstorm')){
        if(desc.includes("rain")){
            return night
            ?<WiNightAltStormShowers size={isCard? 200 : 48} color='#000'/>
            :<WiDayStormShowers size={isCard? 200 : 48} color='#000'/>
        }
        if(desc.includes('dirzzle')){
            return night
            ?<WiNightAltThunderstorm size={isCard? 200 : 48} color='#000'/>
            :<WiDayThunderstorm/>
        }
        return night
        ?<WiNightAltLightning size={isCard? 200 : 48} color='#000'/>
        :<WiDayLightning size={isCard? 200 : 48} color='#000'/>
    }

    return <WiAlien size={isCard? 200 : 48} color='#000'/>;
}