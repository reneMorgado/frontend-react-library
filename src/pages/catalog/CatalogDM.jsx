import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/userContext'
import BooksAPI from '../../helpers/books-api-dm'
import AuthorsAPI from '../../helpers/authors-api-dm'
import GendersAPI from '../../helpers/genders-api-dm'
import UsersAPI from '../../helpers/users-api-dm'
import CatalogUI from './CatalogUI'

/**
 * @function CatalogDM - Componente funcional encargado de la lógica del catálogo
 */
const CatalogDM = () => {

  /**
   * Estado para manejar y setear los libros 
   */
  const [books, setBooks] = useState([])

  /**
   * Estado para manejar y setear los autores 
   */
  const [authors, setAuthors] = useState([])

  /**
   * Estado para manejar y setear los generos 
   */
  const [genders, setGenders] = useState([])
  
  /**
   * Estado para manejar y setear el nombre de usuario 
   */
  const [userName, setUserName] = useState([])

  /**
   * Datos obtenidos del contexto global de la aplicación
   */
  const { token, userId } = useContext(userContext)

  /**
   * @function useEffect - Efecto usado al cargar la página para obtener los datos necesarios
   */
  useEffect(() => {
      _getBooksRequest()
      _getAuthorsRequest()
      _getGendersRequest()
      _getUserNameRequest()
      // eslint-disable-next-line
  }, [])

  /**
   * @function _getBooksRequest - Llamada a la api de libros y llenado de los datos correspondientes
   */
  const _getBooksRequest = async () => {
    const response = await BooksAPI.getAllBooks(token)
    setBooks(response)
  }

  /**
   * @function _getAuthorsRequest - Llamada a la api de autores y llenado de los datos correspondientes
   */
  const _getAuthorsRequest = async () => {
    const response = await AuthorsAPI.getAllAuthors(token)
    setAuthors(response)
  }

  /**
   * @function _getGendersRequest - Llamada a la api de autores y llenado de los datos correspondientes
   */
  const _getGendersRequest = async () => {
    const response = await GendersAPI.getAllGenders(token)
    setGenders(response)
  }

  /**
   * @function _getUserNameRequest - Llamada a la api de usuarios y llenado de los datos correspondientes
   */
  const _getUserNameRequest = async () => {
    const response = await UsersAPI.getUsernameById(token, userId)
    setUserName(response)
  }

  return (
    <CatalogUI books={books} userName={userName} authors={authors} genders={genders}/>
  )
}

export default CatalogDM