import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    const theme = {
        isDarkMode,
        toggleTheme,
        colors: {
            background: isDarkMode ? '#1a1a1a' : '#ffffff',
            text: isDarkMode ? '#ffffff' : '#2196F3',
            primary: isDarkMode ? '#64B5F6' : '#2196F3',
            secondary: isDarkMode ? '#1976D2' : '#E3F2FD',
            border: isDarkMode ? '#333333' : '#E3F2FD',
            button: isDarkMode ? '#1976D2' : '#2196F3',
            buttonText: '#ffffff',
            progressBg: isDarkMode ? '#333333' : '#E3F2FD',
            progressFill: isDarkMode ? '#64B5F6' : '#2196F3',
            quote: isDarkMode ? '#90CAF9' : '#64B5F6'
        }
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
