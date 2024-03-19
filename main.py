from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from parser import parse_data
from routers import books, tasks, subjects
import os
import random
import aiohttp
import fastapi
import uvicorn
import settings
import asyncio


app = FastAPI(
    debug=settings.DEBUG,
    title='GDZelya'
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


loop = asyncio.get_event_loop()


MEDIA_NOT_FOUND = fastapi.exceptions.HTTPException(
    status_code=404,
    detail='Медиа-файл не найден!'
)

app.include_router(
    books.router
)

app.include_router(
    tasks.router
)

app.include_router(
    subjects.router
)


async def save_image(image_url: str, file_name: str = None) -> str:
    """
    Загружает фото по ссылке на локалку в папку media.
    После загрузки возвращает ссылку на фото из локалки.
    """

    try:
        file_name = file_name or f'image_{random.randint(100, 10000000)}.jpg'
        save_path = f"{settings.MEDIA_ROOT}/{file_name}"

        if os.path.exists(save_path):
            return f'http://localhost:8000/media/{file_name}'

        async with aiohttp.ClientSession(
            headers={'User-Agent': 'okhttp/3.10.0'},
            connector=aiohttp.TCPConnector(verify_ssl=False)
        ) as session:
            async with session.get(image_url) as data:
                image_binary = await data.read()

                with open(save_path, 'wb') as f:
                    f.write(image_binary)

                return f'http://localhost:8000/media/{file_name}'
    except (Exception, BaseException):
        print('[!] Ошибка загрузки фото: ', image_url)


async def on_startup():
    """
    Функция, которая запускается при запуске
    """

    if not os.path.exists(settings.MEDIA_ROOT):
        os.mkdir(settings.MEDIA_ROOT)

    await parse_data(image_saver=save_image, book_count=settings.BOOK_PARSE_COUNT)


@app.get('/media/{file_path:path}/')
async def get_attachment(file_path: str):
    """
    Энд-пойнт для вывода медиа-файлов из БД
    """

    absolute_path = f"{settings.MEDIA_ROOT}/{file_path}"

    if not os.path.exists(absolute_path):
        raise MEDIA_NOT_FOUND

    return fastapi.responses.FileResponse(absolute_path, media_type='image/jpeg')


if __name__ == '__main__':
    loop.run_until_complete(on_startup())
    uvicorn.run(app, host='localhost', port=8000)