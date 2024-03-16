import React, { useEffect, useState } from "react";
import Root from '../Root';
import { Spin } from 'antd';
import BookCardList from "../../components/BookCardList/BookCardList";
import { useLocation, useNavigate } from "react-router-dom";
import { useApiContext } from "../../providers/ApiProvider";
import { TBook } from "../../Types";
import { LoadingOutlined } from "@ant-design/icons";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import Page404 from "../Page404/Page404";


interface IBooksProps {

}



const Books: React.FC<IBooksProps> = () => {
    const { state }: any = useLocation()
    const { useBooks }: any = useApiContext()
    const navigate = useNavigate()

    const [books, booksAreLoading] = useBooks()

    const onTabChange = (activeKey: string) => {
        return navigate(`.`, { state: {...state, subject: activeKey}, replace: true})
    }

    return (
        <Root>
            <>
                {
                    booksAreLoading ? (
                        <LoadingIndicator loading={true} asBlock />
                    ) : (
                        <BookCardList books={books} grade={state?.grade} subject={state?.subject} onTabChange={onTabChange} />
                    )
                }
            </>
        </Root>
    )
}

export default Books