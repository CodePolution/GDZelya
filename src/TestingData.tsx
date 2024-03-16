


const subjects = [
    'Английский язык',
    'Русский язык',
    'Литература',
    'Обществознание',
    'Естествознание',
    'Физика',
    'Химия',
    'Биология',
    'Информатика',
    'ОБЖ'
]

const booksInitial = [
    {
        id: 1,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/936/0000/gdz-1-class-matematika-moro.jpg',
        authors: ['М.И Моро', 'С.И. Волкова'],
        publisher: 'Просвещение',
        parts: [1, 2],
        description: 'Описание учебника русского языка',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 2,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 3,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 4,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 5,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 6,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 7,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 8,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 9,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука', 'Г.В. Дорофеев', 'Г.В. Дорофеев', 'Г.В. Дорофеев', 'Г.В. Дорофеев', 'Г.В. Дорофеев', 'Г.В. Дорофеев', 'Г.В. Дорофеев', 'Г.В. Дорофеев',],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 10,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 11,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 12,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 13,
        title: 'Математика 1 класс',
        image: 'https://gdz.ru/attachments/images/covers/000/011/888/0000/gdz-1-class-matematika-dorofeev.jpg',
        authors: ['Г.В. Дорофеев', 'Т.Н. Миракова', 'Т.Б. Бука'],
        publisher: 'Перспектива',
        parts: [1, 2],
        description: 'Описание учебника математики',
        subject: 'Математика',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 14,
        title: 'Школа России Русский Язык',
        image: 'https://gdz.ru/attachments/images/covers/000/011/936/0000/gdz-1-class-matematika-moro.jpg',
        authors: ['М.И Моро', 'С.И. Волкова'],
        publisher: 'Вентана Граф',
        parts: [1, 2, 3, 4],
        description: 'Описание учебника русского языка',
        subject: 'Русский язык',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [1]
    },

    {
        id: 15,
        title: 'Английский язык Spotlight',
        image: 'https://imo2.my-shop.ru/products483/4823985/cover.jpg/500-0',
        authors: ['Н. Быкова', 'В. Эванс', 'Д. Дули', 'М. Поспелова'],
        publisher: 'Просвещение',
        parts: [1, 2],
        description: 'Описание учебника русского языка',
        subject: 'Английский язык',
        search_keywords: 'английский 2 класс просвещение моро волкова м.и с.и',
        grades: [2]
    },

    {
        id: 16,
        title: 'Английский язык Spotlight',
        image: 'https://imo2.my-shop.ru/products483/4823985/cover.jpg/500-0',
        authors: ['Н. Быкова', 'В. Эванс', 'Д. Дули', 'М. Поспелова'],
        publisher: 'Просвещение',
        parts: [1, 2],
        description: 'Описание учебника русского языка',
        subject: 'Русский язык',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [2]
    },

    {
        id: 17,
        title: 'Английский язык Spotlight',
        image: 'https://imo2.my-shop.ru/products483/4823985/cover.jpg/500-0',
        authors: ['Н. Быкова', 'В. Эванс', 'Д. Дули', 'М. Поспелова'],
        publisher: 'Просвещение',
        parts: [1, 2],
        description: 'Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка Описание учебника русского языка',
        subject: 'Английский язык',
        search_keywords: 'математика 1 класс просвещение моро волкова м.и с.и',
        grades: [3]
    },
]


export { booksInitial, subjects }