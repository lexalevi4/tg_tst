import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
                ),

                getClusterFlats: build.query({
                    query: (search ) => ({
                        url: 'get-cluster-flats',
                        method: "POST",
                        body:
                        {
                            // cluster: cluster,
                            search: search,
                            tg_data: window.Telegram.WebApp.initData || null
                        }

                    })
                }
                ),


                getFlatById: build.query({
                    query: (id) => ({
                        url: 'get-flat-by-id',
                        method: "POST",
                        body:
                        {
                            id: id,
                            tg_data: window.Telegram.WebApp.initData || null
                        }
                    })
                }
                ),

                GenerateReportPlot: build.query({
                    query: (plot_data) => ({
                        url: 'generate-plot',
                        method: "POST",
                        body:
                        {
                            plot_data: plot_data,
                            tg_data: window.Telegram.WebApp.initData || null
                        }

                    })
                })
            })
        }
    )

export const { useGetFlatsQuery, useGenerateReportPlotQuery, useGetClusterFlatsQuery, useGetFlatByIdQuery } = PyxiApi;