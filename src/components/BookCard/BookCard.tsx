import React, {useEffect, useState} from "react";
import {Badge, Card, Col, Segmented, Watermark, Tag, Skeleton } from "antd";

import './BookCard.less';


interface IBookCardProps {
    id: number
    image?: string
    title: string
    description?: string
    authors: string[]
    publisher: string
    parts: number[]
    subject: string,
    grades: Array<number | string>
    search_keywords?: string
    onCardClick?: (props: IBookCardProps) => void
}

const BookCard: React.FC<IBookCardProps> = ({
    id,
    image,
    title,
    description,
    authors,
    publisher,
    parts,
    subject,
    search_keywords,
    grades,
    onCardClick
}) => {
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        setInterval(
            () => setLoading(false),
            1000
        )
    }, []);

    return (
        <Card
            className='book-card'
            hoverable
            loading={loading}
            style={{width: 240}}
            cover={
                <Skeleton loading={loading} paragraph>
                    <img
                        alt="example"
                        src={image}
                    />
                </Skeleton>
            }
            onClick={() => onCardClick?.({id, image, title, description, authors, publisher, parts, subject, grades, search_keywords})}
        >
            <Skeleton loading={loading} active paragraph={false}>
                <Card.Meta title={title} description={
                    <div className='book-card-content'>
                        <div className="book-authors">
                            {authors.join(', ')}
                        </div>
                        
                        <div className="book-tags">
                            <Tag 
                                color="lightgrey"
                                className="publishing-house"
                                style={{color: 'rgb(104, 103, 103)'}}
                            >
                                {publisher}
                            </Tag>
                            
                            <Tag 
                                color="magenta"
                                className="chapters"
                            >
                                Части: {parts.join(', ')}
                            </Tag>
                        </div>
                    </div>
                }/>
            </Skeleton>
            
        </Card>
    )
}

export default BookCard