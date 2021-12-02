import React, { useContext, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'

const Login = () => {

    const {setToken, setIsAuth, setIsAdmin, setUserId} = useContext(userContext)
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)


    useEffect(()=>{
        const tokenLocal = localStorage.getItem('token')
        const adminLocal = localStorage.getItem('isAdmin') === 'true'
        const userIdLocal = parseInt(localStorage.getItem('userId'),10)
        _verifyToken(tokenLocal, adminLocal, userIdLocal)
        // eslint-disable-next-line
    },[])

    const _verifyToken = async (token, admin, userId) => {
        
        try {
            let request = await fetch(`${api}/library/verifyToken`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setToken(token)
                setIsAuth(true)
                setIsAdmin(admin)
                setUserId(userId)
                history.push('/getBooks')
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Error al cargar la sesión',
            })
        }
    }

    const _emailInput = (e) => {
        setEmail(e.target.value)
    }

    const _passwordInput = (e) => {
        setPassword(e.target.value)
    }

    const _loginRequest = async () => {
        let userData = {
            email,
            password
        }
        try {
            let request = await fetch( `${api}/loginSession`,{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            let response = await request.json()
            if(await response.success){
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito!',
                    text: 'Has iniciado sesión correctamente',
                })
                setToken(response.token)
                setIsAuth(response.success)
                setIsAdmin(response.items[0].Administrador)
                setUserId(response.items[0].Id_Usuario)
                if(remember){
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('isAuth', response.success)
                    localStorage.setItem('isAdmin', response.items[0].Administrador)
                    localStorage.setItem('userId', response.items[0].Id_Usuario)
                }
                history.push('/getBooks')
            }else{
                if(response.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Algo salió mal',
                        text: response.error,
                    })
                }else{
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

    return (
        <div className="container is-max-widescreen">
            <br /><br /><br />
            <div className="field">
                <label className="label">Correo electrónico</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Correo" onChange={_emailInput} value={email}/>
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
                        <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)}/>
                        &nbsp; Recuerdame
                    </label>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={_loginRequest}>Iniciar sesión</button>
                </div>
                <div className="control">
                    <Link to="/register" className="button is-link is-light">Registrarme</Link>
                </div>
            </div>

        </div>
    )
}

export default Login
