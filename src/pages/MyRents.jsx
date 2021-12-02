import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import RentCard from '../components/RentCard'
import { api } from '../config'
import { userContext } from '../context/userContext'

const MyRents = () => {

    const [rents, setRents] = useState([])

    const { userId, token, setIsAuth, setIsAdmin, setToken, setUserId } = useContext(userContext)

    useEffect(() => {
        _getRentsRequest()
        // eslint-disable-next-line
    }, [])

    const _getRentsRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getRentsByUser/${userId}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            const response = await request.json()
            if (await response.success) {
                setRents(response.items)
            } else {
                if (response.error) {
                    setIsAuth(false)
                    setIsAdmin(false)
                    setToken('')
                    setUserId('')
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
            }
        } catch (error) {

        }
    }

    const _returnBookRequest = async(renta, libro) => {
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
                _getRentsRequest()
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

    return (
        <div className="container is-max-desktop">
            <h2 className="Catalog-Title title is-2 ">Mis rentas</h2>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
                {rents.length > 0 ? 
                    rents.map((rent)=>(<RentCard key={Math.random()} rent={rent} _returnBookRequest={_returnBookRequest}/>))
                :
                    <div className="notification is-danger">
                        No tienes rentas registradas!
                    </div>   
            }
            </div>
            
         </div>
    )
}

export default MyRents
