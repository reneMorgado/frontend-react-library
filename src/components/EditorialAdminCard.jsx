import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'

const EditorialAdminCard = ({editorial, _getEditorialsRequest}) => {
    const { token } = useContext(userContext)

    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
 
    const [editorialName, setEditorialName] = useState(editorial.Editorial)

    const _toggleEditModal = () => {
        setEditModal(!editModal)
    }

    const _toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }

    const _deleteEditorialRequest = async () => {
        try {
            let request = await fetch(`${api}/library/deleteEditorial/${editorial.Id_Editorial}`, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    text: 'Se ha eliminado la editorial',
                })
                _getEditorialsRequest()
                _toggleDeleteModal()

            } else {
                _toggleDeleteModal()
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
            _toggleDeleteModal()
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal',
                text: 'Error de servidor',
            })
        }
    }

    const _deleteEditorialHandler = () => {
        _deleteEditorialRequest()
    }

    const _editEditorialNameHandler = (e) => {
        // eslint-disable-next-line
        if (/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim()) || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setEditorialName(e.target.value)
            }
        }
    }

    const _editEditorialRequest = async () => {
        if (editorialName === '') {
            Swal.fire({
                icon: 'error',
                title: 'Alto ahí',
                text: 'Llena los campos correctamente',
            })
        } else {
            const editorialBody = {
                editorial: editorialName
            }
            try {
                let request = await fetch(`${api}/library/editEditorial/${editorial.Id_Editorial}`, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': token
                    },
                    body: JSON.stringify(editorialBody)
                })
                let response = await request.json()
                if (await response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: 'Se han modificado los datos correctamente',
                    })
                    _toggleEditModal()
                    _getEditorialsRequest()
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

    const _editEditorialHandler = () => {
        _editEditorialRequest()
    }


    return (
        <div className="card BookCard">
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{editorial.Editorial}</p>
                    </div>
                </div>
            </div>
            <footer className="card-footer">
                <button onClick={_toggleEditModal} className="card-footer-item button is-ghost">Editar</button>
                <button onClick={_toggleDeleteModal} className="card-footer-item button is-ghost has-text-danger-dark">Eliminar</button>
            </footer>
            <div className={`modal ${editModal && 'is-active'}`}>
                <div onClick={_toggleEditModal} className="modal-background"></div>
                <div className="modal-content">
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Ingrese los campos correctamente</p>
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <label className="label">Editorial</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. Editorial Diana" value={editorialName} onChange={_editEditorialNameHandler} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>
                        </section>

                        <footer className="modal-card-foot">
                            <button onClick={_editEditorialHandler} className="button is-link">Guardar Cambios</button>
                            <button onClick={_toggleEditModal} className="button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
            </div>
            <div className={`modal ${deleteModal && 'is-active'}`}>
                <div onClick={_toggleDeleteModal} className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">¿Deseas eliminar esta editorial?</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="notification is-warning">
                            Toma en cuenta que si la editorial cuenta con libros registrados en la base de datos, no podrás eliminarlo
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={_deleteEditorialHandler} className="button is-link">Si, Eliminar</button>
                        <button onClick={_toggleDeleteModal} className="button is-danger">Cancelar</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default EditorialAdminCard
