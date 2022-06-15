import { api } from '../config'
import Swal from 'sweetalert2'

/**
 * @class Genders Data manager para hacer las peticiones y manejar errores en la api de los generos
 */
class Genders {
    /**
     * @function getAllGenders - Peticion para obtener todos los autores registrados
     * @param { String } token - token necesario para realizar las peticiones
     * @returns { Object } response - respuesta de la api
     */
    async getAllGenders (token) {
        try {
            let request = await fetch(`${api}/library/getGenders`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                return response.items
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
}

export default new Genders()