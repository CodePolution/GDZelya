import typing

import pydantic
from typing import Union
from datetime import datetime


class PydanticModel(pydantic.BaseModel, extra=pydantic.Extra.ignore):
    """
    Базовая модель
    """


class Subject(PydanticModel):
    """
    Модель валидации школьного предмета
    """

    title: str = pydantic.Field(
        title='Заголовок предмета'
    )


class TaskImage(PydanticModel):
    """
    Модель валидации изображения задачи
    """

    path: str = pydantic.Field(
        title='Путь к изображению задания'
    )


class Task(PydanticModel):
    """
    Модель валидации задания учебника
    """

    title: str = pydantic.Field(
        title='Название задания'
    )

    description: Union[str, None] = pydantic.Field(
        title='Описание задания',
        default=None
    )

    images: list[TaskImage] = pydantic.Field(
        title='Изображения задания'
    )


class Part(PydanticModel):
    """
    Модель валидации раздела книги
    """

    title: str = pydantic.Field(
        title='Название раздела книги'
    )

    tasks: list[Task] = pydantic.Field(
        title='Задачи раздела'
    )


class Book(PydanticModel):
    """
    Модель валидации книги
    """

    title: str = pydantic.Field(
        title='Заголовок книги',
    )

    description: str = pydantic.Field(
        title='Описание книги'
    )

    year: str = pydantic.Field(
        title='Год(ы) написания книги'
    )

    classes: list[int] = pydantic.Field(
        title='Для классов обучения'
    )

    authors: list[str] = pydantic.Field(
        title='Список авторов книги'
    )

    publisher: str = pydantic.Field(
        title='Издатель книги'
    )

    subtype: Union[str, None] = pydantic.Field(
        title='Тип учебника',
        default='Учебник'
    )

    cover_path: Union[str, None] = pydantic.Field(
        title='Путь к обложке картинки',
        default=None
    )

    search_keywords: Union[str, None] = pydantic.Field(
        title='Ключевые слова',
        default=None
    )

    updated_at: Union[str, datetime, None] = pydantic.Field(
        title='Дата последнего обновления книги',
        default_factory=datetime.now
    )

    subject: Subject = pydantic.Field(
        title='Предмет учебника'
    )

    parts: list[Part] = pydantic.Field(
        title='Части книги'
    )


class BookList(pydantic.RootModel):
    root: list[Book]
