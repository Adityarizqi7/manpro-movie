import React, { Children } from "react"
import LightboxFs from 'fslightbox-react'

export default function Lightbox({source, children, toggler}) {

    return (
        <>
            {children}
            <LightboxFs
				toggler={toggler}
				sources={source}
			/>
        </>
    )
}