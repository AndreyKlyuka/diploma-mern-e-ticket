import React, { useState, useCallback, useEffect, useContext } from 'react'
import { Navplug } from '../components/Navplug'
import { Loader } from '../components/Loader'
import { Error404 } from '../components/Error404'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
const qr = require('qrcode')

export const ProfilePage = () => {
    const auth = useContext(AuthContext)

    const { request, loading } = useHttp()
    const [tickets, setTickets] = useState()
    const [qrCode, setQrCode] = useState([])

    const styles = {
        height: '100px',
        width: '100px',
    }

    const getTickets = useCallback(async () => {
        try {
            const fetcheds = await request(
                '/api/event/show-tickets',
                'GET',
                null,
                {
                    Authorization: `Bearer ${auth.token}`,
                }
            )

            console.log(fetcheds)

            // let uniqueFetched = [...new Set(fetcheds)]
            setTickets(fetcheds)
        } catch (e) {}
    }, [request, auth])

    useEffect(() => {
        getTickets()
    }, [getTickets])

    useEffect(() => {
        if (tickets !== undefined) {
            tickets.forEach((ticket) => {
                qr.toDataURL(ticket, function (err, url) {
                    setQrCode((qrCode) => [...qrCode, url])
                })
            })
        }
    }, [tickets])

    if (loading) {
        return <Loader />
    }
    if (!tickets) {
        return <Error404 />
    }
    // console.log(url)
    return (
        <div className="page">
            {loading ? <Loader /> : <Navplug />}
            <div className="container">
                <h3>
                    <center>Your tickets</center>
                </h3>

                <table>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Event</th>
                            <th>QR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => {
                            return (
                                <>
                                    <tr key={tickets[index]}>
                                        <td>{index + 1}</td>
                                        <td>{ticket}</td>
                                        <td>
                                            <img
                                                style={styles}
                                                src={qrCode[index]}
                                                alt=""
                                            />
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
