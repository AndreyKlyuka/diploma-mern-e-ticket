import React, { useContext } from 'react'
import { HallBuy } from '../components/HallBuy'
import { AuthContext } from '../context/AuthContext'

export const EventCard = ({ event }) => {
    const auth = useContext(AuthContext)

    return (
        <>
            <div className="row">
                <div className="col s12 m5 l6">
                    <h2>{event.description.eventName}</h2>
                    <img src="/img/1.jpg" alt="" />
                    <h4>{event.description.about}</h4>
                </div>
                <div className="col s12 m7 l6">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <i className="material-icons">map</i>
                                </th>
                                <th>
                                    <i className="material-icons">
                                        calendar_month
                                    </i>
                                </th>
                                <th>
                                    <i className="material-icons">payment</i>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td> {event.description.location}</td>
                                <td>
                                    {event.description.time}
                                    <br />
                                    {event.description.date}
                                </td>
                                <td>{event.description.price} uah</td>
                            </tr>
                        </tbody>
                    </table>
                    {auth.token && <HallBuy event={event} />}
                    {!auth.token && (
                        <div>
                            <center>
                                <h3>Login to book tickets</h3>
                            </center>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
