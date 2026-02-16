import React, { useEffect, useState } from "react";

function Countdown({ expiryDate }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(0, expiryDate - Date.now());
  });

  useEffect(() => {
    let frameId; 
    
    function tick() { 
      const now = Date.now(); 
      const diff = expiryDate - now; 
      
      setTimeLeft(Math.max(0, diff)); 
      
      if (diff > 0) {
        frameId = requestAnimationFrame(tick); 
      } 
    } 
    
    frameId = requestAnimationFrame(tick); 
    
    return () => cancelAnimationFrame(frameId); 
  }, [expiryDate]); 
  
  // Convert ms → h/m/s 
  const totalSeconds = Math.floor(timeLeft / 1000); 
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0"); 
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0"); 
  const seconds = String(totalSeconds % 60).padStart(2, "0"); 
  
  return ( 
    <div className="de_countdown">
      <span className="timer__hours">{hours}h </span>
      <span className="timer__minutes">{minutes}m </span>
      <span className="timer__seconds">{seconds}s</span>
    </div>
  );
}

export default Countdown;