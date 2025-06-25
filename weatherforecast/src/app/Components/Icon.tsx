/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from 'console';
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

function isNight(dt: number): boolean{
    const hour = new Date(dt * 1000).getHours();
    return hour < 6 || hour >= 18;
}

export const getWeatherIcon = (description: string, dt: number) => {
    const desc = description.toLowerCase();
    const night = isNight(dt);

    if(desc.includes('clear')){
        return night
        ? <WiNightClear size={48} color='#000' />
        : <WiDaySunny size={48} color='#000' />;
    }
    if(desc.includes('few clouds')||desc.includes('scattered clouds')){
        return night
        ? <WiNightAltCloudy size={48} color='#000'/>
        : <WiDayCloudy size={48} color='#000'/>
    }
    if(desc.includes('broken clouds')||desc.includes('overcast clouds')){
        return <WiCloudy size={48} color='#000'/>
    }
    if(desc.includes('snow')||desc.includes('freezing rain')){
        return <WiSnowflakeCold size={48} color='#000'/>
    }
    if(desc.includes('smoke')){
        return <WiSmoke size={48} color='#000'/>
    }
    if(desc.includes('tornado')||desc.includes('squalls')){
        return <WiTornado size={48} color='#000'/>
    }
    if(desc.includes('haze')||desc.includes('mist')||desc.includes('fog')){
        return <WiFog size={48} color='#000'/>
    }
    if(desc.includes('dust')||desc.includes('ash')){
        return <WiDust size={48} color='#000'/>
    }
    if(desc.includes('sand')){
        return <WiSandstorm size={48} color='#000'/>
    }
    if(desc.includes('rain')){
        if(desc.includes('shower')){
            return night
            ?<WiNightAltRain size={48} color='#000'/>
            :<WiDayRain size={48} color='#000'/>
        }
        return night
        ?<WiDayShowers size={48} color='#000'/>
        :<WiNightAltShowers size={48} color='#000'/>
    }
    if(desc.includes('drizzle')){
        return night
        ?<WiNightAltRain size={48} color='#000'/>
        :<WiDayRain size={48} color='#000'/>
    }
    if(desc.includes('thunderstorm')){
        if(desc.includes("rain")){
            return night
            ?<WiNightAltStormShowers size={48} color='#000'/>
            :<WiDayStormShowers size={48} color='#000'/>
        }
        if(desc.includes('dirzzle')){
            return night
            ?<WiNightAltThunderstorm size={48} color='#000'/>
            :<WiDayThunderstorm/>
        }
        return night
        ?<WiNightAltLightning size={48} color='#000'/>
        :<WiDayLightning size={48} color='#000'/>
    }

    return <WiAlien size={48} color='#000'/>;
}