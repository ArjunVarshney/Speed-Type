import React, { useCallback, useEffect, useState } from "react";

type timerType = {
  start: boolean;
  setFinish: Function;
  timer:number;
  setTimer: Function;
};

const Timer = ({ start, setFinish, timer, setTimer }: timerType) => {

  const decrementTimer = useCallback(() => {
    setTimer((oldTimer:number) => oldTimer - 1);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setFinish(true);
      return;
    }
    if (!start) return;
    const timeoutFunction = setInterval(decrementTimer, 1000);
    return () => clearInterval(timeoutFunction);
  }, [decrementTimer, timer, start]);

  return (
    <div className="text-md md:text-lg font-normal mb-4 p-3 px-4 rounded-btn bg-secondary text-secondary-content shadow-lg">
      {timer}
    </div>
  );
};

export default Timer;
