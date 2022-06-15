import { api } from '../config'
import Swal from 'sweetalert2'

/**
 * @class Users Data manager para hacer las peticiones y manejar errores en la api de los usuarios
 */
class Users {
    /**
     * @function getUsernameById - Peticion para obtener todos los autores registrados
     * @param { String } token - token necesario para realizar las peticiones
     * @param { Number } id - id del usuario
     * @returns { Object } response - respuesta de la api
     */
    async getUsernameById (token, id) {
        try {
            let request = await fetch(`${api}/library/getUserNameById/${id}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                const [justName] = response.name.split(' ')
                return justName
            } else {
                if (response.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'La sesión ha expirado',
                        text: 'Vuelva a iniciar sesión',
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Algo salió mal',
                        text: 'Error de servidor',
                    })
                }
                return false
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Error de servidor',
            })
            return false
        }

        
    }

    /**
     * @function verifyToken - Peticion para verificar el usuario guardado el localstorage
     * @param { String } token - token necesario para realizar las peticiones
     * @param { Boolean } admin - si el usuario es administrador o no
     * @param { Number } userId - id del usuario a verificar
     * @returns { Object } response - respuesta de la api
     */
    async verifyToken (token, admin, userId) {
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
                return { token, auth: true, admin, userId }
            }else{
                return { token: false, auth: false, admin: false, userId: false }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Error al cargar la sesión',
            })
            return { token: false, auth: false, admin: false, userId: false }
        }
    }

    /**
     * @function loginUser - Peticion para iniciar la sesión de un usuario
     * @param { String } email - email del usuario
     * @param { String } userId - contraseña del usuario 
     * @param { Boolean } remember - Para guardar al usuario en localstorage o no
     * @returns { Object } response - respuesta de la api
     */
    async loginUser (email,password, remember) {
        let userData = {
            email,
            password
        }
        try {
            let request = await fetch(`${api}/loginSession`, {
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
                    text: 'Has iniciado sesión correctamente',
                })
                if (remember) {
                    localStorage.setItem('token', response.token)
                    localStorage.setItem('isAuth', response.success)
                    localStorage.setItem('isAdmin', response.items[0].Administrador)
                    localStorage.setItem('userId', response.items[0].Id_Usuario)
                }
                return { token: response.token, auth: response.success, admin: response.items[0].Administrador, userId: response.items[0].Id_Usuario }
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
                return { token: false, auth: false, admin: false, userId: false }
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Error de servidor',
            })
            return { token: false, auth: false, admin: false, userId: false }
        }
    }

    /**
     * @function registerUser - Peticion para hacer el registro de un usuario
     * @param { String } nombre - nombre del usuario
     * @param { String } apellido - apellido del usuario
     * @param { Number } edad - edad del usuario
     * @param { String } email - email del usuario
     * @param { String } password - password del usuario 
     * @param { Boolean } remember - Para guardar al usuario en localstorage o no
     * @returns { Object } response - respuesta de la api
     */
    async registerUser (nombre, apellido, edad, email, password, remember) {
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
                    if (remember) {
                        localStorage.setItem('token', response.token)
                        localStorage.setItem('isAuth', response.success)
                        localStorage.setItem('isAdmin', response.created.Administrador)
                        localStorage.setItem('userId', response.created.Id_Usuario)
                    }
                    return { token: response.token, auth: response.success, admin: response.created.Administrador, userId: response.created.Id_Usuario }
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
                    return { token: false, auth: false, admin: false, userId: false }
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salió mal',
                    text: 'Error de servidor',
                })
                return { token: false, auth: false, admin: false, userId: false }
            }
        }
    }
}

export default new Users()