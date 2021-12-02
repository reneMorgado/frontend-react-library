import React, { useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'
import BookCard from './BookCard'

const AuthorCard = ({ author }) => {

    const [showModal, setShowModal] = useState(false)
    const [books, setBooks] = useState([])

    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    const _getFecha = () => {
        const [fecha] = author.Fecha_Nacimiento_Autor.split('T');
        return fecha
    }

    const _getBooksByAuthorRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getBooksByAuthor/${author.Id_Autor}`, {
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

    const _toggleAuthorModal = () => {
        setShowModal(!showModal)
        _getBooksByAuthorRequest()
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
                        <p className="subtitle is-6">{_getFecha()}</p>
                    </div>
                </div>
            </div>
            <footer className="card-footer">
                <button onClick={_toggleAuthorModal} className="card-footer-item button is-ghost">Ver libros</button>
            </footer>
            <div className={`modal ${showModal && 'is-active'}`}>
                <div onClick={_toggleAuthorModal} className="modal-background"></div>
                <div className="modal-content">
                    <div className="modal-card">
                        <div className="Catalog">
                            {books.length > 0 ?
                                books.map((book) => (<BookCard key={Math.random()} book={book} />))
                                :
                                <div className="notification is-danger">
                                    No se han encontrado libros
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <button onClick={_toggleAuthorModal} className="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    )
}

export default AuthorCard
