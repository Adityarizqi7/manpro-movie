import React from "react"
import LightGallery from 'lightgallery/react';

import 'lightgallery/scss/lightgallery-bundle.scss';

export default function Lightbox({children, ...plugins}) {

    return (
        <LightGallery
            speed={500}
            mode="lg-fade"
            plugins={[...plugins]}
            download={true}
        >
            {children}
        </LightGallery>
    )
}
