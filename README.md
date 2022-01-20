# test-task
## Инструкция по запуску
1. Скачать репоиторий
2. Скачать все необходимые пакеты с помощью команды `npm install`
3. Запустить с помощью команды `npm run starn`

##  Описание API методов

### /cats (get)
Вызывает метод `getAllCats()`, метод ничего не принимает, возвращает массив котиков
Пример:
```
{
        "id": 4,
        "name": "Barsik",
        "color": "Black",
        "breed": "british longhair",
        "age": 2,
        "imgLink": "https://w-dog.ru/wallpapers/5/16/293857227813431/britanskaya-korotkosh-rstnaya-britanec-kot-koshka-morda.jpg",
        "price": 100,
        "isBooked": false
    },
    {
        "id": 5,
        "name": "Liza",
        "color": "White",
        "breed": "peterbald",
        "age": 3,
        "imgLink": "https://on-desktop.com/wps/Animals___Cats_White_cat_Peterbald_092313_.jpg",
        "price": 80,
        "isBooked": true
    }
```

### /cats/booked (get)
Вызывает метод `getBookedCats()`, метод ничего не принимает, возвращает массив забронированных котиков
Пример:

```
{
        "id": 5,
        "name": "Liza",
        "color": "White",
        "breed": "peterbald",
        "age": 3,
        "imgLink": "https://on-desktop.com/wps/Animals___Cats_White_cat_Peterbald_092313_.jpg",
        "price": 80,
        "isBooked": true
    }
```


### /cats/available (get)
Вызывает метод `getAvailableCats()`, метод ничего не принимает, возвращает массив свободных котиков.
Пример:
```
{
        "id": 4,
        "name": "Barsik",
        "color": "Black",
        "breed": "british longhair",
        "age": 2,
        "imgLink": "https://w-dog.ru/wallpapers/5/16/293857227813431/britanskaya-korotkosh-rstnaya-britanec-kot-koshka-morda.jpg",
        "price": 100,
        "isBooked": false
}
```
### /cats/:id (get)
Вызывает метод `getCat(@Param("id") id)`, метод принимает id котика, возвращает информацию о котике.
Пример:
```
    "id": 4,
    "name": "Barsik",
    "color": "Black",
    "breed": "british longhair",
    "age": 2,
    "imgLink": "https://w-dog.ru/wallpapers/5/16/293857227813431/britanskaya-korotkosh-rstnaya-britanec-kot-koshka-morda.jpg",
    "price": 100,
    "isBooked": false
```


###  /cats/create (post)
Вызывает метод `create(@Body() createCatDto: CreateCatDto)`, принимает объект типа CreateCatDto, ничего не возвращает.
Пример ввода данных:
```
{
    "name":"Liza",
    "color": "White",
    "breed": "peterbald",
    "age": 3,
    "imgLink": "https://on-desktop.com/wps/Animals___Cats_White_cat_Peterbald_092313_.jpg",
    "price": 80,
    "isBooked": true
    
}
```

### /cats/:id (put)
Вызывает метод `update(@Param("id") id: number, @Body() updateCatDto: UpdateCatDto)`, принимает id котика, информацию о котором нужно обновить, ничего не возвращает.
Пример данных:
```
{
    "price":"300",
    "color": "red"
}
```


### /cats/book/:id (put)
Вызывает метод `bookCat(@Param("id")) id: number)`, принимает id котика, которого нужно забронировать, ничего не возвращает.


### /cats/unbook/:id (put)
Вызывает метод `unBookCat(@Param("id")) id: number)`, принимает id котика, которого нужно разбронировать, ничего не возвращает.

### /cats/:id (delete)
Вызывает метод `deleteCat(@Param("id") id: number)`, принимает id котика, которого нужно удалить, ничего не возвращает.

