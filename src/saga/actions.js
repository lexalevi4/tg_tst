import { action, action_with_payload } from "../store/index";

export const generateReportPlot = () => { action('GetReportPlot') };
export const getStatPlot = () => { action('GetStatPlot') };
export const stopStatPlot = () => { action('CancelStatPlot') };
export const getMapPointClick = () => { action('GetMapPointClick') };
export const cancelMapPointClick = () => { action('CancelMapPointClick') };



// export const updateDistrict = (id) => { action_with_payload('UpdateDistrict', id) }
// export const updateDistrict = (id) => ({ type: 'UpdateDistrict', id });
export const updateOkrug = () => { action('UpdateOkrug') }
// export const updateDistrict = () => { action('UpdateDistrict') }

// export const updateDistrict = (id) => ({ type: 'UpdateDistrict', id });


// export const updateDistrict = (id) => ({ type: REQUEST_WEATHER, cityName });
export const updateDistrict = (id) => {
    return { type: 'UpdateDistrict', action: id }
};


export const updateMetro = (id) => {
    return { type: 'UpdateMetro', action: id }
};

export const universalPaload = (type, id) => { action_with_payload(type, id) }

// export const GetMapPointClick = (params) => {
//     return { type: 'GetMapPointClick', action: params }
// };

export const CancelMapPointClick = () => { action('CancelMapPointClick') };