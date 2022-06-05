import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { EventsPage } from './pages/EventsPage'
import { CreatePage } from './pages/CreatePage'
import { EventPage } from './pages/EventPage'
import { MainPage } from './pages/MainPage'
import { ProfilePage } from './pages/ProfilePage'

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path="/main" element={<MainPage />} />
                <Route exact path="/events" element={<EventsPage />} />
                <Route exact path="/create" element={<CreatePage />} />
                <Route path="/event/:link" element={<EventPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate replace to="/main" />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route exact path="/events" element={<EventsPage />} />
            <Route path="/event/:link" element={<EventPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    )
}
