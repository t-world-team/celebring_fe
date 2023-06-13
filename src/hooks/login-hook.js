import { useCallback, useEffect, useState } from "react"

let logoutTimer;
export const useAuth = () => {
    const [token, setToken] = useState();
    const [expire, setExpire] = useState();

    const login = useCallback((token) => {
        const expireDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 3);
        setToken(token);
        setExpire(expireDate);
        localStorage.setItem("token", token);
        localStorage.setItem("expire", expireDate);
    }, []);
    
    const logout = useCallback(() => {
        setToken(null);
        setExpire(null);
        localStorage.removeItem("token");
        localStorage.removeItem("expire");
    }, []);

    useEffect(() => {
        if(token && expire) {
            const remain = expire.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remain);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, expire, logout]);

    return { token, login, logout };
}