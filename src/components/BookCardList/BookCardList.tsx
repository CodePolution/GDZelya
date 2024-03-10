import React, { useEffect, useState } from "react";
import { Tabs, Flex } from "antd";
import BookCard from "../BookCard/BookCard";
import { booksInitial } from "../../TestingData";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import './BookCardList.less';


interface IBookCardListProps {
    books?: any[]
    hideTabs?: boolean
    subject?: string
    grade?: number
    onTabChange?: (activeKey: string) => void
}

const groupBy = (books: any[], field: string) => (
    books.reduce((accumulator, book) => {
        const bookField = book[field]
        if (!accumulator[bookField]) accumulator[bookField] = []
        accumulator[bookField].push(book)
        return accumulator;
    }, {})
)

const filterByGrade = (books: any[], grade: number | string) => {
    return books.filter(
        (element) => element.grades.includes(parseInt(grade.toString()))
    )
}


const BookCardList: React.FC<IBookCardListProps> = ({
    books,
    subject,
    grade,
    hideTabs,
    onTabChange
}) => {
    books = !!grade && !!books ? filterByGrade(books, grade) : books || []
    const [currentKey, setCurrentKey] = useState<string>()
    const navigate = useNavigate()
    const [queryParams] = useSearchParams()
    
    const groupedBooks = groupBy(books, 'subject')
    const tabsTitles = Object.keys(groupedBooks)
    const subjects = Object.keys(groupedBooks)
    const tabsCount = tabsTitles.length

    const renderBookCards = (subject?: string) => {
        const bookList = !!subject && groupedBooks[subject] ? groupedBooks[subject] : books

        return (
            <div className='cards'>
                <Flex wrap='wrap' className='cards-wrap'>
                    {
                        bookList.map(
                            (element: any) => <BookCard {...element} onCardClick={onCardClick}/>
                        )
                    }
                </Flex>
            </div>
        )
    }

    const handleTabChange = (activeKey: string) => {
        setCurrentKey(activeKey)
        onTabChange?.(activeKey)
    }

    const onCardClick = (props: any) => {
        return navigate(`/books/${props.id}/`)
    }

    useEffect(
        () => {
            if (!!subject) {
                setCurrentKey(subject)
            }
        },
        [subject]
    )

    return (
        <>
            {
                (hideTabs) 
                    ? renderBookCards(subject)
                    : (
                        <Tabs
                            className="book-tabs"
                            type="card"
                            activeKey={currentKey}
                            onChange={handleTabChange}
                            items={
                                subjects.map((subjectElem: string) => (
                                    {
                                        label: subjectElem,
                                        key: subjectElem,
                                        disabled: false,
                                        children: renderBookCards(subjectElem)
                                    }
                                ))
                            }
                        />
                    )
            }
        </>
    )
}

export default BookCardList