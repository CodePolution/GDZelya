import fastapi
from models import sqlalchemy

router = fastapi.APIRouter(
    prefix='/books'
)

BOOK_NOT_FOUND = fastapi.exceptions.HTTPException(
    status_code=404,
    detail='Задание не найдено!'
)


@router.get('/')
async def get_books(start_from: int = 0, end_to: int = 0):
    """
    Выводит список всех книг
    """

    filters = {}

    if start_from:
        filters['id__gte'] = start_from

    if end_to:
        filters['id__lte'] = end_to

    books = sqlalchemy.Book.fetch_all(**filters)
    return books


@router.get('/{book_id}/')
async def get_book(book_id: int):
    """
    Выводит книгу по ID
    """

    book = sqlalchemy.Book.fetch_one(id=book_id)

    if not book:
        raise BOOK_NOT_FOUND

    return book
