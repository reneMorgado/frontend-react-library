import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import AuthorCard from '../components/AuthorCard'
import BookCard from '../components/BookCard'
import GenderCard from '../components/GenderCard'
import { api } from '../config'
import { userContext } from '../context/userContext'


const Catalog = () => {

    const [books, setBooks] = useState([])
    const [authors, setAuthors] = useState([])
    const [genders, setGenders] = useState([])
    const [userName, setUserName] = useState([])

    const { token, setIsAdmin, setIsAuth, setToken, setUserId, userId } = useContext(userContext)

    useEffect(() => {
        _getBooksRequest()
        _getAuthorsRequest()
        _getGendersRequest()
        _getUserNameRequest()
        // eslint-disable-next-line
    }, [])

    const _getBooksRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getAvailableBooks`, {
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
                const [justName] = response.name.split(' ')
                setUserName(justName)
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
            <h2 className="Catalog-Title title is-2 ">Hola {userName}, explora nuestro catálogo de libros</h2>
            <h2 className=" subtitle is-2 Catalog-Subtitle">Todos los libros: </h2>
            <div className="is-flex is-flex-direction-row Catalog">
                {books.length > 0 ?
                    books.map((book) => (<BookCard key={Math.random()} book={book} />))
                    :
                    <div className="notification is-danger">
                        No hay libros disponibles!
                    </div>
                }
            </div>
            <h2 className=" subtitle is-2 Catalog-Subtitle">Por autores: </h2>
            <div className="is-flex is-flex-direction-row Catalog">
                {authors.length > 0 ?
                    authors.map((author) => (<AuthorCard key={Math.random()} author={author} />))
                    :
                    <div className="notification is-danger">
                        No se han encontrado autores
                    </div>
                }
            </div>
            <h2 className=" subtitle is-2 Catalog-Subtitle">Por genero: </h2>
            <div className="is-flex is-flex-direction-row Catalog">
                {genders.length > 0 ?
                    genders.map((gender) => (<GenderCard key={Math.random()} gender={gender} />))
                    :
                    <div className="notification is-danger">
                        No se han encontrado generos
                    </div>
                }
            </div>
            <br /><br />
        </div>
    )
}

export default Catalog
