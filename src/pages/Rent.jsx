import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { api } from '../config'
import { userContext } from '../context/userContext'


const Rent = () => {

    const [userName, setUserName] = useState('')
    const [book, setBook] = useState([])
    const [author, setAuthor] = useState('')
    const [days, setDays] = useState('')
    const [fechaHoy, setFechaHoy] = useState('')
    const [fechaEntrega, setFechaEntrega] = useState('')
    const [cadenaEntrega, setCadenaEntrega] = useState('')
    const [enableSend, setEnableSend] = useState(false)

    const { idBook, idAuthor } = useParams()
    const { userId, token, setIsAuth, setIsAdmin, setToken, setUserId } = useContext(userContext)
    const history = useHistory()

    useEffect(() => {
        _loadData()
        // eslint-disable-next-line
    }, []) 

    const _loadData = async () => {
        await _getBookByIdRequest()
        await _getAuthorsNameRequest()
        await _getUserNameRequest()
    }

    const _getAuthorsNameRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getAuthorsName/${idAuthor}`, {
                method: 'GET',
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
            let request = await fetch(`${api}/library/getBookById/${idBook}`, {
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

    const _getUserNameRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getUserNameById/${userId}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setUserName(response.name)
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

    const _daysInputHandler = (e) => {
        if (e.target.value.length < 2) {
            if (/^[1-9]+$/i.test(e.target.value) || e.target.value === '') {
                if (e.target.value === '') {
                    setDays('')
                    setFechaEntrega('')
                    setCadenaEntrega('')
                    setEnableSend(false)
                } else {
                    const diasNumero = parseInt(e.target.value, 10)
                    setDays(diasNumero)
                    const hoy = new Date()
                    const formatoHoy = hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' + hoy.getDate()
                    setFechaHoy(formatoHoy)
                    hoy.setDate(hoy.getDate() + diasNumero)
                    const cadenaEntregaThis = _getDayString(hoy.getDay()) + ' ' + hoy.getDate() + ' de ' + _getMonthString(hoy.getMonth()) + ' del ' + hoy.getFullYear()
                    const formatoEntrega = hoy.getFullYear() + '-' + (hoy.getMonth()+1) + '-' + hoy.getDate()
                    setFechaEntrega(formatoEntrega)
                    setCadenaEntrega(cadenaEntregaThis)
                    setEnableSend(true)
                }
            }
        }
    }

    const _getMonthString = (month) => {
        switch (month) {
            case 0:
                return 'Enero'
            case 1:
                return 'Febrero'
            case 2:
                return 'Marzo'
            case 3:
                return 'Abril'
            case 4:
                return 'Mayo'
            case 5:
                return 'Junio'
            case 6:
                return 'Julio'
            case 7:
                return 'Agosto'
            case 8:
                return 'Septiembre'
            case 9:
                return 'Octubre'
            case 10:
                return 'Noviembre'
            case 11:
                return 'Diciembre'
            default:
                return ''
        }
    }

    const _getDayString = (day) => {
        switch (day) {
            case 0:
                return 'Domingo'
            case 1:
                return 'Lunes'
            case 2:
                return 'Martes'
            case 3:
                return 'Miercoles'
            case 4:
                return 'Jueves'
            case 5:
                return 'Viernes'
            case 6:
                return 'Sabado'
            default:
                return ''
        }
    }

    const _rentBookRequest = async () => {
        const payload = {
            usuario: userId,
            libro: idBook,
            fecha: fechaHoy,
            entrega: fechaEntrega
        }
        try {
            let request = await fetch(`${api}/library/addRent`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                },
                body: JSON.stringify(payload)
            })
            let response = await request.json()
            if (await response.success) {
                let timerInterval
                Swal.fire({
                    title: 'Libro rentado exitosamente! ',
                    html: 'Serás redirigido al catalogo en <b></b> ...',
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then(() => {
                    history.push('/getBooks')
                })
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

    return (
        <div className="container is-max-desktop">
            <br /><br />
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-primary">
                            <p className="title">Estás rentando...</p>
                            <p className="subtitle">{book.Titulo}</p>
                            <div className="content">
                                De {author}
                            </div>
                            <figure className="image is-3by4">
                                <img src={book.ImgUrl} alt="Libro"/>
                            </figure>
                        </article>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification is-link">
                        <div className="content">
                            <br />
                            <p className="title">A nombre de:</p>
                            <p className="subtitle">{userName}</p>
                            <br />
                            <p className="title">¿Cuántos días?</p>
                            <input className="input" type="text" placeholder="Ej. 8 (Max. 9)" onChange={_daysInputHandler} value={days} />
                            <br />
                            <br />
                            <p className="title">Devolerías el: </p>
                            <p className="subtitle">{cadenaEntrega}</p>
                            <br />
                            <div className="buttons">
                                <button disabled={!enableSend} onClick={_rentBookRequest} className="button is-primary">De acuerdo, rentar libro</button>
                                <Link to="/getBooks" className="button is-danger">Volver al catalogo</Link>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <br /><br />
        </div>
    )
}

export default Rent




