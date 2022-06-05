import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Navplug } from '../components/Navplug'
import { Loader } from '../components/Loader'
import { EventCard } from '../components/EventCard'
import { Error404 } from '../components/Error404'

export const EventPage = () => {
    const { request, loading } = useHttp()
    const [event, setEvent] = useState(null)
    const link = useParams().link

    const getEvent = useCallback(async () => {
        try {
            const fetched = await request(`/api/event/${link}`, 'GET')
            setEvent(fetched)
        } catch (e) {}
    }, [link, request])

    useEffect(() => {
        getEvent()
    }, [getEvent])

    if (loading) {
        return <Loader />
    }

    if (!event) {
        return <Error404 />
    }

    return (
        <>
            <div className="page">
                {loading ? <Loader /> : <Navplug />}
                <div className="container">
                    <EventCard event={event} />
                </div>
            </div>
        </>
    )
}
