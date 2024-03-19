import fastapi
from models import sqlalchemy

router = fastapi.APIRouter(
    prefix='/tasks'
)

TASK_NOT_FOUND = fastapi.exceptions.HTTPException(
    status_code=404,
    detail='Задание не найдено!'
)


@router.get('/')
async def get_tasks():
    """
    Выводит список всех заданий
    """

    tasks = sqlalchemy.Task.fetch_all()
    return tasks


@router.get('/{task_id}')
async def get_task(task_id: int):
    """
    Выводит задание по ID
    """

    task = sqlalchemy.Task.fetch_one(id=task_id)

    if not task:
        raise TASK_NOT_FOUND

    return task
