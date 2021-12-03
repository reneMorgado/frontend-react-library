import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'


const BookAdminCard = ({ book, _getBooksRequest }) => {

    const [author, setAuthor] = useState('')
    const [editorial, setEditorial] = useState('')
    const [gender, setGender] = useState('')
    const [language, setLanguage] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const [titleNew, setTitleNew] = useState(book.Titulo)
    const [descNew, setDescNew] = useState(book.Sinopsis)

    const [yearNew, setYearNew] = useState('')
    const [monthNew, setMonthNew] = useState('')
    const [dayNew, setDayNew] = useState('')

    const [imageNew, setImageNew] = useState(book.ImgUrl)
    const [authorNew, setAuthorNew] = useState(book.Id_Autores)
    const [genderNew, setGenderNew] = useState(book.Id_Genero)
    const [editorialNew, setEditorialNew] = useState(book.Id_Editorial)
    const [languageNew, setLanguageNew] = useState(book.Id_Idioma)
    const [editionNew, setEditionNew] = useState(book.Edicion)

    const [authors, setAuthors] = useState([])
    const [genders, setGenders] = useState([])
    const [editorials, setEditorials] = useState([])
    const [languages, setLanguages] = useState([])

    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    const _getAuthorsNameRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getAuthorsName/${book.Id_Autores}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                const NombreCompleto = response.items[0].Nombre_Autor + " " + response.items[0].Apellido_Autor
                setAuthor(NombreCompleto)
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

    const _getEditorialsNameRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getEditorialsName/${book.Id_Editorial}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setEditorial(response.items[0].Editorial)
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

    const _getGendersNameRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getGendersName/${book.Id_Genero}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setGender(response.items[0].Genero)
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

    const _getLanguagesNameRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getLanguagesName/${book.Id_Idioma}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setLanguage(response.items[0].Idioma)
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

    const _getFecha = () => {
        const [fecha] = book.FechaPublicacion.split('T');
        return fecha
    }

    const _getFechaSplit = () => {
        const [fecha] = book.FechaPublicacion.split('T')
        const [anio, mes, dia] = fecha.split('-')
        setYearNew(anio)
        setMonthNew(mes)
        setDayNew(dia)
    }

    const _toggleBookModal = () => {
        setShowModal(!showModal)
    }


    useEffect(() => {
        _getAuthorsNameRequest()
        _getEditorialsNameRequest()
        _getGendersNameRequest()
        _getLanguagesNameRequest()
        _getFecha()
        _getFechaSplit()
        // eslint-disable-next-line
    }, [])

    const _deleteBookRequest = async () => {
        try {
            let request = await fetch(`${api}/library/deleteBook/${book.Id_Libro}`, {
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
                    text: 'Se ha eliminado el libro',
                })
                _getBooksRequest()
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

    const _deleteBookHandler = () => {
        _deleteBookRequest()
    }

    const _toggleDeleteModal = () =>{
        setDeleteModal(!deleteModal)
    }

    const _inputTitleHandler = (e) => {
        // eslint-disable-next-line
        if (/^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim()) || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setTitleNew(e.target.value)
            }
        }
    }

    const _inputDescHandler = (e) => {
            if (!(e.target.value.length >= 300)) {
                setDescNew(e.target.value)
            }
    }

    const _editYearHandler = (e) => {
        // eslint-disable-next-line
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 5)) {
                setYearNew(e.target.value)
            }
        }
    }

    const _editMonthHandler = (e) => {
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                const monthInt = parseInt(e.target.value, 10)
                if (!(monthInt >= 13 || monthInt < 0)) {
                    setMonthNew(e.target.value)
                }
            }
        }
    }

    const _editDayHandler = (e) => {
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                const dayInt = parseInt(e.target.value, 10)
                if (!(dayInt >= 31 || dayInt < 0)) {
                    setDayNew(e.target.value)
                }
            }
        }
    }

    const _editEditionHandler = (e) => {
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                setEditionNew(e.target.value)
            }
        }
    }

    const _editImageHanlder = (e) => {
        setImageNew(e.target.value)
    }

    const _selectAuthorHandler = (e) => {
        setAuthorNew(e.target.value)
    }

    const _selectGenderHandler = (e) => {
        setGenderNew(e.target.value)
    }

    const _selectEditorialHandler = (e) => {
        setEditorialNew(e.target.value)
    }

    const _selectLanguageHandler = (e) => {
        setLanguageNew(e.target.value)
    }

    const _toggleEditModal = () =>{
        _getGendersRequest()
        _getAuthorsRequest()
        _getEditorialsRequest()
        _getLanguagesRequest()
        setEditModal(!editModal)
    }

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

    const _getGendersRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getGenders`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setGenders(response.items)
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

    const _getEditorialsRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getEditorials`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setEditorials(response.items)
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

    const _getLanguagesRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getLanguages`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setLanguages(response.items)
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

    const _editBookRequest = async () => {
        if(authorNew === '' || genderNew === '' || editorialNew === '' || languageNew === '' || titleNew === '' || descNew === '' || yearNew === '' || monthNew === '' || dayNew === '' || imageNew === '' || editionNew === ''){
            Swal.fire({
                icon: 'error',
                title: 'Alto ahí!',
                text: 'Llena todos los campos correctamente',
            })
        }else{
            const bookBody = {
                autor: authorNew,
                genero: genderNew,
                editorial: editorialNew,
                idioma: languageNew,
                titulo: titleNew,
                sinopsis: descNew,
                fechaPublicacion: `${yearNew}-${monthNew}-${dayNew}`,
                imgurl: imageNew,
                edicion: editionNew
            }
            try {
                let request = await fetch(`${api}/library/editBook/${book.Id_Libro}`, {
                    method: 'PUT',
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
                        title: 'Éxito!',
                        text: 'Se ha modificado el libro correctamente',
                    })
                    _getBooksRequest()
                    setTimeout(()=>{
                        _getAuthorsNameRequest()
                        _getEditorialsNameRequest()
                        _getGendersNameRequest()
                        _getLanguagesNameRequest()
                    },10000)
                    _toggleEditModal()
                    
                } else {
                    _toggleEditModal()
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
                    text: error.toString(),
                })
            }
        }
    }

    return (
        <div className="card BookAdminCard">
            <div className="card-image is-flex">
                <figure className="image">
                    <img src={book.ImgUrl} alt="Libro" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{book.Titulo}</p>
                        <p className="subtitle is-6">{author}</p>
                    </div>
                </div>

                <div className="content">
                    {book.Prestado ?
                        <div className="notification is-danger BookAdminCard-Notification">
                            Rentado
                        </div>
                        :
                        <div className="notification is-success BookAdminCard-Notification">
                            Disponible
                        </div>
                    }
                    <time>{_getFecha()}</time>
                </div>
            </div>
            <footer className="card-footer">
                <button onClick={_toggleEditModal} className="card-footer-item button is-ghost has-text-warning-dark">Editar</button>
                <button onClick={_toggleDeleteModal} disabled={book.Prestado} className="card-footer-item button is-ghost has-text-danger">Eliminar</button>
                <button onClick={_toggleBookModal} className="card-footer-item button is-ghost">Detalles</button>
            </footer>
            <div className={`modal ${showModal && 'is-active'}`}>
                <div onClick={_toggleBookModal} className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{book.Titulo}</p>
                    </header>
                    <section className="modal-card-body">
                        <h3 className="subtitle is-3 mb-2">Sinopsis: </h3>
                        <p className="mb-1">{book.Sinopsis}</p>
                        <div className="BookCard-Carac">
                            <h4 className="subtitle is-4 mb-2">Autor: </h4>
                            &nbsp;
                            <p className="mb-1">{author}</p>
                        </div>
                        <div className="BookCard-Carac">
                            <h4 className="subtitle is-4 mb-2">Fecha de publicación: </h4>
                            &nbsp;
                            <p className="mb-1">{_getFecha()}</p>
                        </div>
                        <div className="BookCard-Carac">
                            <h4 className="subtitle is-4 mb-2">Idioma: </h4>
                            &nbsp;
                            <p className="mb-1">{language}</p>
                        </div>
                        <div className="BookCard-Carac">
                            <h4 className="subtitle is-4 mb-2">Editorial: </h4>
                            &nbsp;
                            <p className="mb-1">{editorial}</p>
                        </div>
                        <div className="BookCard-Carac">
                            <h4 className="subtitle is-4 mb-2">Genero: </h4>
                            &nbsp;
                            <p className="mb-1">{gender}</p>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={_toggleBookModal} className="button">Cerrar</button>
                    </footer>
                </div>
                <button onClick={_toggleBookModal} className="modal-close is-large" aria-label="close"></button>
            </div>
            <div className={`modal ${deleteModal && 'is-active'}`}>
                <div onClick={_toggleDeleteModal} className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">¿Deseas eliminar este libro?</p>
                    </header>
                    <section className="modal-card-body">
                        <div className="notification is-warning">
                            Toma en cuenta que si el libro cuenta con rentas en curso en la base de datos, no podrás eliminarlo
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={_deleteBookHandler} className="button is-link">Si, Eliminar</button>
                        <button onClick={_toggleDeleteModal} className="button is-danger">Cancelar</button>
                    </footer>
                </div>
            </div>
            <div className={`modal ${editModal && 'is-active'}`}>
                <div onClick={_toggleEditModal} className="modal-background"></div>
                <div className="modal-content">
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Ingrese los campos correctamente</p>
                        </header>
                        <section className="modal-card-body">

                            <div className="field">
                                <label className="label">Titulo</label>
                                <div className="control has-icons-left has-icons-right">
                                    <textarea className="input" type="text" placeholder="Ej. Viaje al centro de la tierra" value={titleNew} onChange={_inputTitleHandler} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-book"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Autor</label>
                                <div className="is-flex">
                                    {authors.length > 0 ?
                                        <div className="control has-icons-left">
                                            <div className="select">
                                                <select onChange={_selectAuthorHandler}>
                                                    <option value={''}>Selecciona una opción</option>
                                                    {authors.map((au) => (<option key={Math.random()} selected={au.Id_Autor === authorNew} value={au.Id_Autor}>{au.Nombre_Autor + ' ' + au.Apellido_Autor}</option>))}
                                                </select>
                                            </div>
                                            <div className="icon is-small is-left">
                                                <i className="fas fa-user"></i>
                                            </div>
                                        </div>
                                        :

                                        <div className="notification is-danger">
                                            No se han encontrado autores
                                        </div>
                                    }
                                    <Link to="/getAllAuthors" className="button ml-4 is-link">Añade un autor</Link>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Género</label>
                                <div className="is-flex">
                                    {genders.length > 0 ?
                                        <div className="control has-icons-left">
                                            <div className="select">
                                                <select onChange={_selectGenderHandler}>
                                                    <option value={''}>Selecciona una opción</option>
                                                    {genders.map((ge) => (<option key={Math.random()} selected={ge.Id_Genero === genderNew} value={ge.Id_Genero}>{ge.Genero}</option>))}
                                                </select>
                                            </div>
                                            <div className="icon is-small is-left">
                                                <i className="fas fa-swatchbook"></i>
                                            </div>
                                        </div>
                                        :
                                        <div className="notification is-danger">
                                            No se han encontrado géneros
                                        </div>
                                    }
                                    <Link to="/getAllGenders" className="button ml-4 is-link">Añade un género</Link>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Editorial</label>
                                <div className="is-flex">
                                    {editorials.length > 0 ?
                                        <div className="control has-icons-left">
                                            <div className="select">
                                                <select onChange={_selectEditorialHandler}>
                                                    <option value={''}>Selecciona una opción</option>
                                                    {editorials.map((ed) => (<option key={Math.random()} selected={ed.Id_Editorial === editorialNew} value={ed.Id_Editorial}>{ed.Editorial}</option>))}
                                                </select>
                                            </div>
                                            <div className="icon is-small is-left">
                                                <i className="fas fa-atlas"></i>
                                            </div>
                                        </div>
                                        :
                                        <div className="notification is-danger">
                                            No se han encontrado editoriales
                                        </div>
                                    }
                                    <Link to="/getAllEditorials" className="button ml-4 is-link">Añade una editorial</Link>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Idioma</label>
                                <div className="is-flex">
                                    {languages.length > 0 ?
                                        <div className="control has-icons-left">
                                            <div className="select">
                                                <select onChange={_selectLanguageHandler}>
                                                    <option value={''}>Selecciona una opción</option>
                                                    {languages.map((la) => (<option key={Math.random()} selected={la.Id_Idioma === languageNew} value={la.Id_Idioma}>{la.Idioma}</option>))}
                                                </select>
                                            </div>
                                            <div className="icon is-small is-left">
                                                <i className="fas fa-atlas"></i>
                                            </div>
                                        </div>
                                        :
                                        <div className="notification is-danger">
                                            No se han encontrado idiomas
                                        </div>
                                    }
                                    <Link to="/getAllLanguages" className="button ml-4 is-link">Añade un idioma</Link>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Sinopsis</label>
                                <div className="control has-icons-left has-icons-right">
                                    <textarea className="textarea" type="text" placeholder="Max. 100 caracteres" value={descNew} onChange={_inputDescHandler} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Fecha de publicación Año / Mes / Día</label>
                                <div className="is-flex">
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" placeholder="Ej. 1920" value={yearNew} onChange={_editYearHandler} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-calendar"></i>
                                        </span>
                                    </div>
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" placeholder="Ej. 09" value={monthNew} onChange={_editMonthHandler} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-calendar-alt"></i>
                                        </span>
                                    </div>
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" placeholder="Ej. 14" value={dayNew} onChange={_editDayHandler} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-calendar-day"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Edición</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. 1 " value={editionNew} onChange={_editEditionHandler} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-sort-numeric-up-alt"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">URL Imagen</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. http://www.servidor.com/static/imagen.png" value={imageNew} onChange={_editImageHanlder} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-portrait"></i>
                                    </span>
                                </div>
                                <br />
                                <div className="is-flex is-justify-content-center">
                                    <figure className="image is-128x128">
                                        <img src={imageNew} alt="Libro"/>
                                    </figure>
                                </div>
                            </div>

                        </section>

                        <footer className="modal-card-foot">
                            <button onClick={_editBookRequest} className="button is-link">Guardar cambios</button>
                            <button onClick={_toggleEditModal} className="button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookAdminCard
