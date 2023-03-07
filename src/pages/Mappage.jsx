import FullMap from "../compontents/FullMap";
import {YMaps} from "@pbe/react-yandex-maps";

const Mappage = function () {

    return (
        <div>
            <YMaps>
                <FullMap/>
            </YMaps>
        </div>
    )

}
export default Mappage;