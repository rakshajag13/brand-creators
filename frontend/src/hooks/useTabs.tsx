import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export const useTabs = (tabs: string[]) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = React.useState<number>(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        //generate hash route
        const hashRoute = `${location.pathname}#${tabs[newValue].toLowerCase()}`;
        setActiveTab(newValue);
        //check if hash route is already in the url
        if (location.hash !== hashRoute) {
            navigate(hashRoute);
        }
    }

    const handleUrlLocation = React.useCallback(() => {

        let tabFound = false;
        for (let i = 0; i < tabs.length; i++) {
            const hashRoute = `#${tabs[i].toLowerCase()}`;

            if (location.hash === hashRoute) {
                setActiveTab(i);
                tabFound = true;
                break;
            }
        }
        if (!tabFound) {
            //generate hash route
            const hashRoute = `${location.pathname}#${tabs[0].toLowerCase()}`;
            //check if hash route is already in the url
            if (location.hash !== hashRoute) {
                navigate(hashRoute);
            }
            setActiveTab(0);
        }

    }, [location.hash, location.pathname, navigate, tabs]);

    useEffect(() => {
        handleUrlLocation();
    }, [handleUrlLocation, location.pathname, tabs]);

    return {
        handleTabChange,
        activeTab,
    }

}