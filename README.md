# U-remont
[Макет](https://www.figma.com/file/QAjPyqFaF6l1i9jn2OYrsQ/Сайт-%7C-Ю-Ремонт?node-id=322%3A152&t=5dAD3olscrbF8c86-0)

## Issues
- [ ] Несколько масок телефонынх не сделать

## Учесть

### Адаптация
- [ ] Плашки и края фоток без важных деталей обрезать на малых разрешениях
- [ ] У попапов сверху отступ 100 пк

### Блок отдельные виды работ
- [ ] Кликабелен только подчеркнутый текст
- [ ] «Тут в одной карточке название кнопки отличается, так должно быть, потому что она открывается другую форму.»

### Карта
-[ ] По клику не увеличивается


## Gulp

`gulp` — запустить дев сервер.
`gulp convertImages` — оптимизирует картинки и помещает их в папку convert-images
`prod`

`prodCopyImages`

## Функционал сборки

### Общие

- Функционал Gulp (`gulp`)
- Создание локального сервера и его автоматическое обновление, при изменении содержимого файлов (`browser-sync`, `del`)
- Уведомление об ошибках (`gulp-plumber`, `gulp-notify`)

### HTML

- Возможность использования шаблонов (`gulp-file-include`)
- Решение проблемы кеширования файлов (`gulp-version-number`)
- Автоматическая замена тегов img на picture для использования webp (`gulp-webp-html-nosvg`)

### CSS

- Препроцессор SASS (`gulp-sass`, `sass`)
- Минимизация CSS (`gulp-clean-css`, `gulp-rename`)
- Автопрефиксы для CSS (`gulp-autoprefixer`)
- Объединение одинаковых медиа-запросов в один (`gulp-group-css-media-queries`)
- Возможность использования webp изображений указанных в теге background-img (`gulp-webpcss`)

### JavaScript

- Синтаксис ES6 для JavaScript (`webpack-stream`, `webpack`)

### Медиа

- Оптимизация и сжатие изображений (`gulp-imagemin`)
- Конвертация в webp (`gulp-webp`)

## Что еще можно сделать для сборки

- Добавить отдельную задачу для компиляции изображений
- Общие плагины объединить в один файл
- Создание svg-спрайта
- Конвертация шрифтов из ttf и otf в woff и woff2
