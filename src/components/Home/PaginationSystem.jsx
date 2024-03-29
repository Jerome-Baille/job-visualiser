import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationSystem = ({ nPages, currentPage, setCurrentPage }) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
    var middleArr = pageNumbers.slice(Math.max(currentPage -1, 1) -1, Math.min(currentPage + 1, nPages))

    const firstPage = () => {
        setCurrentPage(1)
    }

    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    const lastPage = () => {
        setCurrentPage(nPages)
    }
    
    return (
        <Pagination>
        {currentPage > 1 ? 
        <>
        <Pagination.First onClick={firstPage}/>
        <Pagination.Prev onClick={prevPage}/>
        {currentPage > 2 ? <Pagination.Item onClick={firstPage}>{1}</Pagination.Item> : null}
        {currentPage > 3 ? <Pagination.Ellipsis /> : null}
        </> : null}
            {middleArr.map(pgNumber => (
                <Pagination.Item 
                    key={pgNumber} 
                    className= {`page-item ${currentPage === pgNumber ? 'active' : ''} `}
                    onClick={() => setCurrentPage(pgNumber)}
                >
                    {pgNumber}
                </Pagination.Item>
            ))}

            {currentPage < (nPages) ? 
                <>
                    {currentPage < (nPages-2) ? <Pagination.Ellipsis /> : null}
                    {currentPage < (nPages-1) ? <Pagination.Item onClick={lastPage}>
                        {nPages}
                    </Pagination.Item> : null}
                    <Pagination.Next onClick={nextPage} />
                    <Pagination.Last onClick={lastPage} />
                </>
                : null
            }
        </Pagination>
    )
}

export default PaginationSystem