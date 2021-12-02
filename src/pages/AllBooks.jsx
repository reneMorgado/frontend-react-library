import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import BookAdminCard from '../components/BookAdminCard'
import { api } from '../config'
import { userContext } from '../context/userContext'


const AllBooks = () => {

    const [books, setBooks] = useState([])
    const [authors, setAuthors] = useState([])
    const [genders, setGenders] = useState([])
    const [editorials, setEditorials] = useState([])
    const [languages, setLanguages] = useState([])
    const [addModal, setAddModal] = useState(false)

    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [image, setImage] = useState('')
    const [author, setAuthor] = useState('')
    const [gender, setGender] = useState('')
    const [editorial, setEditorial] = useState('')
    const [language, setLanguage] = useState('')
    const [edition, setEdition] = useState('')
    const [amount, setAmount] = useState('')

    const _getBooksRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getBooks`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setBooks(response.items)
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

    useEffect(() => {
        _getBooksRequest()
        _getGendersRequest()
        _getAuthorsRequest()
        _getEditorialsRequest()
        _getLanguagesRequest()
        // eslint-disable-next-line
    }, [])

    const _toggleAddModal = () => {
        setAddModal(!addModal)
    }

    const _inputTitleHandler = (e) => {
        // eslint-disable-next-line
        if (/^[a-zA-Z0-9\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim()) || e.target.value === '') {
            if (!(e.target.value.length >= 50)) {
                setTitle(e.target.value)
            }
        }
    }

    const _inputDescHandler = (e) => {
        if (!(e.target.value.length >= 300)) {
            setDesc(e.target.value)
        }
    }

    const _editYearHandler = (e) => {
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 5)) {
                setYear(e.target.value)
            }
        }
    }

    const _editMonthHandler = (e) => {
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                const monthInt = parseInt(e.target.value, 10)
                if (!(monthInt >= 13 || monthInt < 0)) {
                    setMonth(e.target.value)
                }
            }
        }
    }

    const _editDayHandler = (e) => {
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                const dayInt = parseInt(e.target.value, 10)
                if (!(dayInt >= 31 || dayInt < 0)) {
                    setDay(e.target.value)
                }
            }
        }
    }

    const _editEditionHandler = (e) => {
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                setEdition(e.target.value)
            }
        }
    }

    const _editAmountHandler = (e) => {
        if (/^([0-9])*$/.test(e.target.value) || e.target.value === '') {
            if (!(e.target.value.length >= 3)) {
                const amountInt = parseInt(e.target.value, 10)
                if (!(amountInt >= 11 || amountInt < 0)) {
                    setAmount(e.target.value)
                }
            }
        }
    }

    const _editImageHanlder = (e) => {
        setImage(e.target.value)
    }

    const _selectAuthorHandler = (e) => {
        setAuthor(e.target.value)
    }

    const _selectGenderHandler = (e) => {
        setGender(e.target.value)
    }

    const _selectEditorialHandler = (e) => {
        setEditorial(e.target.value)
    }

    const _selectLanguageHandler = (e) => {
        setLanguage(e.target.value)
    }

    const _addBookRequest = async () => {
        if (author === '' || gender === '' || editorial === '' || language === '' || title === '' || desc === '' || year === '' || month === '' || day === '' || image === '' || edition === '' || amount === '') {
            Swal.fire({
                icon: 'error',
                title: 'Alto ahí!',
                text: 'Llena todos los campos correctamente',
            })
        } else {
            const bookBody = {
                autor: author,
                genero: gender,
                editorial,
                idioma: language,
                titulo: title,
                sinopsis: desc,
                fechaPublicacion: `${year}-${month}-${day}`,
                imgurl: image,
                edicion: edition,
                cantidad: amount
            }
            try {
                let request = await fetch(`${api}/library/addBook`, {
                    method: 'POST',
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
                        text: 'Se ha añadido el libro correctamente',
                    })
                    _toggleAddModal()
                    _getBooksRequest()
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
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salió mal',
                    text: error.toString(),
                })
            }
        }
    }

    return (
        <div className="container is-max-desktop">
            <h2 className="Catalog-Title title is-2 ">Panel de administración de los libros</h2>
            <div className="is-flex is-flex-direction-row Catalog">
                {books.length > 0 ?
                    books.map((book) => (<BookAdminCard key={Math.random()} book={book} _getBooksRequest={_getBooksRequest} />))
                    :
                    <div className="notification is-danger">
                        No se han encontrado editoriales
                    </div>
                }
            </div>
            <br />
            <button onClick={_toggleAddModal} className="button is-fullwidth is-success">Añadir libro</button>
            <div className={`modal ${addModal && 'is-active'}`}>
                <div onClick={_toggleAddModal} className="modal-background"></div>
                <div className="modal-content">
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Ingrese los campos correctamente</p>
                        </header>
                        <section className="modal-card-body">

                            <div className="field">
                                <label className="label">Titulo</label>
                                <div className="control has-icons-left has-icons-right">
                                    <textarea className="input" type="text" placeholder="Ej. Viaje al centro de la tierra" value={title} onChange={_inputTitleHandler} />
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
                                                    {authors.map((au) => (<option key={Math.random()} selected={au.Id_Autor === author} value={au.Id_Autor}>{au.Nombre_Autor + ' ' + au.Apellido_Autor}</option>))}
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
                                                    {genders.map((ge) => (<option key={Math.random()} selected={ge.Id_Genero === gender} value={ge.Id_Genero}>{ge.Genero}</option>))}
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
                                                    {editorials.map((ed) => (<option key={Math.random()} selected={ed.Id_Editorial === editorial} value={ed.Id_Editorial}>{ed.Editorial}</option>))}
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
                                                    {languages.map((la) => (<option key={Math.random()} selected={la.Id_Idioma === language} value={la.Id_Idioma}>{la.Idioma}</option>))}
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
                                    <textarea className="textarea" type="text" placeholder="Max. 100 caracteres" value={desc} onChange={_inputDescHandler} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Fecha de publicación Año / Mes / Día</label>
                                <div className="is-flex">
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" placeholder="Ej. 1920" value={year} onChange={_editYearHandler} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-calendar"></i>
                                        </span>
                                    </div>
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" placeholder="Ej. 09" value={month} onChange={_editMonthHandler} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-calendar-alt"></i>
                                        </span>
                                    </div>
                                    <div className="control has-icons-left">
                                        <input className="input" type="text" placeholder="Ej. 14" value={day} onChange={_editDayHandler} />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-calendar-day"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Edición</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. 1 " value={edition} onChange={_editEditionHandler} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-sort-numeric-up-alt"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Cantidad</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Max. 10 " value={amount} onChange={_editAmountHandler} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-layer-group"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">URL Imagen</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. http://www.servidor.com/static/imagen.png" value={image} onChange={_editImageHanlder} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-portrait"></i>
                                    </span>
                                </div>
                                <br />
                                <div className="is-flex is-justify-content-center">
                                    <figure className="image is-128x128">
                                        <img src={image} alt="Libro"/>
                                    </figure>
                                </div>
                            </div>

                        </section>

                        <footer className="modal-card-foot">
                            <button onClick={_addBookRequest} className="button is-link">Guardar Libro</button>
                            <button onClick={_toggleAddModal} className="button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
            </div>
            <br /><br />
        </div>
    )
}

export default AllBooks
