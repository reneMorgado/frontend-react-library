import React, { useContext, useState, useEffect } from 'react'
import RentAdminCard from '../components/RentAdminCard'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'

const AllRents = () => {
       
    const [rentas, setRentas] = useState([])

    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    useEffect(()=>{
        _getRentsRequest()
        // eslint-disable-next-line
    },[])

    const _getRentsRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getRents`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (response.success) {
                setRentas(response.items)
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
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Error de servidor',
            })
        }
    }

    return (
        <div className="container is-max-desktop">
            <h2 className="Catalog-Title title is-2 ">Libros rentados actualmente</h2>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap is-justify-content-center Catalog ">
                {rentas.length > 0 ?
                    rentas.map((rent)=>(<RentAdminCard key={Math.random()} rent={rent}/>))
                :
                    <div className="notification is-danger">
                        No se han encontrado rentas en curso
                    </div>
                }
            </div>
        </div>
    )
}

export default AllRents
