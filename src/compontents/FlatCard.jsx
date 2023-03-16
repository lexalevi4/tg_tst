import PositionsRadar from "./PositionsRadar";
import FlatImagesCarousel from "./FlatImagesCarousel";


const FlatCard = function ({flat}) {

    const positions = flat.positions;

    const positions_labels = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_district_price_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_district_price_per_meter_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_okrug_price_per_meter_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_okrug_price_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_town_price_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_town_price_per_meter_values = [null, null, null, null, null, null, null, null, null, null, null]


    const positions_values = {
        year_build_type: 'Год',
        floors_type: 'Этажность',
        material_type_str: 'Материал',
        area_type: 'Площадь',
        kitchen_type: 'Кухня',

    }

// console.log(positions)


    const positions_order = [
        ['', ''],
        ['year_build_type', ''],
        ['year_build_type', 'floors_type'],
        ['year_build_type', 'material_type_str'],
        ['year_build_type', 'area_type'],
        ['floors_type', ''],
        ['floors_type', 'area_type'],
        ['floors_type', 'material_type_str'],
        ['area_type', ''],
        ['area_type', 'material_type_str'],
        ['area_type', 'kitchen_type'],

    ];

    positions_order.map((item, index) => {
        var current_pos = positions.filter(function (e) {
            return (e.hue === item[1] && e.x === item[0])
        })
        current_pos.map((item) => {
            // console.log(item)
            // if (positions_labels[index] !== null) {
            if (index === 0) {
                positions_labels[index] = 'Вся выборка'
            } else {
                positions_labels[index] = [positions_values[item.x] + ": " + item.x_value]
                if (item.hue !== '') {
                    positions_labels[index].push(positions_values[item.hue] + ": " + item.hue_value)
                }
            }
            // }
            if (item.param === 'price') {
                if (item.depth === 'town') {
                    positions_town_price_values[index] = item.current_position;
                }
                if (item.depth === 'okrug') {
                    positions_okrug_price_values[index] = item.current_position;
                }
                if (item.depth === 'district') {
                    positions_district_price_values[index] = item.current_position;
                }
            }
            if (item.param === 'price_per_meter') {
                if (item.depth === 'town') {
                    positions_town_price_per_meter_values[index] = item.current_position;
                }
                if (item.depth === 'okrug') {
                    positions_okrug_price_per_meter_values[index] = item.current_position;
                }
                if (item.depth === 'district') {
                    positions_district_price_per_meter_values[index] = item.current_position;
                }
            }

            return true;
        })

        return true;

    })

    const data = {
        labels: positions_labels,
        town: positions_town_price_per_meter_values,
        okrug: positions_okrug_price_per_meter_values,
        district: positions_district_price_per_meter_values,
    }

    return (
        <div key={'flat' + flat.id} className="card" style={{width: '100%', marginBottom: '25px'}}>
            <div className="card-header">

                {flat.rooms}-комн
                | {flat.totalArea}/{flat.livingArea}/{flat.kitchenArea} | {flat.floor}/{flat.floorsCount}
                <br/>
                {flat.address}
                <br/>
                {Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                    currencyDisplay: 'symbol', maximumFractionDigits: 0
                }).format(flat.price)} <br/>{
                Intl.NumberFormat('ru-RU', {
                    style: 'currency',
                    currency: 'RUB',
                    currencyDisplay: 'symbol', maximumFractionDigits: 0
                }).format(
                    Math.round(flat.price / flat.totalArea))
            } / m<sup>2</sup>
            </div>
            <div className="card-body">
                <FlatImagesCarousel
                    flat={flat}
                />
                <h5 className="card-title">title</h5>
                <PositionsRadar
                    plot_data={data}
                />
            </div>
        </div>

    )


}


export default FlatCard