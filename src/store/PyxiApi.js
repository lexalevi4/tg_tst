import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


// const serialize = function (obj, prefix) {
//     var str = [],
//         p;
//     for (p in obj) {
//         if (obj.hasOwnProperty(p)) {
//             var k = prefix ? prefix + "[" + p + "]" : p,
//                 v = obj[p];
//             str.push((v !== null && typeof v === "object") ?
//                 serialize(v, k) :
//                 encodeURIComponent(k) + "=" + encodeURIComponent(v));
//         }
//     }
//     // let mid =str.join("&")
//     return str.join("&")
// }

export const
    PyxiApi = createApi(
        {
            reducerPath: 'PyxiApi',
            baseQuery: fetchBaseQuery({
                baseUrl: 'https://pyxi.pro/tg-web-app/',
            }),
            endpoints: (build) => ({
                getFlats: build.query({
                        query: (search) => ({
                            // url: 'get-flats?' + serialize(search).replace(/&&+/gi, '&'),
                            url: 'get-flats',
                            method: "POST",
                            body:
                                {
                                    search: search,
                                    tg_data: window.Telegram.WebApp.initData || null
                                }

                        })
                    }
                )
            })
        }
    )

export const {useGetFlatsQuery} = PyxiApi;