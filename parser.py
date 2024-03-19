import time
from gdz import GDZ
from models import sqlalchemy

gdz = GDZ()


async def get_subject(subject_id: int):
    subjects = list(filter(lambda subject: subject.id == subject_id, gdz.subjects))
    if not subjects:
        return None

    return subjects[0]


async def parse_data(image_saver, book_count: int = 100):
    time_start = time.time()
    books = gdz.books[0:book_count]

    print('[!] Начало парсинга книг!')

    for book in books:
        print(f'[-] Парсинг: {book.title}')

        try:
            book_subject = await get_subject(book.subject_id)
            if not book_subject:
                continue

            subject = sqlalchemy.Subject.fetch_or_create(title=book_subject.title)[0]

            book_model, is_created = sqlalchemy.Book.fetch_or_create(
                title=book.title,
                classes=book.classes,
                authors=book.authors,
                year=book.year,
                description=book.description,
                publisher=book.publisher,
                subject_id=subject.id,
                search_keywords=book.search_keywords,
                subtype=book.subtype,
                cover_url=(
                    await image_saver(
                        book.cover_url or book.cover.url,
                        f'{book.title}_cover.jpg'
                    )
                )
            )

            if is_created:
                book_structure = gdz.book_structure(book)
                for structure in book_structure:
                    part = sqlalchemy.Part.create(
                        title=structure.title,
                        book_id=book_model.id
                    )

                    for task in structure.tasks:
                        task_extended = gdz.task_extended(task)

                        images = list(image for image in task_extended.editions[-1].images)

                        task = sqlalchemy.Task.create(
                            title=task.title,
                            description=task.description,
                            part_id=part.id
                        )

                        for index, image in enumerate(images):
                            sqlalchemy.TaskImage.create(
                                task_id=task.id,
                                url=(
                                        await image_saver(
                                            image.url,
                                            f'{book.title}_{task.title}_{index}.jpg'
                                        )
                                )
                            )

        except (Exception, BaseException) as e:
            print(f'[!] Exception: {e}')

    print(f'[!] Конец парсинга: {time.time() - time_start} секунд.')


