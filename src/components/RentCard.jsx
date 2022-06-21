import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'


const RentCard = ({ rent, _returnBookRequest }) => {
 
    const [book, setBook] = useState([])
    const [author, setAuthor] = useState([])
    const [showModal, setShowModal] = useState(false)

    const { token, setIsAuth, setIsAdmin, setToken, setUserId } = useContext(userContext)

    useEffect(() => {
        _getBookByIdRequest()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (book.Id_Autores) {
            _getAuthorsNameRequest()
        }
        // eslint-disable-next-line
    }, [book])

    const _getBookByIdRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getBookById/${rent.Id_Libro}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setBook(response.items[0])
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
                setAuthor(response.items[0])
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

    const _getRentDate = (data) => {
        const [fecha] = data.split('T')
        return fecha
    }

    const _getRentDueDate = (data) => {
        const [dueDateDash] = data.split('T')
        const [yearDueDate, monthDueDate, dayDueDate] = dueDateDash.split('-')
        const dueDateFormated = new Date(yearDueDate,parseInt(monthDueDate)-1,dayDueDate)
        const todayDateFormated = new Date()
        if(dueDateFormated >= todayDateFormated){
            return <p className="has-text-link-dark">Se entrega el {dueDateDash}</p>
        }else if (dueDateFormated.getDate() === todayDateFormated.getDate()){
            return <p className="has-text-warning-dark">Se entrega hoy</p>
        }else{
            return <p className="has-text-danger-dark">La renta venció el {dueDateDash}</p>
        }
    }

    const _toggleBookModal = () => {
        setShowModal(!showModal)
    }

    const _returnBookHandler = () => {
        _returnBookRequest(rent.Id_Renta, rent.Id_Libro)
        _toggleBookModal()
    }

    return (
        <div className="card RentCard">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={book.ImgUrl} alt="Libro" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={author.Imagen_Autor} alt="Autor" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{book.Titulo}</p>
                        <p className="subtitle is-6">{`${author.Nombre_Autor + ' ' + author.Apellido_Autor}`}</p>
                    </div>
                </div>
                <div className="content">
                    Rentado el: {_getRentDate(rent.FechaRenta)}
                    <br />
                    {_getRentDueDate(rent.FechaDevolucion)}
                </div>
            </div>
            <footer className="card-footer">
                <button onClick={_toggleBookModal} className="card-footer-item button is-ghost">Devolver libro</button>
            </footer>
            <div className={`modal ${showModal && 'is-active'}`}>
                <div onClick={_toggleBookModal} className="modal-background"></div>

                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">¿Deseas devolver este libro?</p>
                    </header>
                    <footer className="modal-card-foot">
                        <button onClick={_returnBookHandler} className="button is-link">Si, devolver</button>
                        <button onClick={_toggleBookModal}  className="button is-danger">Cancelar</button>
                    </footer>
                </div>
                <button onClick={_toggleBookModal} className="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    )
}

export default RentCard
