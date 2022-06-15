import { api } from '../config'
import Swal from 'sweetalert2'

/**
 * @class Books Data manager para hacer las peticiones y manejar errores en la api de los libros
 */
class Books {
    /**
     * @function getAllBooks - Peticion para obtener todos los libros del catálogo
     * @param { String } token - token necesario para realizar las peticiones
     * @returns { Object } response - respuesta de la api
     */
    async getAllBooks (token) {
        try {
            let request = await fetch(`${api}/library/getAvailableBooks`, {
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

export default new Books()