import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'


const UserAdminCard = ({user, _getUsersRequest}) => {
 
    const { userId, token, setIsAuth, setIsAdmin, setToken, setUserId } = useContext(userContext)

    const [deleteModal, setDeleteModal] = useState(false)
    const [rents, setRents] = useState(0)

    const _toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }

    const _getRentsRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getRentsByUser/${user.Id_Usuario}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            const response = await request.json()
            if (await response.success) {
                setRents(response.items.length)
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

    const _deleteUserRequest = async () => {
        try {
            let request = await fetch(`${api}/library/deleteUser/${user.Id_Usuario}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            
            let response = await request.json()
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    text: 'Se ha eliminado el usuario',
                })
                _getUsersRequest()
                _toggleDeleteModal()
            } else {
                _toggleDeleteModal()
                if (response.error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Algo salió ma ',
                        text: response.error,
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Algo salió mal dos',
                        text: 'Error de servidor',
                    })
                }
            }
        } catch (error) {
            _toggleDeleteModal()
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal tres',
                text: 'Error de servidor',
            })
        }
    }

    const _deleteUserHandler = () => {
        _deleteUserRequest()
    }

    useState(()=>{
        _getRentsRequest()
    },[])

    return (
        <div className="card UserCard">
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{user.Nombre + " " + user.Apellido}</p>
                        <br />
                        <p className="subtitle is-5">Email: {user.Email}</p>
                        <p className="subtitle is-5">Rentas en curso: {rents}</p>
                        {user.Administrador ?
                            <span className="tag is-success">Usuario Administrador</span>
                        :
                            <span className="tag is-link">Usuario normal</span>
                        }
                    </div>
                </div>
            </div>
            <footer className="card-footer">
            {userId === user.Id_Usuario ? 
                <button disabled className="card-footer-item button is-ghost has-text-link-dark">Usuario actual</button>
                :
                <button onClick={_toggleDeleteModal} className="card-footer-item button is-ghost has-text-danger-dark">Eliminar</button>
            }
            </footer>
            <div className={`modal ${deleteModal && 'is-active'}`}>
                <div onClick={_toggleDeleteModal} className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">¿Deseas eliminar este usuario?</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="notification is-warning">
                            Toma en cuenta que si el usuario cuenta con rentas en curso en la base de datos, no podrás eliminarlo
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={_deleteUserHandler} className="button is-link">Si, Eliminar</button>
                        <button onClick={_toggleDeleteModal} className="button is-danger">Cancelar</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default UserAdminCard
