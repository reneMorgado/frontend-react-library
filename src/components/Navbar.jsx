import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useState } from 'react/cjs/react.development'
import { userContext } from '../context/userContext'

const Navbar = () => {

    const { isAuth, isAdmin, setIsAuth, setIsAdmin, setToken, setUserId } = useContext(userContext)
    const history = useHistory()

    const [mobile, setMobile] = useState(false)

    const _toggleMobileMenu = () => {
        setMobile(!mobile)
    }

    const _closeSession = () => {
        setIsAdmin(false)
        setIsAuth(false)
        setToken('')
        setUserId('')
        localStorage.removeItem('isAuth')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        history.push('/login')
    }

    return (
        <section className="hero is-link is-small">
            <div className="hero-head">
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <NavLink to="/" className="navbar-item">
                                <h3 className="title is-3">Libreria</h3>
                            </NavLink>
                            <span className={`navbar-burger ${mobile && 'is-active'}`} data-target="navbarMenuHeroA" onClick={_toggleMobileMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div id="navbarMenuHeroA" className={`navbar-menu ${mobile && 'is-active'}`}>
                            {isAuth ?
                                <div className="navbar-end">
                                    <NavLink to="/getBooks" className="navbar-item" activeClassName="is-active">
                                        Catalogo de libros
                                    </NavLink>
                                    <NavLink to="/getRents" className="navbar-item" activeClassName="is-active">
                                        Mis Rentas
                                    </NavLink>
                                    {isAdmin &&
                                        <React.Fragment>
                                            <NavLink to="/getAllRents" className="navbar-item" activeClassName="is-active">
                                                Rentas
                                            </NavLink>
                                            <NavLink to="/getAllBooks" className="navbar-item" activeClassName="is-active">
                                                Libros
                                            </NavLink>
                                            <NavLink to="/getAllAuthors" className="navbar-item" activeClassName="is-active">
                                                Autores
                                            </NavLink>
                                            <NavLink to="/getAllLanguages" className="navbar-item" activeClassName="is-active">
                                                Idiomas
                                            </NavLink>
                                            <NavLink to="/getAllEditorials" className="navbar-item" activeClassName="is-active">
                                                Editoriales
                                            </NavLink>
                                            <NavLink to="/getAllGenders" className="navbar-item" activeClassName="is-active">
                                                Generos
                                            </NavLink>
                                            <NavLink to="/getAllUsers" className="navbar-item" activeClassName="is-active">
                                                Usuarios
                                            </NavLink>
                                        </React.Fragment>
                                    }
                                    <span className="navbar-item" onClick={_closeSession}>
                                        <p className="button is-link is-inverted">
                                            <span className="icon">
                                                <i className="fas fa-sign-out-alt"></i>
                                            </span>
                                            <span>Cerrar sesión</span>
                                        </p>
                                    </span>
                                </div>
                                :
                                <div className="navbar-end">
                                    <NavLink to="/login" className="navbar-item" activeClassName="is-active">
                                        Iniciar sesión
                                    </NavLink>
                                    <NavLink to="/register" className="navbar-item" activeClassName="is-active">
                                        Registro
                                    </NavLink>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    )
}

export default Navbar
