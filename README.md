# ui

Сначала установи yarn (версия 15.5..., не ниже 15).

## node_modules

Из-за того, что в проекте используется компоненты, написанные на `Elm`, был изменен `node_modules/react_scripts/config/webpack.config.json`. Это надо для локальной разработки. Если вдруг какие-то проблемы вида `Elm not found`, то проблема с перезаписавшимся конфигом. В `production` сборке копируется через `volumes` конфиг `webpackConfig.json` после установки всех зависимостей - там точно все ок всегда должно быть.

## Docker

1. Клонируешь к себе dbBuild репозиторий
2. Комментируешь строчку в docker-compose.yaml с ui контейнером

up

```
> docker-compose up
```

down

```
> docker-compose down --remove-orphans -v
```

## Разработка

React, Redux, Typescript, ESLint, Prettier

## Команды

Установи зависимости из корневой папки проекта `/ui`

### `yarn install`

Запусти проект на `localhost:3000`

### `yarn dev`

Конфиги находятся в `openapitools.json`, `swagger.json` и `config.yaml`.

☢️ Будь осторожна с `@generated/base.ts` - там затирается `BASE_PATH` при каждой кодогенерации, приходится возвращать назад.

Также могут быть ошибки компиляции в `@generated` - решается аннотациями `// @ts-ignore`. Работают только на следующую строчку.

Для кодогенерации запусти

### `yarn codegen`

Перед каждым коммитом (пушем) прогони кодстайл (git pre-commit hooks почему-то плохо справляются с этим).

### `yarn fix`
