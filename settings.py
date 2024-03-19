import os

# Рабочий каталог проекта
BASE_DIR = os.path.dirname(__file__)

# Режим отладки
DEBUG = bool(os.getenv('DEBUG', True))

# Директория для хранения статических файлов
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Директория для хранения загружаемого контента
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Ссылка на хранилище файлов
MEDIA_URL = 'media'

# Путь подключения к БД
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql+pg8000://kirill:1234@localhost:5433/gdz')

# Кол-во учебников для парсинга
BOOK_PARSE_COUNT = int(os.getenv('BOOK_PARSE_COUNT', 100))

# Дропать БД при каждом запуске
DROP_DATABASE_ON_STARTUP = bool(os.getenv('DROP_DATABASE_ON_STARTUP', False))
