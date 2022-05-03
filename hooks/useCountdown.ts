import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const calculateTimeLeft = (date: string | number | Date | dayjs.Dayjs) => {
    let difference = dayjs(date)?.diff(dayjs());
  
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
  
    return timeLeft;
}

const useCountdown = (date: string | number | Date | dayjs.Dayjs) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(date));
        }, 1000);

        return () => clearTimeout(timer);
    });

    return timeLeft;
};

export default useCountdown;
