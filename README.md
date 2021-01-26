# ui

Сначала установи yarn.

## Docker

Так как пока нет образа на `gitregistry.infostrategic.com/hsecharity`, то я собирала ручками вот так:

```
> docker build . -t ui:latest
```

Именно `ui:latest` image используется в docker-compose.yml. Добавила туда также пока api, db, seeds, не добавляла Илью.

Все контейнеры запускает

```
> docker-compose up
```

WARN: Почему-то не накатываются seeds.

Осталось: присоединить Илью и проверить CI.

## Разработка

React, Redux, Typescript, ESLint, Prettier

## Команды

Установи зависимости из корневой папки проекта `/ui`

### `yarn install`

Запусти проект на `localhost:3000`

### `yarn dev`

Конфиги находятся в `openapitools.json`, `swagger.json` и `config.yaml`.

Для кодогенерации запусти

### `yarn codegen`

Перед каждым коммитом (пушем) прогони кодстайл (git pre-commit hooks почему-то плохо справляются с этим)

### `yarn fix`
