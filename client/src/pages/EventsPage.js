import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Navplug } from '../components/Navplug'
import { Loader } from '../components/Loader'
import { Error404 } from '../components/Error404'
import { EventsCard } from '../components/EventsCard'

export const EventsPage = () => {
    const { request, loading } = useHttp()
    const [events, setEvents] = useState(null)

    const getEvents = useCallback(async () => {
        try {
            const fetcheds = await request('/api/event/', 'GET')
            setEvents(fetcheds)
        } catch (e) {}
    }, [request])

    useEffect(() => {
        getEvents()
    }, [getEvents])

    if (loading) {
        return <Loader />
    }
    if (!events) {
        return <Error404 />
    }

    return (
        <>
            <div className="page">
                {loading ? <Loader /> : <Navplug />}
                <div className="container">
                    <EventsCard events={events} />
                </div>
            </div>
        </>
    )
}
