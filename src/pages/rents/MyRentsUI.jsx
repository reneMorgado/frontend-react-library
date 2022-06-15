import React from 'react'
import RentCard from '../../components/RentCard'

const MyRentsUI = ({rents, _returnBookRequest}) => {
    return (
        <div className="container is-max-desktop">
            <h2 className="Catalog-Title title is-2 ">Mis rentas</h2>
            <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
                {rents.length > 0 ?
                    rents.map((rent) => (<RentCard key={Math.random()} rent={rent} _returnBookRequest={_returnBookRequest} />))
                    :
                    <div className="notification is-danger">
                        No tienes rentas registradas!
                    </div>
                }
            </div>
        </div>
    )
}

export default MyRentsUI