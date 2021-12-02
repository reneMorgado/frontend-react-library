import React, { useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import LanguageAdminCard from '../components/LanguageAdminCard'
import { api } from '../config'
import { userContext } from '../context/userContext'

const AllLanguages = () => {
    
    const [idiomas, setIdiomas] = useState([])
    const [addModal, setAddModal] = useState(false)

    const [languageName, setLanguageName] = useState('')

    const { token, setIsAdmin, setIsAuth, setToken, setUserId } = useContext(userContext)

    useEffect(()=>{
        _getLanguagesRequest()
        // eslint-disable-next-line
    },[])

    const _getLanguagesRequest = async () => {
        try {
            let request = await fetch(`${api}/library/getLanguages`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'access-token': token
                }
            })
            let response = await request.json()
            if (await response.success) {
                setIdiomas(response.items)
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

    const _editLanguageHandler = (e) => {
        // eslint-disable-next-line
        if (/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(e.target.value.trim())  || e.target.value === '') {
            if (!(e.target.value.length >= 20)) {
                setLanguageName(e.target.value)
            }
        }
    }

    const _addLanguageRequest = async () => {
        if(languageName === ''){
            Swal.fire({
                icon: 'error',
                title: 'Alto ahí',
                text: 'Llena los campos correctamente',
            })
        }else{
            const languageBody = {
                idioma: languageName
            }
            try {
                let request = await fetch(`${api}/library/addLanguage`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': token
                    },
                    body: JSON.stringify(languageBody)
                })
                let response = await request.json()
                if (await response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito!',
                        text: 'Se ha añadido el idioma correctamente',
                    })
                    _toggleAddModal()
                    _getLanguagesRequest()
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
            <h2 className="Catalog-Title title is-2 ">Panel de administración de los Idiomas</h2>
            <div className="is-flex is-flex-direction-row Catalog">
                {idiomas.length > 0 ?
                    idiomas.map((idioma)=>(<LanguageAdminCard key={Math.random()} language={idioma} _getLanguagesRequest={_getLanguagesRequest}/>))
                :
                    <div className="notification is-danger">
                        No se han encontrado idiomas
                    </div>
                }
            </div>
            <br/>
            <button onClick={_toggleAddModal} className="button is-fullwidth is-success">Añadir idioma</button>
            <div className={`modal ${addModal && 'is-active'}`}>
                <div onClick={_toggleAddModal} className="modal-background"></div>
                <div className="modal-content">
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Ingrese los campos correctamente</p>
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <label className="label">Idioma</label>
                                <div className="control has-icons-left">
                                    <input className="input" type="text" placeholder="Ej. Catalán" value={languageName} onChange={_editLanguageHandler}/>
                                    <span className ="icon is-small is-left">
                                        <i className ="fas fa-flag"></i>
                                    </span>
                                </div>
                            </div>

                        </section>
   
                        <footer className="modal-card-foot">
                            <button onClick={_addLanguageRequest} className="button is-link">Guardar idioma</button>
                            <button onClick={_toggleAddModal} className="button is-danger">Cancelar</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllLanguages
