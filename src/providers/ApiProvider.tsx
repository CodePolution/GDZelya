import { createContext, useContext, useEffect, useState } from "react";
import { TBook, TTask, TCover, TPart, TSubject } from "../Types";
import axios, { AxiosResponse } from "axios";

const enum HTTPMethods {
    POST = 'post',
    GET = 'get',
    DELETE = 'delete',
    OPTIONS = 'options',
    PUT = 'put'
}


type ResponseType<T> = Promise<AxiosResponse<T>>
type DataType = Record<string, any> | Object
type FilterType<T> = (argument: T) => boolean



interface IApiContext {
    getBooks?: (...args: FilterType<any>[]) => Promise<TBook[]>
    getBook?: (...args: FilterType<any>[]) => Promise<TBook>
}


interface IApiProviderProps {
    children?: React.ReactElement
}


interface IArgs {
    [key: string]: any
}


const ApiContext = createContext({})


const useApiContext = () => {
    const context = useContext<IApiContext>(ApiContext)
    
    if (!context) {
        throw new Error(
            'Данный контекст используется вне ApiContext.Provider.'
        )
    }

    return context
}

const ApiProvider: React.FC<IApiProviderProps> = ({children}) => {
    const HOST: string = 'https://api.n0maci.ru/api'

    function filterArrayResponse<ResponseType extends IArgs>(array: ResponseType[], args: FilterType<ResponseType>[]) {
        if (!args || args.length < 1) {
            return [...array]
        }

        let arrayFiltered: ResponseType[] = [...array]

        for (const filterFunc of args) {
            arrayFiltered = arrayFiltered.filter(
                (element) => filterFunc(element)
            )
        }

        return arrayFiltered
        
    }

    async function makeRequest<T extends Object>(url: string, method: HTTPMethods, data?: DataType): ResponseType<T> {
        return await axios({
            url: `${HOST}/${url}`,
            method,
            data,
            withCredentials: false
        })
    }

    function getBooks(...args: FilterType<TBook>[]): Promise<TBook[]> {
        const data = makeRequest<TBook[]>('book/', HTTPMethods.GET)

        return data.then(
            (response) => filterArrayResponse(response.data, args)
        )
    }

    function getBook(...args: FilterType<TBook>[]): Promise<TBook> {
        const bookRequest = getBooks(...args).then(
            (response) => response[0]
        )

        return bookRequest
    }

    const useBooks = (...args: FilterType<TBook>[]): [TBook[], boolean] => {
        const [books, setBooks] = useState<TBook[]>([])
        const [loading, setLoading] = useState<boolean>(true)

        const pollUpdates = () => {
            getBooks(...args).then(
                data => {
                    setBooks(data)
                    setLoading(false)
                }
            )
        }

        useEffect(() => {
            const firstPollId = setTimeout(() => {
                pollUpdates()
            }, 1000)

            const pollingId = setInterval(
                () => pollUpdates(),
                10000
            )
            
            return () => {
                clearTimeout(firstPollId)
                clearInterval(pollingId)
            }
        }, [])

        return [books, loading]
    }

    const useBook = (...args: FilterType<TBook>[]): [TBook | undefined, boolean] => {
        const [book, setBook] = useState<TBook>()
        const [loading, setLoading] = useState<boolean>(true)

        const pollUpdates = () => {
            getBook(...args).then(
                data => {
                    setBook(data)
                    setLoading(false)
                }
            )
        }

        useEffect(() => {
            const firstPollId = setTimeout(() => {
                pollUpdates()
            }, 1000)

            const pollingId = setInterval(
                () => pollUpdates(),
                10000
            )
            
            return () => {
                clearTimeout(firstPollId)
                clearInterval(pollingId)
            }
        }, [])

        return [book, loading]
    }

    return (
        <ApiContext.Provider value={{
            getBooks,
            getBook,
            useBooks,
            useBook
        }}>
            {children}
        </ApiContext.Provider>
    )
}

export default ApiProvider
export { useApiContext }