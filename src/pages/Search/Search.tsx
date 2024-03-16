import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Root from "../Root";
import { useApiContext } from "../../providers/ApiProvider";
import BookCardList from "../../components/BookCardList/BookCardList";
import { Alert, Empty, Select, Button, Spin } from "antd";

import './Search.less';
import { useState } from "react";
import { TBook } from "../../Types";
import { LoadingOutlined } from "@ant-design/icons";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";


interface IFilters {
    grades: number[]
    subjects: string[]
    publishers: string[]
    authors: string[]
}


const getUniqueValuesFromArray = (array: Object[], key: string) => {
    return Array.from(
        new Set(array.map(
            (element: any) => element[key]
        ).flat())
    ).flat()
}

const intersection = (arr1: any[], arr2: any[]) => (
        arr1.filter(x => arr2.includes(x))
    )


const Search = () => {
    const [searchParams] = useSearchParams()
    const [filteredBooks, setFilteredBooks] = useState<TBook[]>([])
    const [filters, setFilters] = useState<IFilters>({
        grades: [],
        subjects: [],
        publishers: [],
        authors: []
    })

    const { useBooks }: any = useApiContext()
    const searchQuery = searchParams.get('q')

    const [books, booksAreLoading] = useBooks()
    
    const grades = getUniqueValuesFromArray(books, 'classes')
    const subjects = getUniqueValuesFromArray(getUniqueValuesFromArray(books, 'subject'), 'title')
    const publishers = getUniqueValuesFromArray(books, 'publisher')
    const authors = getUniqueValuesFromArray(books, 'authors')


    const gradesPlaceholder = (count: number) => (
        <span>Выбрано {count} классов</span>
    )

    const subjectPlaceholder = (count: number) => (
        <span>Выбрано {count} предметов</span>
    )

    const publishersPlaceholder = (count: number) => (
        <span>Выбрано {count} издателей</span>
    )

    const authorsPlaceholder = (count: number) => (
        <span>Выбрано {count} авторов</span>
    )

    
    useEffect(() => {
        let booksToFilter = books.filter((book: TBook) => !searchQuery || book.search_keywords?.includes(searchQuery?.toLowerCase()))

        if (filters.grades.length) {
            booksToFilter = booksToFilter.filter(
                (book: TBook) => intersection(book.classes, filters.grades).length > 0
            )
        }
    
        if (filters.publishers.length) {
            booksToFilter = booksToFilter.filter(
                (book: TBook) => filters.publishers.includes(book.publisher)
            )
        }
    
        if (filters.subjects.length) {
            booksToFilter = booksToFilter.filter(
                (book: TBook) => filters.subjects.includes(book.subject.title)
            )
        }

        if (filters.authors.length) {
            booksToFilter = booksToFilter.filter(
                (book: TBook) => intersection(book.authors, filters.authors).length > 0
            )
        }

        setFilteredBooks(booksToFilter)
    }, [books, filters, searchQuery])

    return (
        <Root>
            <>

                <Alert
                    className="search-info-alert"
                    message={<p><strong>Найдено по результатам запроса:</strong> {searchQuery}</p>} 
                    type="info" 
                    showIcon 
                />

                <div className="search-filters">
                    <Select
                        loading={booksAreLoading}
                        mode="multiple"
                        allowClear
                        placeholder="Классы: все"
                        value={filters.grades}
                        maxTagCount={0}
                        maxTagPlaceholder={gradesPlaceholder(filters.grades.length)}
                        onChange={(value: number[]) => setFilters(prev => ({...prev, grades: value})) }
                        options={
                            grades.map(
                                (grade) => ({
                                    value: grade, 
                                    label: `${grade} класс`
                                })
                            )
                        }
                    />

                    <Select
                        loading={booksAreLoading}
                        mode="multiple"
                        allowClear
                        placeholder="Предметы: все"
                        maxTagCount={0}
                        maxTagPlaceholder={subjectPlaceholder(filters.subjects.length)}
                        value={filters.subjects}
                        onChange={(value: string[]) => setFilters(prev => ({...prev, subjects: value})) }
                        options={
                           subjects.map(
                                (subject) => ({
                                    value: subject, 
                                    label: subject
                                })
                            )
                        }
                    />


                    <Select
                        loading={booksAreLoading}
                        mode="multiple"
                        allowClear
                        placeholder="Издатели: все"
                        maxTagCount={0}
                        maxTagPlaceholder={publishersPlaceholder(filters.publishers.length)}
                        value={filters.publishers}
                        onChange={(value: string[]) => setFilters(prev => ({...prev, publishers: value})) }
                        options={
                            publishers.map(
                                (publisher) => ({
                                    value: publisher, 
                                    label: publisher
                                })
                            )
                        }
                    />

                    <Select
                        loading={booksAreLoading}
                        mode="multiple"
                        allowClear
                        placeholder="Авторы: все"
                        maxTagCount={0}
                        maxTagPlaceholder={authorsPlaceholder(filters.authors.length)}
                        value={filters.authors}
                        onChange={(value: string[]) => setFilters(prev => ({...prev, authors: value})) }
                        options={
                            authors.map(
                                (author) => ({
                                    value: author, 
                                    label: author
                                })
                            )
                        }
                    />
                </div>

                {
                    booksAreLoading ? (
                        <LoadingIndicator loading={true} asBlock />
                    ) : (
                        !!filteredBooks && filteredBooks.length > 0
                            ? <BookCardList books={filteredBooks} />
                            : <Empty className='search-not-found' description='Ничего не найдено!' />
                        
                    )
                }

               
            </>
        </Root>
    )
}

export default Search