import FlatList from "./FlatList";
import {React} from "react";

const MapOffcanvas = function () {
    return (
        <div>
            <div>
                <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false"
                     tabIndex="-1"
                     id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Colored with scrolling</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <p>Try scrolling the rest of the page to see this option in action.</p>
                        <FlatList/>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default MapOffcanvas