import React from 'react'
import { Link } from 'react-router-dom'

/**
 * @function RegisterUI - Componente visual encargado del maquetado del registro
 */
const RegisterUI = ({_nombreInput, nombre, _apellidoInput, apellido, _edadInput, edad, _emailInput, email, _passwordInput, password, remember, setRemember, _registerRequest}) => {
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

export default RegisterUI