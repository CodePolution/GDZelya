import { createContext, useContext } from "react";
import { subjects, booksInitial } from "../TestingData";

const ApiContext = createContext<Object>({})


interface IApiProviderProps {
    children?: React.ReactElement
}

interface IArgs {
    [key: string]: any
}


const useApiContext = () => {
    const context = useContext(ApiContext)
    
    if (!context) {
        throw new Error(
            'Данный контекст используется вне ApiContext.Provider.'
        )
    }

    return context
}


function filterObjectByEntries<ResponseType extends IArgs>(object: ResponseType, filterEntries: [string, any]) {
    const [key, value] = filterEntries

    if (Array.isArray(value)) {
        return object[key].some(
            (element: any) => value.includes(element)
        )
    } else {
        return object[key] === value
    }
}


const ApiProvider: React.FC<IApiProviderProps> = ({children}) => {
    
    function filterArrayResponse<ResponseType extends IArgs>(array: ResponseType[], args?: Partial<ResponseType>) {
        if (!args) {
            return array
        }

        let arrayFiltered: ResponseType[] = []

        for (const [key, value] of Object.entries(args)) {
            arrayFiltered = [
                ...arrayFiltered, 
                ...array.filter(
                    (element) => filterObjectByEntries<ResponseType>(element, [key, value])
                )
            ]
        }

        return arrayFiltered
        
    }

    const getBooks = (args?: any) => {
        return filterArrayResponse(booksInitial, args)
    }

    const getBook = (args?: any) => {
        return getBooks(args)[0] || null
    }

    const getSubjects = () => {
        return subjects
    }

    const getGrades = () => {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    }


    return (
        <ApiContext.Provider value={{
            getBooks,
            getSubjects,
            getBook
        }}>
            {children}
        </ApiContext.Provider>
    )
}

export default ApiProvider
export { useApiContext }