import {createSlice} from '@reduxjs/toolkit'

const MapFlatsSlice = createSlice(
    {
        name: 'mapFlats',
        initialState: {
            flats: []
        },
        reducers: {
            addFlats(state, action) {
                console.log(action)
                // console.log(state.flats)
                state.flats = [];
                state.flats = [
                    ...action.payload.flats
                ]
                ;
                // state.flats.push(action.payload.flats);

                console.log(state.flats.length);
                console.log(state.flats);
                // console.log('qq');
            },
            cleanFlats(state, action) {
                state.flats = [];
            }
        }

    }
);

export const {addFlats, cleanFlats} = MapFlatsSlice.actions;
export default MapFlatsSlice.reducer;