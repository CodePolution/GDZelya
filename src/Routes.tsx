import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Root from './pages/Root';
import Page404 from './pages/Page404/Page404';
import About from './pages/About/About';
import ApiProvider from './providers/ApiProvider';
import Books from './pages/Books/Books';
import Book from './pages/Book/Book';
import Search from './pages/Search/Search';



const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route
                path='/books/'
                element={<ApiProvider><Books /></ApiProvider>}
            />

            <Route
                path='/books/:bookId/'
                element={<ApiProvider><Book /></ApiProvider>}
                errorElement={<ApiProvider><Page404/></ApiProvider>}
            />

            <Route 
                path='/base/'
                element={<ApiProvider><Root /></ApiProvider>}
            />

            <Route 
                path='/about/'
                element={<ApiProvider><About /></ApiProvider>}
            />

            <Route
                path='/search/'
                element={<ApiProvider><Search/></ApiProvider>}
            />

            <Route 
                path='*'
                element={<ApiProvider><Page404/></ApiProvider>}
            />
        </Routes>
    </BrowserRouter>
)

export default AppRoutes;

