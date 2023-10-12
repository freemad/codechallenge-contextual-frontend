import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    Filler,
    LineElement,
    Title,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {COLORS, CHART_DEFAULTS} from "../common/Constants";
import {CHART_STRINGS} from "../common/StringValues";
import ApiService from "../services/ApiService";

ChartJS.register(LineElement, Filler, Title, Legend, CategoryScale, LinearScale, PointElement);
const ChartComponent = ({
                            apiBaseUrl,
                            chartGranularity,
                            isLoggedon,
                            instanceId,
                            isBrowserFocused
                        }) => {
    const [times, setTimes] = useState([]);
    const [avgVelocities, setAvgVelocities] = useState([]);
    const [traversedDistance, setTraversedDistance] = useState([]);
    const [totalXTraveled, setTotalXTraveled] = useState([]);
    const [totalYTraveled, setTotalYTraveled] = useState([]);
    const [componentStatus, setComponentStatus] = useState("");
    let statusData = [];
    const chartAvgVelocityTraversedDistance = {
        labels: times,
        datasets: [
            {
                id: 1,
                label: CHART_STRINGS.avgVelocityLabel,
                borderColor: COLORS.borderLine1,
                backgroundColor: COLORS.backgroundLine1,
                fill: CHART_DEFAULTS.isFill,
                tension: CHART_DEFAULTS.chartTension,
                data: avgVelocities,
            },
            {
                id: 2,
                label: CHART_STRINGS.traversedDistanceLabel,
                borderColor: COLORS.borderLine2,
                backgroundColor: COLORS.backgroundLine2,
                fill: CHART_DEFAULTS.isFill,
                tension: CHART_DEFAULTS.chartTension,
                data: traversedDistance,
            }
        ],
    };
    const chartTotalXTraveledTotalYTraveled = {
        labels: times,
        datasets: [
            {
                id: 1,
                label: CHART_STRINGS.totalXTraveled,
                borderColor: COLORS.borderLine1,
                backgroundColor: COLORS.backgroundLine1,
                fill: CHART_DEFAULTS.isFill,
                tension: CHART_DEFAULTS.chartTension,
                data: totalXTraveled,
            },
            {
                id: 2,
                label: CHART_STRINGS.totalYTraveled,
                borderColor: COLORS.borderLine2,
                backgroundColor: COLORS.backgroundLine2,
                fill: CHART_DEFAULTS.isFill,
                tension: CHART_DEFAULTS.chartTension,
                data: totalYTraveled,
            }
        ],
    };

    const fetchData = async () => {

        if (apiBaseUrl && instanceId && isLoggedon && isBrowserFocused && chartGranularity) {

            try {
                const statuses = await ApiService.apiGetStatuses(instanceId, chartGranularity);
                statusData = statusData.concat(statuses);
                while (statusData.length > CHART_DEFAULTS.chartDataCount) {
                    statusData.shift();
                }
                if (statusData && statusData.length > 0) {
                    setTimes(statusData.map(row => new Date(row.time).toLocaleTimeString("UTC")))
                    setAvgVelocities(statusData.map(row => row.avg_velocity));
                    setTraversedDistance(statusData.map(row => row.traversed_distance));
                    setTotalXTraveled(statusData.map(row => row.end_x - row.start_x));
                    setTotalYTraveled(statusData.map(row => row.end_y - row.start_y));
                }
            } catch (e) {
                setComponentStatus("Status: " + "ERROR:" + e)
                console.log(componentStatus);
            }
        }
    };

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(fetchData, chartGranularity * 1000);

        return () => clearInterval(intervalId);
    }, [
        apiBaseUrl,
        chartGranularity,
        isLoggedon,
        instanceId,
        isBrowserFocused,
    ]);

    return (
        <div className="chart-container">
            <div className="chart">
                <Line
                    data={chartAvgVelocityTraversedDistance}
                    options={
                        {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                title: {
                                    display: true,
                                    color: COLORS.titleColor,
                                    text: CHART_STRINGS.chartAvgVelocityTraversedDistanceTitle
                                },
                                legend: {
                                    display: true,
                                    labels: {
                                        color: COLORS.labelColor,
                                    },
                                    position: 'bottom'
                                }
                            }
                        }
                    }/>
            </div>
            <div className="chart">
                <Line
                    data={chartTotalXTraveledTotalYTraveled}
                    options={
                        {
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                title: {
                                    display: true,
                                    color: COLORS.titleColor,
                                    text: CHART_STRINGS.chartTotalXTraveledTotalYTraveledTitle
                                },
                                legend: {
                                    display: true,
                                    labels: {
                                        color: COLORS.labelColor,
                                    },
                                    position: 'bottom'
                                }
                            }
                        }
                    }/>
            </div>
        </div>
    );
};

export default ChartComponent;
