import React from 'react'
import {LazyLoadImage} from "react-lazy-load-image-component";

const FlatImagesCarousel = function ({flat}) {

    return(

        <div key={'carousel' + flat.id} id={'carousel' + flat.id} className="carousel slide card-img-top"
             data-bs-interval={false}
             data-bs-ride="carousel">
            <div className="carousel-inner">
                {
                    flat.images.map((image, index) => (

                        <div key={'image' + flat.id + '_' + index}
                             className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                            {/*<img src={image.full} className="d-block w-100" loading="lazy" alt={'...'}/>*/}

                            <LazyLoadImage
                                style={{
                                    minHeight: '150px'
                                }}

                                width="100%"
                                height="auto"

                                src={image.full}
                                placeholderSrc={"https://46.img.avito.st/image/1/1.F_NhQ7ayuxpP4msZQydw6KbguxzB4rk.AZvL59gH9HzX3XTjSxQ6qcn0Hhsv6aVMGUSZ_fO6Fxo"}
                            />

                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button"
                    data-bs-target={'#carousel' + flat.id} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button"
                    data-bs-target={'#carousel' + flat.id} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    )
}


export default FlatImagesCarousel