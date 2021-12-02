import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'

const AuthorAdminCard = ({ author, _getAuthorsRequest }) => {

    const { token } = useContext(userContext)

    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [authorName, setAuthorName] = useState(author.Nombre_Autor)
    const [authorLastname, setAuthorLastname] = useState(author.Apellido_Autor)
    const [authorImage, setAuthorImage] = useState(author.Imagen_Autor)
    const [authorYear, setAuthorYear] = useState('')
    const [authorMonth, setAuthorMonth] = useState('')
    const [authorDay, setAuthorDay] = useState('')

    useState(()=>{
        const [authorDateDash] = author.Fecha_Nacimiento_Autor.split('T')
        const [year, month, day] = authorDateDash.split('-')
        setAuthorYear(year)
        setAuthorMonth(month)
        setAuthorDay(day)
    },[])

    const _getFecha = () => {
        const [fecha] = author.Fecha_Nacimiento_Autor.split('T');
        return fecha
    }

    const _toggleEditModal = () => {
        setEditModal(!editModal)
    }

    const _toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }

    const _deleteAuthorRequest = async () => {
        try {
            let request = await fetch(`${api}/library/deleteAuthor/${author.Id_Autor}`, {
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
                    text: 'Se ha eliminado el autor',
                })
                _getAuthorsRequest()
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

    const _deleteAuthorHandler = () => {
        _deleteAuthorRequest()
    }

    const _editNameHandler = (e) => {
        // eslint-disable-next-line
        if (/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim())  || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setAuthorName(e.target.value)
            }
        }
    }

    const _editLastnameHandler = (e) => {
        // eslint-disable-next-line
        if (/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim()) || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setAuthorLastname(e.target.value)
            }
        }
    }

    const _editImageHanlder = (e) => {
        setAuthorImage(e.target.value)
    }

    const _editYearHandler = (e) => {
        // eslint-disable-next-line
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 5)) {
                setAuthorYear(e.target.value)
            }
        }
    }

    const _editMonthHandler = (e) => {
        // eslint-disable-next-line
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                const monthInt = parseInt(e.target.value,10)
                if(!(monthInt >= 13 || monthInt < 0)){
                    setAuthorMonth(e.target.value)
                }
            }
        }
    }

    const _editDayHandler = (e) => {
        // eslint-disable-next-line
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                const dayInt = parseInt(e.target.value,10)
                if(!(dayInt >= 31 || dayInt < 0)){
                    setAuthorDay(e.target.value)
                }
            }
        }
    }

    const _editAuthorRequest = async () => {
        if(authorName === '' || authorLastname === '' || authorYear === '' || authorMonth === '' || authorDay === '' || authorImage === ''){
            Swal.fire({
                icon: 'error',
                title: 'Alto ahí',
                text: 'Llena los campos correctamente',
            })
        }else{
            const authorBody = {
                Nombre_Autor: authorName,
                Apellido_Autor: authorLastname,
                Fecha_Nacimiento_Autor: `${authorYear}-${authorMonth}-${authorDay}`,
                Imagen_Autor: authorImage
            }
            try {
                let request = await fetch(`${api}/library/editAuthor/${author.Id_Autor}`, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': token
                    },
                    body: JSON.stringify(authorBody)
                })
                let response = await request.json()
                if (await response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: 'Se han modificado los datos correctamente',
                    })
                    _toggleEditModal()
                    _getAuthorsRequest()
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

    const _editAuthorHandler = () => {
        _editAuthorRequest()
    }


    return (
        <div className="card BookCard">
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={author.Imagen_Autor} alt="Autor" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{author.Nombre_Autor + " " + author.Apellido_Autor}</p>
                        <p className="subtitle is-6">Nacido el {_getFecha()}</p>
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
                                <label className="label">Nombre(s)</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. Mario / Luis Mario" value={authorName} onChange={_editNameHandler}/>
                                    <span className ="icon is-small is-left">
                                        <i className ="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Apellido (s)</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. Benedetti / Benedetti Farrigua" value={authorLastname} onChange={_editLastnameHandler}/>
                                    <span className ="icon is-small is-left">
                                        <i className ="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Fecha Nacimiento Año / Mes / Dia</label>
                                <div className="is-flex">
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" placeholder="Ej. 1920" value={authorYear} onChange={_editYearHandler}/>
                                        <span className ="icon is-small is-left">
                                            <i className ="fas fa-calendar"></i>
                                        </span>
                                    </div>
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" placeholder="Ej. 09" value={authorMonth} onChange={_editMonthHandler}/>
                                        <span className ="icon is-small is-left">
                                            <i className ="fas fa-calendar-alt"></i>
                                        </span>
                                    </div>
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" placeholder="Ej. 14" value={authorDay} onChange={_editDayHandler}/>
                                        <span className ="icon is-small is-left">
                                            <i className ="fas fa-calendar-day"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">URL Imagen</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. http://www.servidor.com/static/imagen.png" value={authorImage} onChange={_editImageHanlder}/>
                                    <span className ="icon is-small is-left">
                                        <i className ="fas fa-portrait"></i>
                                    </span>
                                </div>
                                <br />
                                <div className="is-flex is-justify-content-center">
                                    <figure className="image is-128x128">
                                        <img src={authorImage} alt="Autor"/>
                                    </figure>
                                </div>
                            </div>

                        </section>
   
                        <footer className="modal-card-foot">
                            <button onClick={_editAuthorHandler} className="button is-link">Guardar Cambios</button>
                            <button onClick={_toggleEditModal} className="button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
            </div>
            <div className={`modal ${deleteModal && 'is-active'}`}>
                <div onClick={_toggleDeleteModal} className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">¿Deseas eliminar este autor?</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="notification is-warning">
                            Toma en cuenta que si el autor cuenta con libros registrados en la base de datos, no podrás eliminarlo
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={_deleteAuthorHandler} className="button is-link">Si, Eliminar</button>
                        <button onClick={_toggleDeleteModal} className="button is-danger">Cancelar</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default AuthorAdminCard
