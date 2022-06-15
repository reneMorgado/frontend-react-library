import React from 'react'
import { Link } from 'react-router-dom'

/**
 * @function LoginUI - Componente visual encargado del maquetado del login
 */
const LoginUI = ({_emailInput, email, _passwordInput, password, remember, setRemember, _loginRequest}) => {
    return (
        <div className="container is-max-widescreen">
            <br /><br /><br />
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
                    <button className="button is-link" onClick={_loginRequest}>Iniciar sesión</button>
                </div>
                <div className="control">
                    <Link to="/register" className="button is-link is-light">Registrarme</Link>
                </div>
            </div>

        </div>
    )
}

export default LoginUI