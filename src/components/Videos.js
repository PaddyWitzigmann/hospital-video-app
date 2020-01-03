import React from 'react'

export default function Videos({ VideoPath, id, style }) {

    return (
        <div style={style}>
            <video
            id={id}
            src={VideoPath}
            width="100%"
            height="100%" 
            />
        </div>
    )
}
