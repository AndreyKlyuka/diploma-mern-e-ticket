import React from 'react'
import { Auth } from '../components/Auth'

export const MainPage = () => {
    const stylesAbout = {
        marginBottom: '20px',
    }
    return (
        <>
            <header className="white-text valign-wrapper" id="header">
                <div style={{ position: 'relative' }} className="container">
                    <Auth />
                    <h1>E-ticket</h1>
                    <h4 className="white-text">Book, create, explore</h4>
                </div>
            </header>
            <main className="">
                <div className="container">
                    <div className="events">
                        <h3 className="">More about events</h3>
                        <section>
                            <div className="row">
                                <div className="col s12 m6">
                                    <div className="card hoverable">
                                        <div className="card-image">
                                            <img src="/img/1.jpg" alt="" />
                                            <span className="card-title">
                                                card title
                                            </span>
                                            <a
                                                href="#!"
                                                className="btn-floating halfway-fab waves-effect waves-light orange"
                                            >
                                                <i className="material-icons">
                                                    visibility
                                                </i>
                                            </a>
                                        </div>
                                        <div className="card-content">
                                            <p>im card</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12 m6">
                                    <div className="card hoverable">
                                        <div className="card-image">
                                            <img src="/img/1.jpg" alt="" />
                                            <span className="card-title">
                                                card title
                                            </span>
                                            <a
                                                href="#!"
                                                className="btn-floating halfway-fab waves-effect waves-light orange"
                                            >
                                                <i className="material-icons">
                                                    visibility
                                                </i>
                                            </a>
                                        </div>
                                        <div className="card-content">
                                            <p>im card</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a
                                className="orange btn pulse waves-light waves-effect"
                                href="#!"
                            >
                                See all events
                            </a>
                        </section>
                        <h3>About us</h3>
                        <section>
                            <div className="row">
                                <div
                                    className="col s12 m6 align-right valign-wrapper"
                                    style={stylesAbout}
                                >
                                    <img
                                        className="about-us-img"
                                        src="/img/1.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="col s12 m6 align-right valign-wrapper">
                                    <img
                                        className="about-us-img"
                                        src="/img/1.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="col s12 m6 align-right valign-wrapper"
                                    style={stylesAbout}
                                >
                                    <img
                                        className="about-us-img"
                                        src="/img/1.jpg"
                                        alt=""
                                    />
                                </div>

                                <div className="col s12 m6 align-right valign-wrapper">
                                    <img
                                        className="about-us-img"
                                        src="/img/1.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="section">
                                <h5 className="black-text">
                                    E-tickes gives you the ability to create
                                    your own events and sell tickets to them.{' '}
                                    <br />
                                    Kitchen workshops, pottery shows, poetry
                                    evenings - book, create, explore the world
                                    around you.
                                </h5>
                                <br />
                                <a
                                    className="orange btn pulse waves-light waves-effect"
                                    href="#!"
                                >
                                    Create own event
                                </a>
                            </div>
                        </section>
                        <h3>Services</h3>
                        <section>
                            <div className="row">
                                <div className="col s12 m4">
                                    <div className="section">
                                        <i className="fas fa-user-circle fa-3x orange-text"></i>
                                        <h4>Comfort</h4>
                                        <h5 className="black-text">
                                            Keep your tickets in one place, in
                                            your pocket.
                                        </h5>
                                    </div>
                                    <div className="divider"></div>
                                </div>
                                <div className="col s12 m4">
                                    <div className="section">
                                        <i className="fas fa-cogs fa-3x orange-text"></i>
                                        <h4>Handmade</h4>
                                        <h5 className="black-text">
                                            Simple and convenient event
                                            constructor.
                                        </h5>
                                    </div>
                                    <div className="divider"></div>
                                </div>
                                <div className="col s12 m4">
                                    <div className="section">
                                        <i className="fas fa-lightbulb fa-3x orange-text"></i>
                                        <h4>Interest</h4>
                                        <h5 className="black-text">
                                            Visit niche events you have never
                                            heard of.
                                        </h5>
                                    </div>
                                    <div className="divider"></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <footer className="page-footer orange">
                <div className="container">
                    <div className="row">
                        <div className="col s12 l6">
                            <h5>E-ticket</h5>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Eveniet, itaque.
                            </p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5>Links</h5>
                            <ul>
                                <li>
                                    <a href="#!">Home</a>
                                </li>
                                <li>
                                    <a href="#!">Events</a>
                                </li>
                                <li>
                                    <a href="#!">Create</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                        2022 Andrej Kljuka
                        <a className="right" href="#header">
                            Back to top
                        </a>
                    </div>
                </div>
            </footer>
        </>
    )
}
