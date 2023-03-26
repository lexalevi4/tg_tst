import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchFlats = createAsyncThunk(
    'mapFlats/fetchFlats',
    async function (ids, { dispatch, rejectWithValue }) {
        try {
            const response = await fetch('https://pyxi.pro/tg-web-app/get-flats-by-id?ids=' + ids);
            if (!response.ok) {
                throw new Error('Server Error!');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}


// const getStations = () => {
//
//     fetch('https://pyxi.pro/tg-web-app/get-metro').then(
//         res => res.json()
//     ).then(
//         data => data
//     )
//
//
// }


const serialize = function (obj, prefix) {
    var str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    // let mid =str.join("&")
    return str.join("&")
}

const MapFlatsSlice = createSlice(
    {
        name: 'mapFlats',
        initialState: {
            app_params: {
                price_desc_modal_open: false,
                flat_modal_open: false,
                report_plot_open: false,
                stat_plot_open: false,
                flat_id: null,
                report_plot_request: {
                    id: null,
                    x: null,
                    hue: null,
                    district: null,
                    okrug: null,
                },
                report_plot: {
                    status: 'none',
                    img: '',
                    plot_data: {}
                },
                stat_plot: {},
                stat_plot_request: {
                    id: null,
                    x: null,
                    hue: null,
                    district: null,
                    okrug: null,
                },

            },
            flats: [],
            status: null,
            error: null,
            search: {
                page: 1,
                cat: 1,
                rooms: [],
                metro: [],
                to_metro: [],
                brunches: [],
                districts: [],
                okrugs: [],
                addrobjs: [],
                material: [],
                price_type: [],
                floor_types: [],
                year_build_type: [],
                floors_type: [],
                floors_count_type: [],
                min_price: '',
                max_price: '',
                min_total_area: '',
                max_total_area: '',
                min_living_area: '',
                max_living_area: '',
                min_kitchen_area: '',
                max_kitchen_area: '',
                min_floor: '',
                max_flour: '',
                floor_type: '',
                min_floors_count: '',
                max_floors_count: '',
                min_year_build: '',
                max_year_build: '',
                including_null_years: 1,
                update: 0

            },
            params: {
                brunches: [],
                metro: [],
                districts: [],
                to_metro: [
                    { val: 1, title: 'До 5 минут' },
                    { val: 2, title: 'До 10 минут' },
                    { val: 3, title: 'До 15 минут' },
                    { val: 4, title: 'До 20 минут' },

                ],
                rooms: [
                    { val: 200, title: 'Студия' },
                    { val: 1, title: '1к' },
                    { val: 2, title: '2к' },
                    { val: 3, title: '3к' },
                    { val: 4, title: '4+к' },
                ],
                cats: [
                    { val: 1, title: 'Вторичка' },
                    { val: 2, title: 'Аренда' },
                    { val: 3, title: 'Новостройки' },
                ],
                floor_types: [
                    { val: 1, title: "Любой" },
                    { val: 2, title: "Средний" },
                    { val: 3, title: "Не первый" },
                    { val: 4, title: "Не последний" },
                    { val: 5, title: "Первый" },
                    { val: 6, title: "Последний" },
                ],
                floors_count_types: [
                    { val: 1, title: "До 5 этажей" },
                    { val: 2, title: "6-10 этажей" },
                    { val: 3, title: "11-15 этажей" },
                    { val: 4, title: "16-17 этажей" },
                    { val: 5, title: "18-25 этажей" },
                    { val: 6, title: "26-35 этажей" },
                    { val: 7, title: "36+ этажей" },
                ],
                material_types: [
                    { val: 1, title: "Кирпич" },
                    { val: 2, title: "Панель" },
                    { val: 3, title: "Монолит" },
                    { val: 4, title: "Монолит-кирпич" },
                    { val: 5, title: "Блочный" },

                ],
                year_types: [
                    { val: 1, title: "До 1980" },
                    { val: 2, title: "1981-1999" },
                    { val: 3, title: "2000-2009" },
                    { val: 4, title: "2010-2019" },
                    { val: 5, title: "От 2020" },
                    { val: 6, title: "Не указано" },

                ],
                price_type: [
                    { val: 1, title: "Базнадёга" },
                    { val: 2, title: "Высокие" },
                    { val: 3, title: "Средние" },
                    { val: 4, title: "Ниже среднего" },
                    { val: 5, title: "Дно рынка" },
                ]

            },
            query_string: 'cat=1',
        },
        reducers: {
            updateSearch(state, action) {
                state.search[action.payload.field] = action.payload.value
            },
            updateAppParam(state, action) {
                console.log(action)
                state.app_params[action.payload.field] = action.payload.value
            },
            addFlats(state, action) {
                // console.log(action)
                state.flats = [];
                state.flats = [
                    ...action.payload.flats
                ];
                // console.log(state.flats.length);
                // console.log(state.flats);
            },
            cleanFlats(state, action) {
                state.flats = [];
            },
            setInitialStations(state, action) {
                state.params.metro = action.payload
                // setQueryString()
            },
            setInitialBrunches(state, action) {
                state.params.brunches = action.payload
                // setQueryString()
            },
            setInitialDistricts(state, action) {
                state.params.districts = action.payload
                // setQueryString()
            },
            setQueryString(state, action) {
                state.query_string = serialize(action.payload)
                console.log(state.query_string)
            }
        },

        extraReducers: {
            [fetchFlats.pending]: (state) => {
                state.status = 'loading';
                state.error = null;
            },
            [fetchFlats.fulfilled]: (state, action) => {
                state.status = 'resolved';
                state.flats = action.payload;
            },
            [fetchFlats.rejected]: setError,
        }
    }
);

export const {
    addFlats,
    cleanFlats,
    updateSearch,
    updateAppParam,
    setInitialStations,
    setInitialBrunches,
    setInitialDistricts,
    setQueryString,


} = MapFlatsSlice.actions;
export default MapFlatsSlice.reducer;