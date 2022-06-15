import React, { useContext, useState } from 'react'
import RegisterUI from './RegisterUI'
import { useHistory } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import UsersAPI from '../../helpers/users-api-dm'

/**
 * @function RegisterDM - Componente funcional encargado de la lógica del login
 */
const RegisterDM = () => {

    /**
     * Datos obtenidos del contexto global de la aplicación
     */
    const { setToken, setIsAuth, setIsAdmin, setUserId } = useContext(userContext)

    /**
     * Hook de react-router-dom para redirigir
     */
    const history = useHistory()

    /**
     * Estado para manejar y setear el nombre 
     */
    const [nombre, setNombre] = useState('')

    /**
     * Estado para manejar y setear el apellido 
     */
    const [apellido, setApellido] = useState('')

    /**
     * Estado para manejar y setear la edad 
     */
    const [edad, setEdad] = useState(0)

    /**
     * Estado para manejar y setear el email 
     */
    const [email, setEmail] = useState('')

    /**
     * Estado para manejar y setear la contraseña 
     */
    const [password, setPassword] = useState('')

    /**
     * Estado para manejar y setear el recordar un usuario 
     */
    const [remember, setRemember] = useState(false)

    /**
     * @function _nombreInput - Se encarga de validar el nombre ingresado
     * @param { Object } e - evento del input
     */
    const _nombreInput = (e) => {
        // eslint-disable-next-line
        if (/^[A-Z]+$/i.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setNombre(e.target.value)
            }
        }
    }

    /**
     * @function _apellidoInput - Se encarga de validar el apellido ingresado
     * @param { Object } e - evento del input
     */
    const _apellidoInput = (e) => {
        // eslint-disable-next-line
        if (/^[A-Z]+$/i.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setApellido(e.target.value)
            }
        }
    }

    /**
     * @function _edadInput - Se encarga de validar la edad ingresada
     * @param { Object } e - evento del input
     */
    const _edadInput = (e) => {
        // eslint-disable-next-line
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                setEdad(e.target.value)
            }
        }
    }

    /**
     * @function _emailInput - Se encarga de validar el email ingresado
     * @param { Object } e - evento del input
     */
    const _emailInput = (e) => {
        if (!(e.target.value.length >= 30)) {
            setEmail(e.target.value)
        }
    }

    /**
     * @function _passwordInput - Se encarga de validar la contraseña ingresada
     * @param { Object } e - evento del input
     */
    const _passwordInput = (e) => {
        setPassword(e.target.value)
    }

    /**
     * @function _registerRequest - Se encarga de hacer la llamada a la petición para registrar un usuario
     */
    const _registerRequest = async () => {
        const response = await UsersAPI.registerUser(nombre, apellido, edad, email, password, remember)
        console.log(response)
        if(response.auth){
            setIsAdmin(response.admin)
            setToken(response.token)
            setIsAuth(response.auth)
            setUserId(response.userId)
            history.push('/getBooks')
        }
    }
    return (
        <RegisterUI _nombreInput={_nombreInput} nombre={nombre} _apellidoInput={_apellidoInput}
        apellido={apellido} _edadInput={_edadInput} edad={edad} _emailInput={_emailInput} email={email}
        _passwordInput={_passwordInput} password={password} remember={remember} setRemember={setRemember}
        _registerRequest={_registerRequest}/>
    )
}

export default RegisterDM