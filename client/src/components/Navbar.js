import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import M from 'materialize-css'

export const Navbar = () => {
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
    }

    const showLoginModal = (event) => {
        const modal = document.getElementById('loginModal')
        modal.classList.toggle('card-custom_change')
    }

    useEffect(() => {
        let sidenav = document.querySelector('.sidenav')
        M.Sidenav.init(sidenav, {})
    }, [])

    if (auth.isAuthenticated) {
        return (
            <>
                <nav className="navigation">
                    <div className="container">
                        <NavLink to="/main" className="brand-logo">
                            E-ticket
                        </NavLink>

                        <a
                            href="#!"
                            data-target="slide-out"
                            className="sidenav-trigger"
                        >
                            <i className="fas fa-bars"></i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                            <li>
                                <NavLink to="/create">Create event</NavLink>
                            </li>
                            <li>
                                <NavLink to="/profile">Profile</NavLink>
                            </li>
                            <li>
                                <a href="/..." onClick={logoutHandler}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img
                                    src="https://picsum.photos/id/715/400/400"
                                    alt="bg"
                                />
                            </div>
                            <a href="#user">
                                <img
                                    className="circle"
                                    src="https://picsum.photos/id/1033/70"
                                    alt="user"
                                />
                            </a>
                            <a href="#name">
                                <span className="white-text name"></span>
                            </a>
                            <a href="#email">
                                <span className="white-text email"></span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/events" className={'sidenav-close'}>
                            <i className="material-icons">local_activity</i>
                            Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create" className={'sidenav-close'}>
                            <i className="material-icons">add_circle</i>
                            Create event
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={'sidenav-close'}>
                            <i className="material-icons">calendar_month</i>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <div className="divider"></div>
                    </li>
                    <li>
                        <a href="#!" className="subheader">
                            About us
                        </a>
                    </li>
                    <li>
                        <div className="divider"></div>
                    </li>
                    <li>
                        <a
                            className="sidenav-close"
                            href="#!"
                            onClick={logoutHandler}
                        >
                            <i className="material-icons">logout</i>
                            Logout
                        </a>
                    </li>
                </ul>
            </>
        )
    }
    if (!auth.isAuthenticated) {
        const style = {
            navDisabled: {
                color: 'rgba(255, 255, 255, 0.5)',
            },
            navLSideDisabled: {
                color: 'rgba(0, 0, 0, 0.3)',
            },
        }

        return (
            <div>
                <nav className="navigation">
                    <div className="container">
                        <NavLink to="/" className="brand-logo">
                            E-ticket
                        </NavLink>

                        <a
                            href="#!"
                            data-target="slide-out"
                            className="sidenav-trigger"
                        >
                            <i className="fas fa-bars"></i>
                        </a>
                        <ul className="right hide-on-med-and-down">
                            <li>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                            <li>
                                <NavLink style={style.navDisabled} to="/">
                                    Create event
                                </NavLink>
                            </li>
                            <li>
                                <NavLink style={style.navDisabled} to="/">
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" onClick={showLoginModal}>
                                    Login
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img
                                    src="https://picsum.photos/id/715/400/400"
                                    alt="bg"
                                />
                            </div>
                            <a href="#user">
                                <img
                                    className="circle"
                                    src="https://picsum.photos/id/1033/70"
                                    alt="user"
                                />
                            </a>
                            <a href="#name">
                                <span className="white-text name"></span>
                            </a>
                            <a href="#email">
                                <span className="white-text email"></span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <NavLink to="/events" className={'sidenav-close'}>
                            <i className="material-icons">local_activity</i>
                            Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            style={style.navLSideDisabled}
                            to="/create"
                            className={'sidenav-close'}
                        >
                            <i className="material-icons">add_circle</i>
                            Create event
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            style={style.navLSideDisabled}
                            to="/booked/:id"
                            className={'sidenav-close'}
                        >
                            <i className="material-icons">
                                account_circle_full
                            </i>
                            Profile
                        </NavLink>
                    </li>
                    <li>
                        <div className="divider"></div>
                    </li>
                    <li>
                        <NavLink
                            className="sidenav-close"
                            to="/"
                            onClick={showLoginModal}
                        >
                            <i className="material-icons">login</i>
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
}
