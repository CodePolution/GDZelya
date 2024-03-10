import { useSearchParams } from "react-router-dom";
import Root from "../Root";
import { useApiContext } from "../../providers/ApiProvider";
import BookCardList from "../../components/BookCardList/BookCardList";
import { Alert, Empty } from "antd";

import './Search.less';


const Search = () => {
    const [searchParams] = useSearchParams()
    const { getBooks }: any = useApiContext()
    const searchQuery = searchParams.get('q')

    const books = getBooks().filter(
        (book: any) => book.search_keywords?.includes(searchQuery?.toLowerCase())
    )

    console.log(books)

    return (
        <Root>
            <>
                <Alert
                    className="search-info-alert"
                    message={<p><strong>Найдено по результатам запроса:</strong> {searchQuery}</p>} 
                    type="info" 
                    showIcon 
                />
                {
                    !!books && books.length > 0
                    ? <BookCardList books={books} />
                    : <Empty className='search-not-found' description='Ничего не найдено!' />
                }
            </>
        </Root>
    )
}

export default Search