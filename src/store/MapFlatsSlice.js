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
                report_flat:{ id: 0 },
                fav_count: 0,
                user: { id: 0 },
                price_desc_modal_open: false,
                flat_modal_open: false,
                report_plot_open: false,
                stat_plot_open: false,
                flat_id: null,
                map_flats: [],
                map_flats_status: 'pending',
                map_flats_request: { type: 'point', id: 0 },
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
                stat_plot: {
                    status: 'none',
                },
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
                fav_page: 1,
                page: 1,
                cat: 1,
                rooms: [],
                metro: [],
                to_metro: 0,
                brunches: [],
                districts: [],
                okrugs: [],
                // addrobjs: [],
                material: [],
                price_type: [],
                floor_types: [],
                year_build_type: [],
                // floors_type: [],
                floors_count_type: [],
                min_price: '',
                max_price: '',
                min_total_area: '',
                max_total_area: '',
                // min_living_area: '',
                // max_living_area: '',
                min_kitchen_area: '',
                max_kitchen_area: '',
                min_floor: '',
                max_floor: '',
                floor_type: 0,
                src: [1, 2],
                plan: [],
                isApartment: 2,
                isByHomeowner: 2,
                // min_floors_count: '',
                // max_floors_count: '',
                // min_year_build: '',
                // max_year_build: '',
                // including_null_years: 1,
                update: 0

            },
            params: {
                brunches: [],
                metro: [],
                districts: [],

                srcs: [
                    { val: 1, title: 'Cian' },
                    { val: 2, title: 'Avito' },
                ],

                isApartment: [
                    { val: 2, title: 'Не важно' },
                    { val: 1, title: 'Да' },
                    { val: 0, title: 'Нет' },

                ],
                isByHomeowner: [
                    { val: 2, title: 'Не важно' },
                    { val: 1, title: 'Да' },
                    { val: 0, title: 'Нет' },
                ],
                plans: [
                    { val: 1, title: 'Изолированная' },
                    { val: 2, title: 'Смежная' },
                    { val: 3, title: 'Смежно-изолированная' },
                ],
                to_metro: [
                    { val: 0, title: '' },
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
                    { val: 0, title: '' },
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
                    { val: 3, title: "Панель" },
                    { val: 2, title: "Монолит" },
                    { val: 5, title: "Монолит-кирпич" },
                    { val: 4, title: "Блочный" },

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
                    { val: 5, title: "Высокие", color: '#595959' },
                    { val: 4, title: "Выше среднего", color: '#0E4779' },
                    { val: 3, title: "Средние", color: '#1BAD03' },
                    { val: 2, title: "Ниже среднего", color: '#ED4543' },
                    { val: 1, title: "Дно рынка", color: '#B51EFF' },
                ]

            },
            query_string: 'cat=1',
        },
        reducers: {
            updateSearch(state, action) {
                if (action.payload.field !== 'update') {
                    state.search.update = Date.now()
                }

                if (action.payload.field !== 'page') {
                    state.search.page = 1
                }

                state.search[action.payload.field] = action.payload.value
            },
            updateAppParam(state, action) {
                // console.log(action)
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
            // setInitialUser(state, action) {
            //     state.params.user = action.payload
            //     // setQueryString()
            // },
            setQueryString(state, action) {
                state.query_string = serialize(action.payload)
                // console.log(state.query_string)
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