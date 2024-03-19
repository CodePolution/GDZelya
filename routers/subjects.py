import fastapi
from models import sqlalchemy


router = fastapi.APIRouter(
    prefix='/subjects'
)

SUBJECT_NOT_FOUND = fastapi.exceptions.HTTPException(
    status_code=404,
    detail='Предмет не найден!'
)


@router.get('/')
async def get_subjects():
    """
    Выводит все школьные предметы с БД
    """

    subjects = sqlalchemy.Subject.fetch_all()
    return subjects


@router.get('/{subject_id}/')
async def get_subject(subject_id: int):
    """
    Выводит школьный предмет по его ID
    """

    subject = sqlalchemy.Subject.fetch_one(id=subject_id)

    if not subject:
        raise SUBJECT_NOT_FOUND

    return subject

