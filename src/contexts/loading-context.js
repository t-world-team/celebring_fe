import { createContext } from 'react';

export const LoadingContext = createContext({
    visible: false,
    showLoading: (visible) => {},
})