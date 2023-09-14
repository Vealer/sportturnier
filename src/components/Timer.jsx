import React, { useEffect, useState } from 'react';

function Timer({ minutes, seconds }) {
    const [time, setTime] = useState(minutes * 60 + seconds);
    const [isActive, setIsActive] = useState(false);
    const [progress, setProgress] = useState(100);
    const meters = document.querySelectorAll('svg[data-value] .meter');
    meters.forEach((path) => {
        let length = path.getTotalLength();
        let value = parseInt(path.parentNode.getAttribute('data-value'));
        let to = length * ((100 - value) / 100);
        path.getBoundingClientRect();
        path.style.strokeDashoffset = Math.max(0, to);
    });


    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(minutes * 60 + seconds);
        setProgress(100);
    };

    useEffect(() => {
        setTime(minutes * 60 + seconds);
    }, [minutes, seconds]);

    React.useEffect(() => {
        let interval;
        if (time === 0) {
            setIsActive(false);
            setTime(minutes * 60 + seconds);
            setProgress(100);
            const audio = new Audio('../assets/counter.wav');
            audio.play();
        }

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
                setProgress(prevProgress => (time / (minutes * 60 + seconds)) * 95);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, time, minutes, seconds]);

    return (
        <div className="timer-container container glass-green mb-5 p-3">
            <div className="timer-buttons mt-3">
                <button className='btn btn-primary' onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
                <svg className='circle' viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" data-value={progress}>
                    <circle r="45" cx="50" cy="50" />
                    <path className="meter" d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0" strokeLinecap="round" strokeLinejoin="round" strokeDashoffset="282.78302001953125" strokeDasharray="282.78302001953125" />
                    <text className="timer-text" x="50" y="60" textAnchor='middle'>{formatTime(time)}</text>
                </svg>
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
