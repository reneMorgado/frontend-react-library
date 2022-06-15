import { api } from '../config'
import Swal from 'sweetalert2'

/**
 * @class Rents Data manager para hacer las peticiones y manejar errores en la api de las rentas
 */
class Rents {
    /**
     * @function getRentsByUser - Peticion para obtener las rentas de un usuario
     * @param { String } token - token necesario para realizar las peticiones
     * @param { Number } id - id del usuario para obtener rentas
     * @returns { Object } response - respuesta de la api
     */
    async getRentsByUser (token, id) {
        try {
            let request = await fetch(`${api}/library/getRentsByUser/${id}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            const response = await request.json()
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

    /**
     * @function deleteRent - Peticion para eliminar una renta de un usuario
     * @param { String } token - token necesario para realizar las peticiones
     * @param { Number } id - id de la renta
     * @param { Number } id - id del libro
     * @returns { Object } response - respuesta de la api
     */
    async deleteRent (token, renta, libro){
        try {
            const bookBody = {
                libro
            }
            let request = await fetch(`${api}/library/deleteRent/${renta}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                },
                body: JSON.stringify(bookBody)
            })
            let response = await request.json()
            if (await response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    text: 'Se ha regresado el libro de manera satisfactoria',
                })
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

export default new Rents()