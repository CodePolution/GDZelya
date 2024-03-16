import { Navigate, redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import Root from "../Root";
import BookTaskList from "../../components/BookTaskList/BookTaskList";
import { Image, Statistic, Tag, Typography, Card, Divider, Spin } from "antd";

import './Book.less';
import { useApiContext } from "../../providers/ApiProvider";
import Page404 from "../Page404/Page404";
import BookHeading from "../../components/BookHeading/BookHeading";
import { TBook, TTask } from "../../Types";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";


const Book = () => {
    const { bookId }: any = useParams()
    const { useBook }: any = useApiContext()
    
    const [book, bookIsLoading] = useBook((book: TBook) => book.id == bookId)
    
    const navigate = useNavigate()

    const handleTaskClick = (task: TTask) => {
        if (!!book) return navigate(`/books/${book.id}/${task.id}/`)
    }

    if (!book && !bookIsLoading) {
        return <Page404 />
    }

    return (
        <Root>
            <>
                {
                    bookIsLoading ? (
                        <LoadingIndicator loading={true} asBlock />
                    ) : (
                        <>
                            <BookHeading {...book} />
                            <BookTaskList parts={book.parts} onTaskClick={handleTaskClick}/>
                        </>
                    )
                }
            </>
        </Root>
    )
}

export default Book