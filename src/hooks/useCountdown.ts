import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetDate: Date): TimeLeft {
  const difference = Math.max(targetDate.getTime() - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
}

export function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    getTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = window.setInterval(
      () => setTimeLeft(getTimeLeft(targetDate)),
      1000
    );

    return () => window.clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
