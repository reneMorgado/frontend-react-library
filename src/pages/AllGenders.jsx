import React, { useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import GenderAdminCard from '../components/GenderAdminCard'
import { api } from '../config'
import { userContext } from '../context/userContext'

const AllGenders = () => {

    const [genders, setGenders] = useState([])
    const [addModal, setAddModal] = useState(false)

    const [genderName, setGenderName] = useState('')
    const [genderImage, setGenderImage] = useState('')

    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    useEffect(()=>{
        _getGendersRequest()
        // eslint-disable-next-line
    },[])

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

    const _editNameHandler = (e) => {
        // eslint-disable-next-line
        if (/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim())  || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setGenderName(e.target.value)
            }
        }
    }


    const _editImageHanlder = (e) => {
        setGenderImage(e.target.value)
    }

    const _addGenderRequest = async () => {
        if(genderName === ''){
            Swal.fire({
                icon: 'error',
                title: 'Alto ahí',
                text: 'Llena los campos correctamente',
            })
        }else{
            const genderBody = {
                genero: genderName,
                imagen: genderImage
            }
            try {
                let request = await fetch(`${api}/library/addGender`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': token
                    },
                    body: JSON.stringify(genderBody)
                })
                let response = await request.json()
                if (await response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: 'Se ha añadido el género correctamente',
                    })
                    _toggleAddModal()
                    _getGendersRequest()
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
            <h2 className="Catalog-Title title is-2 ">Panel de administración de los Géneros</h2>
            <div className="is-flex is-flex-direction-row Catalog">
                {genders.length > 0 ?
                    genders.map((gender)=>(<GenderAdminCard key={Math.random()} gender={gender} _getGendersRequest={_getGendersRequest}/>))
                :
                    <div className="notification is-danger">
                        No se han encontrado géneros
                    </div>
                }
            </div>
            <br/>
            <button onClick={_toggleAddModal} className="button is-fullwidth is-success">Añadir género</button>
            <div className={`modal ${addModal && 'is-active'}`}>
                <div onClick={_toggleAddModal} className="modal-background"></div>
                <div className="modal-content">
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Ingrese los campos correctamente</p>
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <label className="label">Nombre(s)</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. Mario / Luis Mario" value={genderName} onChange={_editNameHandler}/>
                                    <span className ="icon is-small is-left">
                                        <i className ="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">URL Imagen</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. http://www.servidor.com/static/imagen.png" value={genderImage} onChange={_editImageHanlder}/>
                                    <span className ="icon is-small is-left">
                                        <i className ="fas fa-portrait"></i>
                                    </span>
                                </div>
                                <br />
                                <div className="is-flex is-justify-content-center">
                                    <figure className="image is-128x128">
                                        <img src={genderImage} alt="Genero"/>
                                    </figure>
                                </div>
                            </div>

                        </section>
   
                        <footer className="modal-card-foot">
                            <button onClick={_addGenderRequest} className="button is-link">Guardar género</button>
                            <button onClick={_toggleAddModal} className="button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllGenders
