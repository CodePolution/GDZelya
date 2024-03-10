import React, {useState, useReducer, useRef, MouseEventHandler } from "react";
import { Layout, Space, Input, Breadcrumb, Button, Menu, Result, Avatar, Flex, Tooltip } from "antd";
import { HomeOutlined, BulbOutlined, GithubOutlined, JavaScriptOutlined, PythonOutlined, DockerOutlined } from "@ant-design/icons";
import { redirect, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import type { MenuProps } from 'antd';


import './Index.less';
import { TooltipPlacement } from "antd/es/tooltip";
import { useApiContext } from "../providers/ApiProvider";


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


function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}


interface IRootProps {
    hideSidebar?: boolean
    children?: React.ReactElement
}


interface Person {
    image?: string
    name: string
    profileLink?: string
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


const people: Person[] = [
    {
        image: 'https://avatars.githubusercontent.com/u/53063665?v=4',
        name: 'MeldyTheCoder',
        profileLink: 'https://github.com/MeldyTheCoder/'
    },

    {
        image: 'https://avatars.githubusercontent.com/u/146676744?v=4',
        name: 'BaldurusExspa',
        profileLink: 'https://github.com/BaldurusExspa'
    },

    {
        image: 'https://avatars.githubusercontent.com/u/116942223?v=4',
        name: 'skeletus-design',
        profileLink: 'https://github.com/skeletus-design'
    },

    {
        image: 'https://avatars.githubusercontent.com/u/116428584?v=4',
        name: 'adeqoou',
        profileLink: 'https://github.com/adeqoou'
    },

    {
        image: 'https://avatars.githubusercontent.com/u/109819070?v=4',
        name: 'n0maCi',
        profileLink: 'https://github.com/n0maCi'
    },

    {
        image: 'https://avatars.githubusercontent.com/u/116428617?v=4',
        name: 'Platina1337',
        profileLink: 'https://github.com/Platina1337'
    },

    {
        image: 'https://avatars.githubusercontent.com/u/118039796?v=4',
        name: 'vanilnic',
        profileLink: 'https://github.com/vanilnic'
    },

    {
        image: 'https://avatars.githubusercontent.com/u/119161155?v=4',
        name: 'queriikk',
        profileLink: 'https://github.com/qweriikk'
    }
]

const renderAvatar = (person: Person, size?: string | number, tooltipPos?: string) => {
    size = size || 'small'
    const props = {}

    !!person.image && Object.assign(props, {src: person.image})
    !!person.name && Object.assign(props, {children: person.name.at(0)?.toUpperCase()})
    !!person.profileLink && Object.assign(props, {onClick: () => window.open(person.profileLink, '_blank')})
    !!size && Object.assign(props, {size: size})
    
    return (
        <Tooltip title={person.name} placement={(tooltipPos as TooltipPlacement)}>
            <Avatar {...props} className="contibutor-avatar"/>
        </Tooltip>
    )
}

const Root: React.FC<IRootProps> = ({children, hideSidebar}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>()
    const { getBooks }: any = useApiContext()

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const navigate = useNavigate()

    const booksByGrades = groupBy(getBooks(), 'grades')

    const items: MenuProps['items'] = Object.entries(booksByGrades).map(
            ([grade, books]: any) => (
                getItem(
                    `${grade} класс`, 
                    `${grade}grade`, 
                    <BulbOutlined />,
                    [...Array.from(new Set(books.map((el: any) => el.subject))).map(
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
    );
    
    const breadcrumbs = [
        {
            href: '/',
            title: (
                <>
                    <HomeOutlined/>
                    <span>Главная</span>
                </>
            ),
        },
        {
            href: '/general/',
            title: 'Основная'
        }
    ]

    const onMenuSelect = (info: any) => {
        const [grade, subject] = info.key.split("-").slice(0, 2)
        console.log(grade, subject)
        navigate('/books/', { state: { subject, grade, key: getRandomInt(1000) }, replace: true })
        forceUpdate()
    }

    const handleSearchButtonClick = (event: any) => {
        if (!!searchQuery) {
            return navigate(`/search/?q=${searchQuery}`)
        }
    }

    return (
        <Layout className='app-layout ant-app'>
            <Layout.Header className='header'>
                <Space size='small' className='app-branding'>
                    <Avatar
                        src='https://media.discordapp.net/attachments/915590684357038133/1214641819904643112/gJql9lBPRq-KqR3bBsBocw.png?ex=65f9da58&is=65e76558&hm=a23a0c67901b15191c3b1d62f97cb71fe85f925cf4e191171373921682933588&=&format=webp&quality=lossless&width=350&height=350'
                        size='large'
                        className='app-logo'
                    />
                    <h3>GDZelya</h3>
                </Space>

                <Space size='small' className='search-bar'>
                    <Input 
                        placeholder='Поиск...' 
                        className='search-input' 
                        onChange={({target}) => setSearchQuery(target.value)}
                        onPressEnter={handleSearchButtonClick}
                    />
                    <Button onClick={handleSearchButtonClick} icon={<SearchOutlined />}>Поиск</Button>
                </Space>
            </Layout.Header>

            <Layout.Content className='content-wrapper'>
                <Layout className='content-layout'>
                    {!hideSidebar && 
                        <Layout.Sider className='sidebar'>
                            <Menu
                                selectedKeys={[]}
                                selectable={false}
                                className='menu'
                                items={items}
                                onClick={onMenuSelect}
                            />
                        </Layout.Sider>
                    }

                    <Layout.Content className='content-wrapped'>
                        <div className='content'>
                            <Breadcrumb className='breadcrumbs' items={breadcrumbs}/>

                            <div className='content-root'>
                                {children}
                            </div>
                        </div>
                    </Layout.Content>
                </Layout>

            </Layout.Content>

            <Layout.Footer className='footer'>
                <div className='footer-menu'>
                    <Space size='small' className='menu-links'>
                        <Avatar
                            src='https://media.discordapp.net/attachments/915590684357038133/1214641819904643112/gJql9lBPRq-KqR3bBsBocw.png?ex=65f9da58&is=65e76558&hm=a23a0c67901b15191c3b1d62f97cb71fe85f925cf4e191171373921682933588&=&format=webp&quality=lossless&width=350&height=350'
                            size='large'
                        />

                        <a className='menu-link' href="/about/">
                            <span>О Проекте</span>
                        </a>

                        <i className='divider'/>

                        <a className='menu-link'>
                            <span>Наши работы</span>
                        </a>

                        <i className='divider'/>

                        <a className='menu-link'>
                            <span>Поддержка</span>
                        </a>
                    </Space>
                </div>

                <div className='contributors'>
                    {
                        people.map(
                            (person) => renderAvatar(person)
                        )
                    }
                </div>
            </Layout.Footer>
        </Layout>
    )
}

export default Root
export type { Person }
export { people, renderAvatar }