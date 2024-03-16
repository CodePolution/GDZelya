import React, { useState, useEffect } from 'react';

import './Paginator.less';


interface IPaginatorProps {
    elements: React.ReactElement[]
    itemsPerPage?: number
    defaultPage?: number
    children: (setPage: (page?: number) => void, elements: React.ReactElement[], page: number, hasNextPage: boolean) => React.ReactElement | React.ReactElement[]
    onPageChange?: (elementsCutted: any[], page: number) => void
}


const Paginator: React.FC<IPaginatorProps> = ({
    elements,
    itemsPerPage,
    defaultPage,
    children,
    onPageChange
}) => {
    const _itemsPerPage = itemsPerPage || 5
    const _defaultPage = defaultPage || 1

    const [page, setPage] = useState<number>(_defaultPage)

    const cutElementsForPage = (forPage: number) => {
        return elements.slice(0, _itemsPerPage * forPage)
    }

    const renderElements = () => {
        const elementsCutted = cutElementsForPage(page)
        const hasNextPage = haveNextPage()

        return children(handlePageChange, elementsCutted, page, hasNextPage)
    }

    const haveNextPage = () => {
        return elements.length > _itemsPerPage * page
    }

    const handlePageChange = (newPage?: number) => {
        if (!haveNextPage()) {
            return 
        }

        newPage = newPage || page + 1
        setPage(newPage)

        const elementsCutted = cutElementsForPage(newPage)
        return onPageChange?.(elementsCutted, newPage)
    }

    useEffect(() => {
        setPage(1)
    }, [elements, itemsPerPage])

    return (
        <>
            {renderElements()}
        </>
    )

}

export default Paginator