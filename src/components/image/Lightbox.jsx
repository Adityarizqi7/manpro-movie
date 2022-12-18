import React from "react"
import LightboxYet from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
// import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
// import "yet-another-react-lightbox/plugins/captions.css";

export default function Lightbox({source, children, openFunc, closeFunc}) {

    return (
        <>
            {children}
            <LightboxYet
				open={openFunc}
				close={closeFunc}
				slides={source}
                plugins={[Video]}
			/>
        </>
    )
}