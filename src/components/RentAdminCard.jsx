import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'

const RentAdminCard = ({rent}) => {

    const { token, setIsAuth, setIsAdmin, setToken, setUserId } = useContext(userContext)
 
    const [username, setUsername] = useState('')
    const [book, setBook] = useState('')

    const _getUserNameRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getUserNameById/${rent.Id_Usuario}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setUsername(response.name)
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

    useState(()=>{
        _getUserNameRequest()
        _getBookByIdRequest()
    },[])

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

    return (
        <div className="card m-5">
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={book.ImgUrl} alt="Libro" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{book.Titulo}</p>
                        <br />
                        <p className="subtitle is-5">Rentado por: {username}</p>
                        Rentado el: {_getRentDate(rent.FechaRenta)}
                        <br />
                        {_getRentDueDate(rent.FechaDevolucion)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RentAdminCard
