import { useRoutes } from 'react-router-dom';
import Root from './pages/Root';
import Page404 from './pages/Page404/Page404';
import About from './pages/About/About';
import Books from './pages/Books/Books';
import Book from './pages/Book/Book';
import Search from './pages/Search/Search';
import BookTask from './pages/BookTask/BookTask';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { ExclamationCircleOutlined, HomeOutlined, MenuOutlined, ReadOutlined } from "@ant-design/icons";
import { useApiContext } from './providers/ApiProvider';
import { TBook } from './Types';
import Index from './pages/Index/Index';
import OurProjects from './pages/OurProjects/OurProjects';
import Support from './pages/Support/Support';

const HomeBreadcrumb = ({}) => (
    <>
        <HomeOutlined />
        <span>Главная</span>
    </>
)

const BooksBreadcrumb = ({ location: { state } }: any) => (
    <>
        <MenuOutlined />
        <span>{state?.subject || 'Книги'}</span>
    </>
)

const BookBreadcrumb = ({ match }: any) => {
    const params = match.params
    const { useBook }: any = useApiContext()
    const [book, bookIsLoading] = useBook((book: TBook) => book.id == params.bookId)

    if (bookIsLoading) {
        return <span>Загрузка...</span>
    }

    if (!bookIsLoading && !book) {
        return <>
            <ExclamationCircleOutlined />
            <span>Ошибка</span>
        </>
    }

    return <>
        <ReadOutlined />
        <span>{book?.title}</span>
    </>
}

const Pages = [
    {
        path: '/',
        children: [
            {
                index: true,
                Component: Index,
                breadcrumb: HomeBreadcrumb
            },

            {
                path: 'base',
                Component: Root,
                breadcrumb: 'Базовый шаблон'
            },
        
            {
                path: 'about',
                Component: About,
                breadcrumb: 'О Нас'
            },
        
            {
                path: 'search',
                Component: Search,
                breadcrumb: 'Поиск'
            },

            {
                path: 'our-projects',
                Component: OurProjects,
                breadcrumb: 'Наши проекты'
            },

            {
                path: 'support',
                Component: Support,
                breadcrumb: 'Наши проекты'
            },
        
            {
                path: 'books',
                children: [
                    {
                        index: true,
                        Component: Books,
                        breadcrumb: BooksBreadcrumb
                    },

                    {
                        path: ':bookId',
                        children: [
                            {
                                index: true,
                                Component: Book,
                                breadcrumb: BookBreadcrumb
                            },

                            {
                                path: ':taskId',
                                Component: BookTask,
                                breadcrumb: 'Задание'
                            }
                        ]
                    }
                ]
            },

            {
                path: '*',
                Component: Page404,
                breadcrumb: '404'
            },
            
        ]
    },
]


const AppRoutes = () => {
    return useRoutes(Pages)
}

const Breadcrumbs = () => useBreadcrumbs(Pages)

export default AppRoutes;
export { Breadcrumbs }

