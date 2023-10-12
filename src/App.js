import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import {APP_STRINGS, WEB_KEYS} from "./common/StringValues";

import ChartComponent from './components/ChartComponent';
import MousePosEventComponent from "./components/MousePosEventComponent";
import ApiService from "./services/ApiService";

const API_BASE_URL = 'http://localhost:8000';

const App = () => {
    const [componentStatus, setComponentStatus] = useState("");
    const [isBrowserFocused, setIsBrowserFocused] = useState(true);
    const [isLoggedon, setIsLoggedon] = useState(false);
    const [instanceId, setInstanceId] = useState(null);
    const [eventGranularity, setEventGranularity] = useState(-1);
    const [eventPerBatchCount, setEventPerBatchCount] = useState(-1);
    const [chartGranularity, setChartGranularity] = useState(null);

    const sendLogonRequest = async () => {
        let lsInstanceId = localStorage.getItem(WEB_KEYS.instanceId);
        if (isNull(lsInstanceId)) {
            setInstanceId(lsInstanceId);
        }
        try {
            const response = await ApiService.apiGetLogon(isNull(lsInstanceId) ? lsInstanceId : null);
            const responseData = response.data;
            console.log("responseData", responseData);
            setInstanceId(responseData[WEB_KEYS.instanceId]);
            setEventGranularity(responseData[WEB_KEYS.eventGranularity]);
            setEventPerBatchCount(responseData[WEB_KEYS.eventPerBatchCount]);
            setChartGranularity(responseData[WEB_KEYS.chartGranularity]);
            setIsLoggedon(true);
            setIsBrowserFocused(true);
            localStorage.setItem(WEB_KEYS.instanceId, instanceId ? instanceId.toString() : null);
        } catch (e) {
            setComponentStatus("Status: ERROR:" + e)
            console.log("logon: " + e);
        }
    };

    const sendLogoffRequest = async () => {
        try {
            if (instanceId && isLoggedon) {
                setIsLoggedon(false);
                setIsBrowserFocused(false);
                await ApiService.apiGetLogoff(instanceId);
                setIsBrowserFocused(false);
                setIsLoggedon(false);
            }
        } catch (e) {
            setComponentStatus("Status: ERROR:" + e)
            console.log("logoff: " + e);
        }
    };

    const handleVisibilityChange = () => {
        if (document.hidden || window.blur() || window.onmouseleave) {
            sendLogoffRequest();
        } else {
            sendLogonRequest();
        }
    };

    const isNull = (nullable) => {
        return nullable != null && nullable !== 'null';
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('focusout', handleVisibilityChange);

        sendLogonRequest();

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('focusout', handleVisibilityChange);
        };
    }, []);

    return (
        <div className="app-container">
            <header className="header">
                <div className="header-item"><img src="/Contextual-logo.png" alt="contextual logo"/></div>
                <div className="header-item"><h2>{APP_STRINGS.title}</h2></div>
            </header>
            <main className="main-content">
                <MousePosEventComponent apiBaseUrl={API_BASE_URL}
                                        isLoggedon={isLoggedon}
                                        isBrowserFocused={isBrowserFocused}
                                        eventGranularity={eventGranularity}
                                        eventPerBatchCount={eventPerBatchCount}
                                        instanceId={instanceId}
                />
                <ChartComponent apiBaseUrl={API_BASE_URL}
                                isLoggedon={isLoggedon}
                                isBrowserFocused={isBrowserFocused}
                                chartGranularity={chartGranularity}
                                instanceId={instanceId}
                />
            </main>
            <footer className="footer">
                <p>{APP_STRINGS.footer}</p>
            </footer>
        </div>
    );
};

export default App;
