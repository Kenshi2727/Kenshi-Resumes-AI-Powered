import { createContext, useState } from 'react';

export const ScoreContext = createContext({
    score: 0,
    setScore: () => { },
});


export const ScoreProvider = ({ children }) => {
    const [score, setScore] = useState(0);  // Initialize state with 0

    return (
        <ScoreContext.Provider value={{ score, setScore }}>
            {children}
        </ScoreContext.Provider>
    );
};