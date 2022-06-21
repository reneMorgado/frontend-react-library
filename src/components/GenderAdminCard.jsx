import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'


const GenderAdminCard = ({gender, _getGendersRequest}) => {

    const { token } = useContext(userContext)

    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
 
    const [genderName, setGenderName] = useState(gender.Genero)
    const [genderImage, setGenderImage] = useState(gender.Imagen_Genero)

    const _toggleEditModal = () => {
        setEditModal(!editModal)
    }

    const _toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }

    const _deleteGenderRequest = async () => {
        try {
            let request = await fetch(`${api}/library/deleteGender/${gender.Id_Genero}`, {
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
                    text: 'Se ha eliminado el género',
                })
                _getGendersRequest()
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

    const _deleteGenderHandler = () => {
        _deleteGenderRequest()
    }

    const _editNameHandler = (e) => {
        // eslint-disable-next-line
        if (/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim())  || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setGenderName(e.target.value)
            }
        }
    }

    const _editImageHanlder = (e) => {
        setGenderImage(e.target.value)
    }

    const _editGenderRequest = async () => {
        if(genderName === '' || genderImage === ''){
            Swal.fire({
                icon: 'error',
                title: 'Alto ahí',
                text: 'Llena los campos correctamente',
            })
        }else{
            const genderBody = {
                genero: genderName,
                imagen: genderImage
            }
            try {
                let request = await fetch(`${api}/library/editGender/${gender.Id_Genero}`, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': token
                    },
                    body: JSON.stringify(genderBody)
                })
                let response = await request.json()
                if (await response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: 'Se han modificado los datos correctamente',
                    })
                    _toggleEditModal()
                    _getGendersRequest()
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

    const _editGenderHandler = () => {
        _editGenderRequest()
    }


    return (
        <div className="card BookCard">
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={gender.Imagen_Genero} alt="Genero" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{gender.Genero}</p>
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
                                <label className="label">Genero</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. Comedia" value={genderName} onChange={_editNameHandler}/>
                                    <span className ="icon is-small is-left">
                                        <i className ="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">URL Imagen</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. http://www.servidor.com/static/imagen.png" value={genderImage} onChange={_editImageHanlder}/>
                                    <span className ="icon is-small is-left">
                                        <i className ="fas fa-portrait"></i>
                                    </span>
                                </div>
                                <br />
                                <div className="is-flex is-justify-content-center">
                                    <figure className="image is-128x128">
                                        <img src={genderImage} alt="Genero"/>
                                    </figure>
                                </div>
                            </div>

                        </section>
   
                        <footer className="modal-card-foot">
                            <button onClick={_editGenderHandler} className="button is-link">Guardar Cambios</button>
                            <button onClick={_toggleEditModal} className="button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
            </div>
            <div className={`modal ${deleteModal && 'is-active'}`}>
                <div onClick={_toggleDeleteModal} className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">¿Deseas eliminar este género?</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="notification is-warning">
                            Toma en cuenta que si el género cuenta con libros registrados en la base de datos, no podrás eliminarlo
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={_deleteGenderHandler} className="button is-link">Si, Eliminar</button>
                        <button onClick={_toggleDeleteModal} className="button is-danger">Cancelar</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default GenderAdminCard
