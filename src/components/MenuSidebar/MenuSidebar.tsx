import React, { useEffect, useState } from "react"
import { Menu, Skeleton, Spin } from 'antd';
import type { MenuProps } from "antd";
import { BulbOutlined, LoadingOutlined } from "@ant-design/icons";
import { Subject, TBook } from "../../Types";

import './MenuSidebar.less';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
    onClick?: () => void
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
        onClick
    } as MenuItem;
}

const groupBy = (books: any[], field: string) => (
    books.reduce((accumulator, book) => {
        const bookField = book[field]
        if (Array.isArray(bookField)) {
            bookField.forEach(
                (element) => {
                    if (!accumulator[element]) accumulator[element] = []
                    accumulator[element].push(book)
                }
            )

        } else {
            if (!accumulator[bookField]) accumulator[bookField] = []
            accumulator[bookField].push(book)
        }
       
        return accumulator;
    }, {})
)


interface IMenuSidebarProps {
    books: TBook[]
    loading?: boolean
    onMenuSelect: (info: any) => any
}

interface IBooksByGrade {
    [key: string]: TBook[]
}

const MenuSidebar: React.FC<IMenuSidebarProps> = ({
    books,
    loading,
    onMenuSelect
}) => {
    const [booksByGrades, setBooksByGrades] = useState<IBooksByGrade>(groupBy(books, 'classes'))

    useEffect(() => {
        setBooksByGrades(groupBy(books, 'classes'))
    }, [books])

    // if (loading) {
    //     return <Skeleton paragraph></Skeleton>
    // }
    // if (loading) {
    //     return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} className="loading-indicator"/>
    // }

    return (
        <Skeleton loading={loading} active paragraph={{rows: 11, width: '100%'}} className="skeleton-sidebar">
            <Menu
                selectedKeys={[]}
                selectable={false}
                className='menu'
                items={Object.entries(booksByGrades).map(
                    ([grade, books]: any) => (
                        getItem(
                            `${grade} класс`, 
                            `${grade}grade`, 
                            <BulbOutlined />,
                            [...Array.from(new Set(books.map((el: any) => el.subject.title))).map(
                                (subject: any) => getItem(
                                    subject, 
                                    `${grade}-${subject}`,
                                    undefined,
                                    undefined,
                                    undefined
                                )
                            )]
                        )
                    )   
                )}
                onClick={onMenuSelect}
            />
        </Skeleton>
    )
}


export default MenuSidebar