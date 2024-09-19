import { useEffect, useState } from "react"
import './Watch.css'

interface Iwatch {
    data: {
        id: string,
        city: string,
        offset: string,
    },
    onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function getNewTime(offset: string) {
    const date = new Date();
    const hr = date.getHours() + Number(offset);
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
    const minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
    const secPosition = sec * 360 / 60;

    return {
      hr: hrPosition,
      min: minPosition,
      sec: secPosition,
    };

    
}

export const Watch = ({ data, onDelete }: Iwatch) => {
  
  const [ time, timeOut ] = useState(getNewTime(data.offset))

  const getTime = () => {
    timeOut(getNewTime(data.offset))
    }  
  
  useEffect(() => {
    const timeout = window.setInterval(getTime, 1000)
    return () => {
        window.clearTimeout(timeout); 
      }
  })
  return (
    <div className="Clock-box" id={data.id}>
        <h3 className="Clock-name">{data.city}</h3>
        <svg className="Clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
          <g className="Clock-face">
            <circle className="Clock-face__circle" cx="300" cy="300" r="253.9"/>
            <path className="Clock-face__hour-marks" d="M300.5 94V61M506 300.5h32M300.5 506v33M94 300.5H60M411.3 107.8l7.9-13.8M493 190.2l13-7.4M492.1 411.4l16.5 9.5M411 492.3l8.9 15.3M189 492.3l-9.2 15.9M107.7 411L93 419.5M107.5 189.3l-17.1-9.9M188.1 108.2l-9-15.6"/>
            <circle className="Clock-face__mid-circle" cx="300" cy="300" r="16.2"/>
          </g>
          <g className="Clock-hour" style={{ transform: `rotate(${time.hr}deg)` }}>
            <path className="Clock-hour__hour-arm" d="M300.5 298V142"/>
            <circle className="Clock-sizing-box" cx="300" cy="300" r="253.9"/>
          </g>
          <g className="Clock-minute" style={{ transform: `rotate(${time.min}deg)` }}>
            <path className="Clock-minute__minute-arm" d="M300.5 298V67"/>
            <circle className="Clock-sizing-box" cx="300" cy="300" r="253.9"/>
          </g>
          <g className="Clock-second" style={{ transform: `rotate(${time.sec}deg)` }}>
            <path className="Clock-second__second-arm" d="M300.5 350V55"/>
            <circle className="Clock-sizing-box" cx="300" cy="300" r="253.9"/>
          </g>
        </svg>
        <button
          className="Clock__delete"
          onClick={onDelete}
        >
          &#10005;
        </button>
      </div>
  )
}