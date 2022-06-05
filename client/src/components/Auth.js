import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const Auth = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
            message('Вход выполнен')
        } catch (e) {}
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', { ...form })
            message(data.message)
            loginHandler()
        } catch (e) {}
    }

    return (
        <div className="row login">
            <div className="col s10 m8 l6 offset-l3 offset-m2 offset-s1">
                <div className="card card-custom" id="loginModal">
                    <div className="card-content white-text">
                        <center>
                            <span className="card-title">Authorization</span>
                            <p>Log in with an existing account or register</p>
                        </center>

                        <div>
                            <div className="input-field">
                                <input
                                    autoComplete="off"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="input-auth-color"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    autoComplete="off"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="input-auth-color"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action card-action_setting">
                        <button
                            className="btn btn-orange waves-effect"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Enter
                        </button>
                        <button
                            className="btn btn-gray black-text waves-effect"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
