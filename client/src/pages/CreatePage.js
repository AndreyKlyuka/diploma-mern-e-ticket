import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { Navplug } from '../components/Navplug'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { HallShow } from '../components/HallShow'

export const CreatePage = () => {
    const history = useNavigate()
    const auth = useContext(AuthContext)
    const { request, loading } = useHttp()
    const [eventInfo, setEventInfo] = useState({
        eventName: '',
        date: '',
        time: '',
        location: '',
        about: '',
        price: '',

        hasHall: false,
        width: 5,
        seats: '',
    })

    const createHandler = async () => {
        try {
            const data = await request(
                '/api/event/create-event',
                'POST',
                { eventInfo },
                { Authorization: `Bearer ${auth.token}` }
            )
            history(`/event/${data.event.link}`)
        } catch (e) {}
    }
    const changeHandler = (event) => {
        setEventInfo({ ...eventInfo, [event.target.name]: event.target.value })

        if (event.target.name === 'hasHall') {
            setEventInfo({
                ...eventInfo,
                [event.target.name]: event.target.checked,
            })
        }
    }

    return (
        <div className="page">
            {loading ? <Loader /> : <Navplug />}
            <div className="container">
                <div className="row">
                    <div className="col s12 m10 l8 offset-m1 offset-l2 ">
                        <center>
                            <h2>Create Page</h2>
                        </center>

                        <div className="input-field">
                            <input
                                autoComplete="off"
                                id="eventName"
                                type="text"
                                name="eventName"
                                className="input-color"
                                value={eventInfo.eventName}
                                onChange={changeHandler}
                            />
                            <label htmlFor="eventName">Event</label>
                        </div>
                        <div className="input-field">
                            <input
                                autoComplete="off"
                                id="date"
                                type="date"
                                name="date"
                                className="input-color"
                                value={eventInfo.date}
                                onChange={changeHandler}
                            />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="input-field">
                            <input
                                autoComplete="off"
                                id="time"
                                type="time"
                                name="time"
                                className="input-color"
                                value={eventInfo.time}
                                onChange={changeHandler}
                            />
                            <label htmlFor="time">Time</label>
                        </div>

                        <div className="input-field">
                            <input
                                autoComplete="off"
                                id="location"
                                type="text"
                                name="location"
                                className="input-color"
                                value={eventInfo.location}
                                onChange={changeHandler}
                            />
                            <label htmlFor="location">Location</label>
                        </div>
                        <div className="input-field">
                            <input
                                autoComplete="off"
                                id="about"
                                type="text"
                                name="about"
                                className="input-color"
                                value={eventInfo.about}
                                onChange={changeHandler}
                            />
                            <label htmlFor="decsription">Description </label>
                        </div>
                        <div className="input-field">
                            <input
                                autoComplete="off"
                                id="price"
                                type="number"
                                name="price"
                                className="input-color"
                                value={eventInfo.price}
                                onChange={changeHandler}
                            />
                            <label htmlFor="price">Price (uah)</label>
                        </div>
                        <div className="input-field">
                            <input
                                autoComplete="off"
                                id="seats"
                                type="number"
                                name="seats"
                                className="input-color"
                                value={eventInfo.seats}
                                onChange={changeHandler}
                            />
                            <label htmlFor="eventName">Seats</label>
                        </div>
                        <div>
                            <label>
                                <input
                                    id="hasHall"
                                    type="checkbox"
                                    name="hasHall"
                                    value={eventInfo.hasHall}
                                    onChange={changeHandler}
                                />

                                <span style={{ color: 'black' }}>
                                    Need a hall{' '}
                                    {eventInfo.hasHall && (
                                        <span>
                                            , hall row width - {eventInfo.width}
                                        </span>
                                    )}
                                </span>
                            </label>
                        </div>
                        <div>
                            {eventInfo.hasHall && (
                                <div className="input-field">
                                    <input
                                        autoComplete="off"
                                        id="width"
                                        type="range"
                                        min="5"
                                        max={
                                            eventInfo.seats / 3 <= 18
                                                ? eventInfo.seats / 3
                                                : 18
                                        }
                                        name="width"
                                        className="input-color"
                                        value={
                                            +eventInfo.width < 5
                                                ? 5
                                                : +eventInfo.width
                                        }
                                        onChange={changeHandler}
                                    />
                                </div>
                            )}
                            {eventInfo.hasHall && (
                                <HallShow
                                    seats={eventInfo.seats}
                                    width={eventInfo.width}
                                />
                            )}
                        </div>
                        <div className="btn-container">
                            <button
                                className="btn yellow darken-3 waves-effect btn-large"
                                onClick={createHandler}
                                disabled={loading}
                            >
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
