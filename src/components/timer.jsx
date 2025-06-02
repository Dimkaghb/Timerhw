import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const Timer = () => {
    const { colors, toggleTheme, isDarkMode } = useTheme();
    const quotes = [
        "The only way to do great work is to love what you do.",
        "Believe you can and you're halfway there.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Don't watch the clock; do what it does. Keep going.",
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
        "The best way to predict the future is to create it.",
        "Your time is limited, don't waste it living someone else's life.",
        "The only limit to our realization of tomorrow is our doubts of today.",
        "It does not matter how slowly you go as long as you do not stop.",
        "Everything you've ever wanted is on the other side of fear."
    ]

    const [savedName, setSavedName] = useState('');
    const [timercount, setTimercount] = useState(0)
    const [selectedTime, setSelectedTime] = useState(10)
    const [time, setTime] = useState(selectedTime)
    const [isRunning, setIsRunning] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [currentQuote, setCurrentQuote] = useState('')
    const [name, setName] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [isEntered, setIsEntered] = useState(false)
    const [isStopped, setIsStopped] = useState(false)

    const getRandomQuote = () => {
        const randomNumber = Math.floor(Math.random() * quotes.length)
        return quotes[randomNumber]
    }

    const progress = (time / selectedTime) * 100

    useEffect(() => {
        let intervalId
        if (isRunning && time > 0) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime - 1)
            }, 1000)
        } else if (time === 0) {
            setIsRunning(false)
            setTime(selectedTime)
            setIsComplete(true)
            setCurrentQuote(getRandomQuote())
            setTimercount(timercount + 1)
            handlePlaySound(true)
        }
        return () => clearInterval(intervalId)
    }, [isRunning, time, selectedTime])

    const handleStart = () => {
        setIsRunning(true)
        setIsComplete(false)
    }

    const handleStop = () => {
        setIsRunning(false)
        setIsStopped(true)
        handlePlaySound(false)
    }

    const handleReset = () => {
        setIsRunning(false)
        setTime(selectedTime)
        setIsComplete(false)
    }

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setSavedName(storedName);
        }
    }, []);

    const handleSubmit = () => {
        if(name.trim() !== '') {
            setIsEntered(true)
            localStorage.setItem('userName', name); 
            setSavedName(name); 
            setName('');
        }
        else alert('Please enter your name')
    }

    const handlePlaySound = (isWin) => {
        if(isWin){
            const audio = new Audio('../assets/sounds/Win.mp3');
            audio.play();
        }
        else{
            const audio = new Audio('../assets/sounds/Win.mp3');
            audio.play();
        }
    };

    const buttonStyle = {
        padding: '10px 20px',
        backgroundColor: colors.button,
        color: colors.buttonText,
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: colors.primary
        }
    }

    const inputStyle = {
        padding: '10px',
        fontSize: '14px',
        borderRadius: '4px',
        border: `1px solid ${colors.border}`,
        marginRight: '10px',
        outline: 'none',
        backgroundColor: colors.background,
        color: colors.text,
        '&:focus': {
            borderColor: colors.primary
        }
    }

    return (
        <div style={{ 
            padding: '30px',
            margin: '20px auto',
            maxWidth: '500px',
            backgroundColor: colors.background,
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            color: colors.text,
            transition: 'all 0.3s ease'
        }}>
            <button 
                onClick={toggleTheme}
                style={{
                    ...buttonStyle,
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    backgroundColor: colors.secondary,
                    color: colors.text
                }}
            >
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            {!isEntered ? (
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter your name" 
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                    />
                    <button 
                        onClick={handleSubmit}
                        style={buttonStyle}
                    >
                        Enter
                    </button>
                </div>
            ) : (
                <>
                    {savedName && <h2 style={{ color: colors.text, marginBottom: '20px' }}>Hello, {savedName}!</h2>}
                    <div style={{ margin: '20px 0' }}>
                        <select 
                            value={selectedTime}
                            onChange={(e) => {
                                setSelectedTime(Number(e.target.value))
                                setTime(Number(e.target.value))
                            }}
                            style={{
                                ...inputStyle,
                                backgroundColor: colors.background,
                                cursor: 'pointer'
                            }}
                        >
                            <option value="10">10 seconds</option>
                            <option value="20">20 seconds</option>
                            <option value="30">30 seconds</option>
                        </select>
                    </div>
                    <div style={{ 
                        fontSize: '36px', 
                        fontWeight: 'bold',
                        margin: '20px 0',
                        color: colors.text
                    }}>
                        {savedName}, осталось {time} секунд
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: colors.progressBg,
                        borderRadius: '4px',
                        margin: '20px 0',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            height: '100%',
                            backgroundColor: colors.progressFill,
                            transition: 'width 1s linear',
                            borderRadius: '4px'
                        }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        {!isRunning && isStopped && timercount < 1 ? (
                            <button
                                onClick={() => {
                                    setTime(selectedTime);
                                    setIsStopped(false);
                                    setIsRunning(false);
                                    setIsComplete(false);
                                }}
                                style={buttonStyle}
                            >
                                Restart
                            </button>
                        ) : !isRunning ? (
                            <button 
                                onClick={handleStart}
                                style={buttonStyle}
                            >
                                Start
                            </button>
                        ) : (
                            <button 
                                disabled={true}
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: colors.secondary,
                                    cursor: 'not-allowed'
                                }}
                            >
                                Start
                            </button>
                        )}
                        <button 
                            onClick={handleStop}
                            style={{
                                ...buttonStyle,
                                backgroundColor: colors.secondary,
                                color: colors.text
                            }}
                        >
                            Stop
                        </button>
                    </div>
                    {isComplete && (
                        <div style={{
                            marginTop: '20px',
                            fontSize: '20px',
                            color: colors.text
                        }}>
                            Время вышло, Молодец {savedName}!
                            <p style={{ fontSize: '16px', color: colors.quote }}>Ты прошел таймер {timercount} раз</p>
                            <p style={{
                                fontSize: '14px',
                                color: colors.quote,
                                fontStyle: 'italic',
                                marginTop: '10px'
                            }}>
                                {currentQuote}
                            </p>
                        </div>
                    )}
                    {!isStopped ? (
                        <p style={{ color: colors.text, marginTop: '20px' }}>Так держать {'\u{1F604}'}</p>
                    ) : (
                        <p style={{ color: colors.text, marginTop: '20px' }}>Давай еще ..{'\u{1F622}'}</p>
                    )}
                </>
            )}
        </div>
    )
}

export default Timer
