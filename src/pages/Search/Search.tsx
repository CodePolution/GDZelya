import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Root from "../Root";
import { useApiContext } from "../../providers/ApiProvider";
import BookCardList from "../../components/BookCardList/BookCardList";
import { Alert, Empty, Select, Button } from "antd";

import './Search.less';
import { useState } from "react";


interface IFilters {
    grades: number[]
    subjects: string[]
    publishers: string[]
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
    const [filters, setFilters] = useState<IFilters>({
        grades: [],
        subjects: [],
        publishers: []
    })

    const { getBooks }: any = useApiContext()
    const searchQuery = searchParams.get('q')

    const books = useMemo(
        () => {
                let books = getBooks().filter(
                    (book: any) => book.search_keywords?.includes(searchQuery?.toLowerCase())
                )

                if (filters.grades.length) {
                    books = books.filter(
                        (book: any) => intersection(book.grades, filters.grades).length > 0
                    )
                }
        
                if (filters.publishers.length) {
                    books = books.filter(
                        (book: any) => filters.publishers.includes(book.publisher)
                    )
                }
        
                if (filters.subjects.length) {
                    books = books.filter(
                        (book: any) => filters.subjects.includes(book.subject)
                    )
                }

                return books
        }, [filters]
    )
    
    const grades = getUniqueValuesFromArray(books, 'grades')
    const subjects = getUniqueValuesFromArray(books, 'subject')
    const publishers = getUniqueValuesFromArray(books, 'publisher')
    

    const handleFiltersConfirm = () => {
        console.log(filters)
    }

    return (
        <Root>
            <>
                <div className="search-filters">
                    <Select
                        mode="multiple"
                        allowClear
                        placeholder="Классы: все"
                        value={filters.grades}
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
                        mode="multiple"
                        allowClear
                        placeholder="Предметы: все"
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
                        mode="multiple"
                        allowClear
                        placeholder="Издатели: все"
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

                    <Button onClick={() => handleFiltersConfirm()}>Применить</Button>
                </div>

                <Alert
                    className="search-info-alert"
                    message={<p><strong>Найдено по результатам запроса:</strong> {searchQuery}</p>} 
                    type="info" 
                    showIcon 
                />


                {
                    !!books && books.length > 0
                    ? <BookCardList books={books} />
                    : <Empty className='search-not-found' description='Ничего не найдено!' />
                }
            </>
        </Root>
    )
}

export default Search