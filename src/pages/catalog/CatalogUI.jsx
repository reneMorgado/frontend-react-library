import React from 'react'
import AuthorCard from '../../components/AuthorCard'
import BookCard from '../../components/BookCard'
import GenderCard from '../../components/GenderCard'

/**
 * @function CatalogUI - Componente visual encargado del maquetado del catálogo
 */
const CatalogUI = ({books, userName, authors, genders}) => {
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

export default CatalogUI