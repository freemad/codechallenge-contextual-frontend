import React, {useEffect, useState} from 'react';
import ApiService from "../services/ApiService";

const MousePosEventComponent = ({
                                    apiBaseUrl,
                                    eventGranularity,
                                    eventPerBatchCount,
                                    isLoggedon,
                                    instanceId,
                                    isBrowserFocused,
                                }) => {
    const [componentStatus, setComponentStatus] = useState("");
    let data = [];
    let lastMovement;

    const handleMouseMove = (event) => {
        const timeObj = new Date();
        if (lastMovement) {
            if (new Date() - lastMovement > eventGranularity) {
                lastMovement = new Date();
                data.push({
                    x: event.clientX,
                    y: event.clientY,
                    time: timeObj
                });
            }
        } else {
            lastMovement = new Date();
            data.push({
                x: event.clientX,
                y: event.clientY,
                time: timeObj
            });
        }

        if (data.length === eventPerBatchCount) {
            try {
                let sendingData = [...data];
                data = []
                if (instanceId && isLoggedon && isBrowserFocused) {
                    return ApiService.apiPostEvents(instanceId, sendingData);
                }
            } catch (e) {
                setComponentStatus("Status: " + "ERROR:" + e)
                console.log(componentStatus);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [
        apiBaseUrl,
        eventGranularity,
        eventPerBatchCount,
        isLoggedon,
        instanceId,
        isBrowserFocused,
    ]);

    return (
        <div/>
    );
};

export default MousePosEventComponent;
