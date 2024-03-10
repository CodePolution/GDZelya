import React from "react";
import Root from '../Root';
import BookCardList from "../../components/BookCardList/BookCardList";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiContext } from "../../providers/ApiProvider";


interface IBooksProps {

}



const Books: React.FC<IBooksProps> = () => {
    const { state }: any = useLocation()
    const { getBooks }: any = useApiContext()
    const navigate = useNavigate()

    const books = getBooks()
    const bookCardListProps = !!state ? {books, ...state, grade: state.grade || 1} : {books, grade: 1}

    const onTabChange = (activeKey: string) => {
        return navigate(`.`, { state: {...state, subject: activeKey}, replace: true})
    }

    return (
        <Root>
            <>
                <BookCardList {...bookCardListProps} onTabChange={onTabChange} />
            </>
        </Root>
    )
}

export default Books