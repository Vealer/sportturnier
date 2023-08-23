// import React, { useState, useEffect } from 'react';

// function Timer() {
//     const [time, setTime] = useState(900); // 15 Minuten in Sekunden
//     const [isActive, setIsActive] = useState(false);

//     useEffect(() => {
//         let interval;

//         if (isActive) {
//             interval = setInterval(() => {
//                 setTime(prevTime => (prevTime > 0 ? prevTime - 1 : prevTime));
//             }, 1000);
//         } else {
//             clearInterval(interval);
//         }

//         return () => {
//             clearInterval(interval);
//         };
//     }, [isActive]);

//     const handleStartStop = () => {
//         setIsActive(prevIsActive => !prevIsActive);
//     };

//     const handleReset = () => {
//         setTime(900); // Zurück auf 15 Minuten setzen
//         setIsActive(false);
//     };

//     const handleIncreaseTime = () => {
//         setTime(prevTime => prevTime + 60); // 1 Minute erhöhen
//     };

//     const handleDecreaseTime = () => {
//         setTime(prevTime => (prevTime >= 60 ? prevTime - 60 : prevTime)); // 1 Minute verringern, aber nicht unter 0 gehen
//     };

//     const formatTime = (seconds) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = seconds % 60;
//         return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//     };

//     return (
//         <div className='container glass-green p-5 mb-5 timer-container'>
//             <h1 className='timer-text container'>{formatTime(time)}</h1>
//             <button className='btn btn-primary' onClick={handleStartStop}>{isActive ? 'Pause' : 'Start'}</button>
//             <button className='btn btn-primary' onClick={handleReset}>Reset</button>
//             <button className='btn btn-primary' onClick={handleIncreaseTime}>+1 Minute</button>
//             <button className='btn btn-primary' onClick={handleDecreaseTime}>-1 Minute</button>
//         </div>
//     );
// }

// export default Timer;


import React, { useState } from 'react';

function Timer() {
    const [time, setTime] = useState(900); // 15 Minuten in Sekunden
    const [isActive, setIsActive] = useState(false);
    const [progress, setProgress] = useState(100);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(900);
        setProgress(100);
    };

    React.useEffect(() => {
        let interval;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
                setProgress((time / 900) * 100);
            }, 1000);
        } else if (time === 0) {
            resetTimer();
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    return (
        <div className="timer-container">
            <svg className="timer-svg">
                <circle
                    className="timer-progress"
                    r="18"
                    cx="20"
                    cy="20"
                    style={{ strokeDasharray: `${progress} 100` }}
                ></circle>
            </svg>
            <h1 className="timer-text">{formatTime(time)}</h1>
            <div className="timer-buttons">
                <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${padNumber(minutes)}:${padNumber(remainingSeconds)}`;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

export default Timer;
