import React, { useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import UserAdminCard from '../components/UserAdminCard'
import { api } from '../config'
import { userContext } from '../context/userContext'

const AllUsers = () => {
       
    const [users, setUsers] = useState([])

    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    useEffect(()=>{
        _getUsersRequest()
        // eslint-disable-next-line
    },[])

    const _getUsersRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getUsers`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                } 
            })
            let response = await request.json()
            if (await response.success) {
                setUsers(response.items)
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
            <h2 className="Catalog-Title title is-2 ">Panel de administración de los Usuarios</h2>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap Catalog ">
                {users.length > 0 ?
                    users.map((user)=>(<UserAdminCard key={Math.random()} user={user} _getUsersRequest={_getUsersRequest}/>))
                :
                    <div className="notification is-danger">
                        No se han encontrado usuarios
                    </div>
                }
            </div>
        </div>
    )
}

export default AllUsers
