import React,{useContext, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { userContext } from '../../context/userContext'
import UsersAPI from '../../helpers/users-api-dm'
import LoginUI from './LoginUI'

/**
 * @function LoginDM - Componente funcional encargado de la lógica del login
 */
const LoginDM = () => {

    /**
     * Datos obtenidos del contexto global de la aplicación
     */
    const { setToken, setIsAuth, setIsAdmin, setUserId } = useContext(userContext)

    /**
     * Hook de react-router-dom para redirigir
     */
    const history = useHistory()

    /**
     * Estado para manejar y setear el email 
     */
    const [email, setEmail] = useState('')

    /**
     * Estado para manejar y setear la contraseña 
     */
    const [password, setPassword] = useState('')

    /**
     * Estado para manejar y setear la casilla para recordar usuario 
     */
    const [remember, setRemember] = useState(false)

    /**
     * @function useEffect - Efecto usado al cargar la página para obtener los datos necesarios
     */
    useEffect(() => {
        const tokenLocal = localStorage.getItem('token')
        const adminLocal = localStorage.getItem('isAdmin') === 'true'
        const userIdLocal = parseInt(localStorage.getItem('userId'), 10)
        _verifyUserLocalstorage(tokenLocal, adminLocal, userIdLocal)
        // eslint-disable-next-line
    }, [])

    /**
     * @function _verifyUserLocalstorage - Se encarga de loguear al usuario si los datos de la sesión guardados son correctos
     */
    const _verifyUserLocalstorage = async (token, admin, userId) => {
        const response = await UsersAPI.verifyToken(token, admin, userId)
        console.log(response)
        if(response.auth){
            setIsAdmin(response.admin)
            setToken(response.token)
            setIsAuth(response.auth)
            setUserId(response.userId)
            history.push('/getBooks')
        }
    }

    /**
     * @function _emailInput - Se encarga setear en email ingresado
     */
    const _emailInput = (e) => {
        setEmail(e.target.value)
    }

    /**
     * @function _passwordInput - Se encarga setear la pass ingresada
     */
    const _passwordInput = (e) => {
        setPassword(e.target.value)
    }

    /**
     * @function _loginRequest - Se encarga de loguear al usuario con los datos que ingresa
     */
    const _loginRequest = async () => {
        const response = await UsersAPI.loginUser(email, password, remember)
        if(response.auth){
            setIsAdmin(response.admin)
            setToken(response.token)
            setIsAuth(response.auth)
            setUserId(response.userId)
            history.push('/getBooks')
        }
    }

    return (
        <LoginUI _emailInput={_emailInput} email={email} _passwordInput={_passwordInput} 
        password={password} remember={remember} setRemember={setRemember} _loginRequest={_loginRequest}/>
    )
}

export default LoginDM