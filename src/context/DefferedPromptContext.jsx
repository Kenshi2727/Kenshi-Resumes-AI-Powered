import { createContext, useState } from 'react';

export const DefferedPromptContext = createContext({
    deferredPrompt: null,
    setDeferredPrompt: () => { },
});


export const DefferedPromptProvider = ({ children }) => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    return (
        <DefferedPromptContext.Provider value={{ deferredPrompt, setDeferredPrompt }}>
            {children}
        </DefferedPromptContext.Provider>
    );
};