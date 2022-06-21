import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'

const BookCard = ({ book }) => {
 
    const [author, setAuthor] = useState('')
    const [editorial, setEditorial] = useState('')
    const [gender, setGender] = useState('')
    const [language, setLanguage] = useState('')
    const [showModal, setShowModal] = useState(false)

    const { token } = useContext(userContext)

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

    const _toggleBookModal = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        _getAuthorsNameRequest()
        _getEditorialsNameRequest()
        _getGendersNameRequest()
        _getLanguagesNameRequest()
        _getFecha()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="card BookCard">
            <div className="card-image is-flex">
                <figure className="image is-flex is-justify-content-center">
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
                    <br />
                    <time>{_getFecha()}</time>
                </div>
            </div>
            <footer className="card-footer">
                <Link to={book.Prestado ? '/getBooks' : `/rentBook/${book.Id_Libro}/${book.Id_Autores}`} disabled={book.Prestado} className="card-footer-item button is-ghost">{book.Prestado ? 'Libro no disponible' : 'Rentar'}</Link>
                <button onClick={_toggleBookModal} className="card-footer-item button is-ghost">Ver detalle</button>
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
                        <Link to={`${book.Prestado ? '/getBooks': `/rentBook/${book.Id_Libro}/${book.Id_Autores}`}`} className={`button ${book.Prestado ? 'is-danger' : 'is-link'}`}>{book.Prestado ? 'Libro rentado' : 'Rentar'}</Link>
                        <button onClick={_toggleBookModal}  className="button">Cerrar</button>
                    </footer>
                </div>
                <button onClick={_toggleBookModal} className="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    )
}

export default BookCard
