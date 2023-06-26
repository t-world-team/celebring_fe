import { useState } from "react"
import { useCallback } from "react"

export const useLoading = () => {
    const [loadingVisible, setLoadingVisible] = useState(false);
    
    const showLoading = useCallback((visible) => {
        setLoadingVisible(visible);
        if(visible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, []);

    return { loadingVisible, showLoading };
}