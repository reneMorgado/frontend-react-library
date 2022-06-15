import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/userContext'
import RentsAPI from '../../helpers/rents-api-dm'
import MyRentsUI from './MyRentsUI'

/**
 * @function MyRentsDM - Componente funcional encargado de la lógica del catálogo
 */
const MyRentsDM = () => {

    /**
     * Estado para manejar y setear los libros 
     */
    const [rents, setRents] = useState([])

    /**
     * Datos obtenidos del contexto global de la aplicación
     */
    const { token, userId } = useContext(userContext)

    /**
     * @function useEffect - Efecto usado al cargar la página para obtener los datos necesarios
     */
    useEffect(() => {
        _getRentsRequest()
        // eslint-disable-next-line
    }, [])

    /**
     * @function _getRentsRequest - Llamada a la api de rentas y llenado de los datos correspondientes
     */
    const _getRentsRequest = async () => {
        const response = await RentsAPI.getRentsByUser(token, userId)
        setRents(response)
    }

    /**
     * @function _returnBookRequest - Llamada a la api de rentas para eliminar la renta de un libro
     */
    const _returnBookRequest = async(renta, libro) => {
        const response = await RentsAPI.deleteRent(token, renta, libro)
        if(response){
            _getRentsRequest()
        } 
    }

  return (
    <MyRentsUI rents={rents} _returnBookRequest={_returnBookRequest}/>
  )
}

export default MyRentsDM