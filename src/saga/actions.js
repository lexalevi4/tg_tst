import { action } from "store";

export const generateReportPlot = () => { action('GetReportPlot') };
export const getStatPlot = () => { action('GetStatPlot') };
export const stopStatPlot = () => { action('CancelStatPlot') };