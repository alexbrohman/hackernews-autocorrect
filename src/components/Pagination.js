import React from 'react'

const Pagination = ({ page, nbPages, prevPage, nextPage }) => {
    return (
        <div className="pagination">
            <button onClick={prevPage}>PREVIOUS</button>
            <p>PAGE: {page + 1} of {nbPages}</p>
            <button onClick={nextPage}>NEXT</button>
        </div>
    )
}

export default Pagination