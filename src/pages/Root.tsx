import React, {useState, useReducer, useRef, startTransition, useEffect } from "react";
import { Layout, Space, Input, Breadcrumb, Button, Avatar, Tooltip, TourProps, Tour, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { TooltipPlacement } from "antd/es/tooltip";
import { useApiContext } from "../providers/ApiProvider";
import MenuSidebar from "../components/MenuSidebar/MenuSidebar";
import { Breadcrumbs } from "../Routes";

import './Index.less';


interface IRootProps {
    hideSidebar?: boolean
    children?: React.ReactElement
}


interface Person {
    image?: string
    name: string
    profileLink?: string
}


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
    const [searchQuery, setSearchQuery] = useState<string>()
    const { useBooks }: any = useApiContext()

    const [books, booksAreLoading] = useBooks()
    const [showTour, setShowTour] = useState<boolean>(false)
    const breadcrumbMatches = Breadcrumbs()

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const navigate = useNavigate()

    const sidebarRef = useRef(null)
    const breadcrumbsRef = useRef(null)
    const contributorsRef = useRef(null)
    const searchBarRef = useRef(null)
    
    const breadcrumbs = breadcrumbMatches.map(
        ({match, breadcrumb}, index, array) => {
            const title = typeof breadcrumb === 'string' ? <span>{breadcrumb}</span> : breadcrumb

            if (array.length <= index + 1) {
                return {
                    title: breadcrumb
                }
            }

            return {
                href: match.pathname,
                title: title
            }
        }
    )

    
    const steps: TourProps['steps'] = [
        {
            cover: <Image src={`${process.env.PUBLIC_URL}/logo.svg`} width={300} preview={false} />,
            title: 'Добро пожаловать на GDZelya',
            description: 'Давайте проведем инструктаж по сайту.',
            placement: 'center'
        },

        {
            title: 'Меню',
            description: 'Здесь Вы можете выбрать класс и предмет, учебники для которых хотите отобразить на странице.',
            placement: 'right',
            target: () => sidebarRef.current!
        },

        {
            title: 'Навигация',
            description: 'Вы можете следить за своими перемещениями по сайту через панель навигации, а так же вернуть на прошлые страницы.',
            placement: 'bottom',
            target: () => breadcrumbsRef.current!,
        },

        {
            title: 'Поиск учебников',
            description: 'Здесь вы можете найти любой имеющийся учебник, введя запрос в поисковую строку и нажав кнопку "Поиск".',
            placement: 'bottom',
            target: () => searchBarRef.current!,
        },

        {
            title: 'Участники проекта',
            description: 'Здесь находятся участинки и разработчики данного проекта со ссылками на их профили GitHub.',
            placement: 'top',
            target: () => contributorsRef.current!,
        },
    ];

    const onMenuSelect = (info: any) => {
        const [grade, subject] = info.key.split("-").slice(0, 2)
        navigate('/books/', { state: { subject, grade }, replace: true })
        forceUpdate()
    }

    const handleSearchButtonClick = (event: any) => {
        if (!!searchQuery) {
            return navigate(`/search/?q=${searchQuery}`)
        }
    }

    const handleTourClose = () => {
        setShowTour(false)

        setTimeout(() => {
            localStorage.setItem('site', JSON.stringify({showTour: false}))
        }, 100)
    }
    
    useEffect(() => {
        const localData = localStorage.getItem('site')
        const dataParsed = !!localData && JSON.parse(localData)

        setShowTour(!dataParsed || dataParsed['showTour'])
    }, [localStorage.getItem('site')])


    return (
        <Layout className='app-layout ant-app'>
            <Layout.Header className='header'>
                <Space size='small' className='app-branding' onClick={() => navigate('/')}>
                        <img
                            className="site-logo"
                            src={`${process.env.PUBLIC_URL}/logo.svg`}
                        />
                    <h3>GDZelya</h3>
                </Space>

                <Space size='small' className='search-bar' ref={searchBarRef}>
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
                            <div className="sidebar-ref" ref={sidebarRef}>
                                <MenuSidebar books={books} onMenuSelect={onMenuSelect} loading={booksAreLoading}/>
                            </div>
                        </Layout.Sider>
                    }

                    <Layout.Content className='content-wrapped'>
                        <div className='content'>
                            <div className="breadcrumbs-block" ref={breadcrumbsRef}>
                                <Breadcrumb className='breadcrumbs' items={breadcrumbs} />
                            </div>

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
                        <img
                            className="site-logo"
                            src={`${process.env.PUBLIC_URL}/logo.svg`}
                        />

                        <a className='menu-link' href="/about/">
                            <span>О Проекте</span>
                        </a>

                        <i className='divider'/>

                        <a className='menu-link' href='/our-projects/'>
                            <span>Наши работы</span>
                        </a>

                        <i className='divider'/>

                        <a className='menu-link' href="/support/">
                            <span>Поддержка</span>
                        </a>
                    </Space>
                </div>

                <div className='contributors' ref={contributorsRef}>
                    {
                        people.map(
                            (person) => renderAvatar(person)
                        )
                    }
                </div>
            </Layout.Footer>

            <Tour
                open={showTour}
                onClose={handleTourClose}
                steps={steps}
                indicatorsRender={(current: number, total: number) => (
                <span>
                    {current + 1} / {total}
                </span>
            )}
        />

        </Layout>
    )
}

export default Root
export type { Person }
export { people, renderAvatar }