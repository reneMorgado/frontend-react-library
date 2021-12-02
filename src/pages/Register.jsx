import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'

const Register = () => {

    const { setToken, setIsAuth, setIsAdmin, setUserId } = useContext(userContext)
    const history = useHistory()

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [edad, setEdad] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const _nombreInput = (e) => {
        // eslint-disable-next-line
        if (/^[A-Z]+$/i.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setNombre(e.target.value)
            }
        }
    }

    const _apellidoInput = (e) => {
        // eslint-disable-next-line
        if (/^[A-Z]+$/i.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setApellido(e.target.value)
            }
        }
    }

    const _edadInput = (e) => {
        // eslint-disable-next-line
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                setEdad(e.target.value)
            }
        }
    }

    const _emailInput = (e) => {
        if (!(e.target.value.length >= 30)) {
            setEmail(e.target.value)
        }
    }

    const _passwordInput = (e) => {
        setPassword(e.target.value)
    }


    const _registerRequest = async () => {
        let userData = {
            nombre,
            apellido,
            edad: parseInt(edad, 10),
            email,
            password
        }
        // eslint-disable-next-line
        if (!(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))) {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Correo no válido',
            })
        }
        else if (nombre === '' || apellido === '' || edad <= 0 || email === '' || password === '') {
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Los campos no pueden estar vacíos',
            })
        } else {
            try {
                let request = await fetch(`${api}/addUser`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                let response = await request.json()
                if (await response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: 'Te has registrado correctamente',
                    })
                    setToken(response.token)
                    setIsAuth(response.success)
                    setIsAdmin(response.created.Administrador)
                    setUserId(response.created.Id_Usuario)
                    if (remember) {
                        localStorage.setItem('token', response.token)
                        localStorage.setItem('isAuth', response.success)
                        localStorage.setItem('isAdmin', response.created.Administrador)
                        localStorage.setItem('userId', response.created.Id_Usuario)
                    }
                    history.push('/getBooks')
                } else {
                    if (response.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Algo salió mal',
                            text: response.error,
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Algo salió mal',
                            text: 'Error de servidor',
                        })
                    }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salió mal',
                    text: 'Error de servidor',
                })
            }
        }
    }

    return (
        <div className="container is-max-widescreen">
            <br /><br /><br />

            <div className="field">
                <label className="label">Nombre</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Nombre" onChange={_nombreInput} value={nombre} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Apellido</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Apellido" onChange={_apellidoInput} value={apellido} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Edad</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Edad" onChange={_edadInput} value={edad} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-calendar-alt"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Correo electrónico</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Correo" onChange={_emailInput} value={email} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <label className="label">Contraseña</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="password" placeholder="Contraseña" onChange={_passwordInput} value={password} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                        &nbsp; Recuerdame
                    </label>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={_registerRequest}>Registrarme</button>
                </div>
                <div className="control">
                    <Link to="/login" className="button is-link is-light">¿Ya tienes un usuario? Inicia sesión</Link>
                </div>
            </div>

        </div>
    )
}

export default Register
