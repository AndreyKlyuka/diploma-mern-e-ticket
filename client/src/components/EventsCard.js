import React from 'react'
import { NavLink } from 'react-router-dom'

export const EventsCard = (events) => {
    let allEvents = events.events

    const img = 1
    return (
        <>
            <div className="row">
                {allEvents.map((event, index) => {
                    return (
                        <div key={event._id} className="col s12 m12 l6">
                            <div className="card ">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img
                                        className="activator"
                                        src={`../img/${img}.jpg`}
                                        alt="event"
                                    />
                                </div>

                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">
                                        {allEvents[index].description.eventName}
                                        <i className="material-icons right">
                                            more_vert
                                        </i>
                                    </span>
                                    <p>
                                        <NavLink
                                            to={`/event/${allEvents[index].link}`}
                                        >
                                            Visit event page
                                        </NavLink>
                                    </p>
                                </div>

                                <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">
                                        <i className="material-icons right">
                                            close
                                        </i>
                                        {allEvents[index].description.about}
                                    </span>
                                    {/* <p>
                                        {allEvents[index].description.date} at{' '}
                                        {allEvents[index].description.time} in{' '}
                                        {allEvents[index].description.location}
                                    </p> */}
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Number of seats</th>
                                                <th>Hall</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>
                                                    {allEvents[index].seats}
                                                </td>
                                                <td>
                                                    {allEvents[index]
                                                        .hasHall ? (
                                                        <i className="material-icons">
                                                            check
                                                        </i>
                                                    ) : (
                                                        <i className="material-icons">
                                                            close
                                                        </i>
                                                    )}
                                                </td>
                                                <td>
                                                    {
                                                        allEvents[index]
                                                            .description.date
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        allEvents[index]
                                                            .description.time
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        allEvents[index]
                                                            .description.price
                                                    }{' '}
                                                    uah
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
