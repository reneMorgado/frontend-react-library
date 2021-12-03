import React, { useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import AuthorAdminCard from '../components/AuthorAdminCard'
import { api } from '../config'
import { userContext } from '../context/userContext'

const AllAuthors = () => {

    const [authors, setAuthors] = useState([])
    const [addModal, setAddModal] = useState(false)

    const [authorName, setAuthorName] = useState('')
    const [authorLastname, setAuthorLastname] = useState('')
    const [authorImage, setAuthorImage] = useState('')
    const [authorYear, setAuthorYear] = useState('')
    const [authorMonth, setAuthorMonth] = useState('')
    const [authorDay, setAuthorDay] = useState('')

    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    useEffect(()=>{
        _getAuthorsRequest()
        // eslint-disable-next-line
    },[])

    const _getAuthorsRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getAuthors`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setAuthors(response.items)
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
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 5)) {
                setAuthorYear(e.target.value)
            }
        }
    }

    const _editMonthHandler = (e) => {
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
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                const dayInt = parseInt(e.target.value,10)
                if(!(dayInt >= 31 || dayInt < 0)){
                    setAuthorDay(e.target.value)
                }
            }
        }
    }

    const _addAuthorRequest = async () => {
        if(authorName === '' || authorLastname === '' || authorYear === '' || authorMonth === '' || authorDay === '' || authorImage === ''){
            Swal.fire({
                icon: 'error',
                title: 'Alto ahí',
                text: 'Llena los campos correctamente',
            })
        }else{
            const authorBody = {
                nombre: authorName,
                apellido: authorLastname,
                fechaNacimiento: `${authorYear}-${authorMonth}-${authorDay}`,
                imagen: authorImage
            }
            try {
                let request = await fetch(`${api}/library/addAuthor`, {
                    method: 'POST',
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
                        text: 'Se ha añadido el autor correctamente',
                    })
                    _toggleAddModal()
                    _getAuthorsRequest()
                } else {
                    _toggleAddModal()
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
                _toggleAddModal()
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salió mal',
                    text: 'Error de servidor',
                })
            }
        }
    }

    const _toggleAddModal = () => {
        setAddModal(!addModal)
    }



    return (
        <div className="container is-max-desktop">
            <h2 className="Catalog-Title title is-2 ">Panel de administración de los Autores</h2>
            <div className="is-flex is-flex-direction-row Catalog">
                {authors.length > 0 ?
                    authors.map((author)=>(<AuthorAdminCard key={Math.random()} author={author} _getAuthorsRequest={_getAuthorsRequest}/>))
                :
                    <div className="notification is-danger">
                        No se han encontrado autores
                    </div>
                }
            </div>
            <br/>
            <button onClick={_toggleAddModal} className="button is-fullwidth is-success">Añadir autor</button>
            <div className={`modal ${addModal && 'is-active'}`}>
                <div onClick={_toggleAddModal} className="modal-background"></div>
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
                                        <img src={authorImage} alt="Imagen"/>
                                    </figure>
                                </div>
                            </div>

                        </section>
   
                        <footer className="modal-card-foot">
                            <button onClick={_addAuthorRequest} className="button is-link">Guardar autor</button>
                            <button onClick={_toggleAddModal} className="button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllAuthors
