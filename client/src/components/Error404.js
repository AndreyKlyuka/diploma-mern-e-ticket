import React from 'react'
import { Navplug } from './Navplug'

export const Error404 = () => {
    return (
        <>
            <Navplug />
            <div className="row">
                <div className="col l6 offset-l3 s12 ">
                    <img
                        style={{
                            height: '18em',
                            marginTop: '10em',
                            marginBottom: '4em',
                        }}
                        src="../img/404.svg"
                        alt=""
                    />
                </div>
            </div>
            <h3 style={{ position: 'relative', bottom: '1em' }}>
                <center>Page not found</center>
            </h3>
        </>
    )
}
