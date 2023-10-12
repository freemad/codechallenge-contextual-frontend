
export const ChartDataModel = {
    labels: [],
    datasets: [],
};

export const CHartDatasetModel = {
    label: "",
    borderColor: "",
    backgroundColor: "",
    fill: true,
    tension: 0,
    data: [],
}

export function generateChartConfig(chartDatasetModels) {
    const chartDataConfig = { ...ChartDataModel };

    // Customize the chartDataConfig as needed
    for (let i = 0; i < chartDatasetModels.length; i++ ) {
        chartDataConfig.datasets.push(
            {
                id: i,
                label: chartDatasetModels[i].label,
                borderColor: chartDatasetModels[i].borderColor,
                backgroundColor: chartDatasetModels[i].backgroundColor,
                fill: chartDatasetModels[i].fill,
                tension: chartDatasetModels[i].tension,
                data: [],
            }
        );
    }

    return chartDataConfig;
}
