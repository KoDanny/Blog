# BLOG

Области хранения данных:

- база данных на json-server
- BFF
- Redux Store

Сущности приложения:

- Пользователь: БД(список пользователей), BFF(сессия текущего), Srore(отображение)
- Роль пользователя: БД(список ролей), BFF(сессия пользователя с ролью), Store(использование)
- Статья: БД(Список статей), Store(отображение)
- Комментарий: БД(список комментариев), Store(отображение)

Таблицы БД:

- Пользователи - users:
  -id / login / password / registed_at / role_id
- Роли - roles:
    - id / name
- Статьи - posts:
    - id / title / image_url / content / published_at
- Комментарии - comments:
    - id / author_id / post_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для Redux Store

- user: id / login / roleId
- posts: [id / title / imageUrl / publishedAt / commentsCount]
- post: id / title / imageUrl / publishedAt / commentsCount / content / comments[id / author / content / publishedAt]
- users [id / login / registeredAt / role]
