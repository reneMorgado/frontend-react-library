import React, { useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import EditorialAdminCard from '../components/EditorialAdminCard'
import { api } from '../config'
import { userContext } from '../context/userContext'

const AllEditorials = () => {
       
    const [editorials, setEditorials] = useState([])
    const [addModal, setAddModal] = useState(false)

    const [editorialName, setEditorialName] = useState('')

    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    useEffect(()=>{
        _getEditorialsRequest()
        // eslint-disable-next-line
    },[])

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

    const _editEditorialHandler = (e) => {
        // eslint-disable-next-line
        if (/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim())  || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setEditorialName(e.target.value)
            }
        }
    }

    const _addEditorialRequest = async () => {
        if(editorialName === ''){
            Swal.fire({
                icon: 'error',
                title: 'Alto ahí',
                text: 'Llena los campos correctamente',
            })
        }else{
            const editorialBody = {
                editorial: editorialName
            }
            try {
                let request = await fetch(`${api}/library/addEditorial`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': token
                    },
                    body: JSON.stringify(editorialBody)

                })
                let response = await request.json()
                if (await response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: 'Se ha añadido la editorial correctamente',
                    })
                    _toggleAddModal()
                    _getEditorialsRequest()
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
                _toggleAddModal()
                Swal.fire({
                    icon: 'error',
                    title: 'Algo salió mal',
                    text: 'Error de servidor',
                })
            }
        }
    }

    const _toggleAddModal = () => {
        setAddModal(!addModal)
    }

    return (
        <div className="container is-max-desktop">
            <h2 className="Catalog-Title title is-2 ">Panel de administración de las Editoriales</h2>
            <div className="is-flex is-flex-direction-row Catalog">
                {editorials.length > 0 ?
                    editorials.map((editorial)=>(<EditorialAdminCard key={Math.random()} editorial={editorial} _getEditorialsRequest={_getEditorialsRequest}/>))
                :
                    <div className="notification is-danger">
                        No se han encontrado editoriales
                    </div>
                }
            </div>
            <br/>
            <button onClick={_toggleAddModal} className="button is-fullwidth is-success">Añadir editorial</button>
            <div className={`modal ${addModal && 'is-active'}`}>
                <div onClick={_toggleAddModal} className="modal-background"></div>
                <div className="modal-content">
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Ingrese los campos correctamente</p>
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <label className="label">Editorial</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. Editorial Diana" value={editorialName} onChange={_editEditorialHandler}/>
                                    <span className ="icon is-small is-left">
                                        <i className ="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>

                        </section>
   
                        <footer className="modal-card-foot">
                            <button onClick={_addEditorialRequest} className="button is-link">Guardar editorial</button>
                            <button onClick={_toggleAddModal} className="button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllEditorials
