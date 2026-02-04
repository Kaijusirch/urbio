import { useEffect, useState } from 'react';

export function useQldTime() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format for AEST (UTC+10) - Queensland doesn't observe daylight saving
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Australia/Brisbane',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Australia/Brisbane',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      
      setTime(now.toLocaleTimeString('en-AU', options));
      const formattedDate = now.toLocaleDateString('en-AU', dateOptions);
      setDate(formattedDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return { time, date };
}
