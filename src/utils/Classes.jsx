import React from 'react'

export const classes = React.memo((withCondition, ignoreCondition) => {
    return `${withCondition} ${ignoreCondition}`
})
