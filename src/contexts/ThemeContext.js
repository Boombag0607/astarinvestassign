"use client";

import { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const ThemeProviderComponent = ({ children }) => {
    const [mode, setMode] = useState('light');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ mode, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);

