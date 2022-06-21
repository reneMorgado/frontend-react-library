import React, { useState } from 'react'
import { useContext } from 'react/cjs/react.development'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'
import BookCard from './BookCard'


const GenderCard = ({ gender }) => {

    const [showModal, setShowModal] = useState(false)
    const [books, setBooks] = useState([])
 
    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    const _getBooksByGenderRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getBooksByGender/${gender.Id_Genero}`, {
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

    const _toggleGenderModal = () => {
        setShowModal(!showModal)
        _getBooksByGenderRequest()
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
                <button onClick={_toggleGenderModal} className="card-footer-item button is-ghost">Ver libros</button>
            </footer>
            <div className={`modal ${showModal && 'is-active'}`}>
                <div onClick={_toggleGenderModal} className="modal-background"></div>
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
                <button onClick={_toggleGenderModal} className="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    )
}

export default GenderCard
