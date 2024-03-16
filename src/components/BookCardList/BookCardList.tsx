import React, { useEffect, useState } from "react";
import { Tabs, Row, Col, Button, Tag, Divider } from "antd";
import BookCard from "../BookCard/BookCard";
import { useNavigate } from "react-router-dom";
import Paginator from "../Paginator/Paginator";
import { TBook } from "../../Types";

import './BookCardList.less';


interface IBookCardListProps {
    books?: TBook[]
    hideTabs?: boolean
    subject?: string
    grade?: number
    onTabChange?: (activeKey: string) => void
}

const groupBy = (books: any[], getField: (element: any) => any) => (
    books.reduce((accumulator, book) => {
        const bookField = getField(book)
        if (!accumulator[bookField]) accumulator[bookField] = []
        accumulator[bookField].push(book)
        return accumulator;
    }, {})
)

const filterByGrade = (books: any[], grade: number | string) => {
    return books.filter(
        (element) => element.classes.includes(parseInt(grade.toString()))
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
    
    const groupedBooks = groupBy(books, (element) => element.subject.title)
    const tabsTitles = Object.keys(groupedBooks)
    const subjects = Object.keys(groupedBooks)
    const tabsCount = tabsTitles.length


    const renderBookCards = (subject?: string) => {
        const bookList = !!subject && groupedBooks[subject] ? groupedBooks[subject] : books

        return (
            <>  
                <Paginator 
                    itemsPerPage={6}
                    elements={
                        bookList.map(
                            (element: any) => (
                                <Col 
                                    sm={12}
                                    md={8}
                                    lg={4}
                                >
                                    <BookCard {...element} onCardClick={onCardClick}/>
                                </Col>
                            )
                        ) || []
                    }>
                        {(changePage, elements, _, hasNextPage) => (
                            <>
                                <Row gutter={[16, 16]} className="cards">
                                    {elements}
                                </Row>

                                {hasNextPage && 
                                    <div className="paginate-block">
                                        <Button
                                            size="large"
                                            className="paginate-btn"
                                            onClick={() => changePage()}
                                        >
                                            Загрузить еще
                                        </Button>
                                    </div>
                                }
                            </>
                        )}
                </Paginator>
            </>
        )
    }

    const handleTabChange = (activeKey: string) => {
        setCurrentKey(activeKey)
        onTabChange?.(activeKey)
    }

    const tabGradeDivider = (
        <div className="tab-grade-tag-block">
            <Tag color='cyan' className="tab-grade-tag">
                {`${grade} класс`}
            </Tag>
        </div>
    )
    
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

    useEffect(
        () => {
            if (!!currentKey && !tabsTitles.includes(currentKey)) {
                setCurrentKey(tabsTitles.at(0))
            }
        }, [books]
    )

    return (
        <>
            {
                (hideTabs) 
                    ? renderBookCards(subject)
                    : (
                        <Tabs
                            tabBarExtraContent={grade && {left: tabGradeDivider}}
                            className="book-tabs"
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