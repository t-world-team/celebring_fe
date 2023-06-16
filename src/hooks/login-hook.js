import { useCallback, useEffect, useState } from "react"

let logoutTimer;
export const useAuth = () => {
    const localToken = localStorage.getItem("token");
    const localExpire = localStorage.getItem("expire");
    const [token, setToken] = useState(localToken != null && localToken);
    const [expire, setExpire] = useState(localExpire != null && new Date(localExpire));

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