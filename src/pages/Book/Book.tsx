import { Navigate, redirect, useLocation, useParams } from "react-router-dom";
import Root from "../Root";
import BookPartList from "../../components/BookTaskList/BookTaskList";
import { Image, Statistic, Tag, Typography, Card, Divider } from "antd";

import './Book.less';
import { useApiContext } from "../../providers/ApiProvider";
import Page404 from "../Page404/Page404";


const Book = () => {
    const { bookId }: any = useParams()
    const { getBook }: any = useApiContext()
    const book = getBook({id: parseInt(bookId)})

    if (!book) {
        return <Page404 />
    }

    return (
        <Root>
            <>
                <div className="book-cover">
                    <div className="book-image">
                        <Image src={book.image} width={200} />
                    </div>

                    <div className="book-info">
                        <Typography.Title level={4}>{book.title}</Typography.Title>

                        <div className="book-tags">
                            <Tag color="green">
                                {book.subject}
                            </Tag>

                            <Tag>
                                {book.publisher}
                            </Tag>

                            <Tag color="cyan">
                                {`${book.grades.join(', ')} класс`}
                            </Tag>
                        </div>

                        <Typography.Text
                            className="book-description"
                        >
                            {book.description}
                        </Typography.Text>

                        <div className='book-statistics-wrapper'>
                            <div className="book-statistics">
                                <Statistic title='Кол-во задач' value={200} />
                                <Divider type="vertical" />
                                <Statistic title='Кол-во частей' value={book.parts.length} />
                            </div>
                        </div>
                        
                    </div>
                </div>

                <BookPartList parts={book.parts} tasks={book.tasks}/>
            </>
        </Root>
    )
}

export default Book