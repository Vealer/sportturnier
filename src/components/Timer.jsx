

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

    // Get all the Meters
    const meters = document.querySelectorAll('svg[data-value] .meter');

    meters.forEach((path) => {
        // Get the length of the path
        let length = path.getTotalLength();
        // Get the value of the meter
        let value = parseInt(path.parentNode.getAttribute('data-value'));
        // Calculate the percentage of the total length
        let to = length * ((100 - value) / 100);

        path.getBoundingClientRect();
        // Set the Offset
        path.style.strokeDashoffset = Math.max(0, to); 
        // path.nextElementSibling.textContent = `${value}%`;
    });


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
        <div className="timer-container container glass-green mb-5 p-3">
            <svg className='circle' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" data-value={progress}>
                <circle r="45" cx="50" cy="50" />
                <path className="meter" d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0" strokeLinecap="round" strokeLinejoin="round" strokeDashoffset="282.78302001953125" strokeDasharray="282.78302001953125" />
                <text className="timer-text" x="50" y="60" textAnchor='middle'>{formatTime(time)}</text>
            </svg>
            <div className="timer-buttons">
                <button className='btn btn-primary' onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
                <button className='btn btn-primary' onClick={resetTimer}>Reset</button>
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
