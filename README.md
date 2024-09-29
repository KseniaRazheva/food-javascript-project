# food-javascript-project

```
git status 
git add . 
git status 
git commit -m "add/update/return files sass l.61" 
git push -u origin main
```

# json_server

как запустить локальный сервер для get и post запросов <br>
создается файлы: <br>
1. package.json (нужен экспресс, еще добавили нодемон потому что он удобный)
2. index.cjs (в документации написано как создать сервер на библиотеке для Node.js "экспресс" https://expressjs.com/en/starter/hello-world.html , про fileSystem https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs#writing-a-file )
3. db.json (стандарт рест-айпиай, позволяет разделить логику серверную и фронтовую)



<br>
открываю терминал

```
npm install 
```

(в этот момент сама создается папка node_modules и файл package-lock.json)
потом 

```
npm run start 
```

терминал запускает сервер <br>
захожу в браузер пишу http://localhost:3000/ <br>
на сайте отображается то, что написано в файле db.json <br>


создала на гитхабе новый репозиторий <br>
открываю общую папку гитхаба через вскод, надо стянуть изменения

```
git clone https://github.com/KseniaRazheva/json_server.git
```

в моей папке гитхаб на компьютере появилась папка которую я создала на гитхабе и теперь туда можно писать код, а потом комитить

создала .gitignore туда вписала <br>
package-lock.json <br>
/node_modules/


# webpack

что написано в терминале
ksenya@ksenya-PC:/media/ksenya/Files/programming/Local/wp$ npx webpack
asset bundle.js 1.7 KiB [emitted] (name: main) 1 related asset
./src/js/script.js 134 bytes [built] [code generated]
./src/js/main.js 166 bytes [built] [code generated]
webpack 5.94.0 compiled successfully in 172 ms

Перевод сообщения из терминала:
asset bundle.js 1.7 KiB [emitted] (name: main) 1 related asset: Создан файл bundle.js размером 1.7 килобайта. Этот файл является главным результатом сборки (main asset) и включает в себя 1 связанный ресурс.
./src/js/script.js 134 bytes [built] [code generated]: Файл script.js из директории src/js был успешно скомпилирован (built) и в него был сгенерирован код.
./src/js/main.js 166 bytes [built] [code generated]: Файл main.js из директории src/js был успешно скомпилирован (built) и в него был сгенерирован код.
webpack 5.94.0 compiled successfully in 172 ms: Webpack версии 5.94.0 успешно выполнил сборку проекта за 172 миллисекунды.
В целом, сообщение означает, что сборка проекта прошла успешно. Webpack скомпилировал исходные файлы script.js и main.js в единый файл bundle.js.

как я это сделала
файл вебпак ВНЕ src (там где пекедж.джейсон или пекедж-лок.джейсон)

мэйн.джээс функция и module.exports = myModule;
скрипт.джээс 
присваиваю значение переменной myModule = функция для импорта модулей (путь к модулю, точка означает что модуль находится в той же директории что и текущий файл, мэйн - имя файла модуля)
через переменную myModule могу использовать функции, переменные и другие экспортированные элементы из модуля мэйн

была проблема с путями в вебпак.конфиг.джээс
mode: “development”
entry это вход
там указывается путь на файл в котором прописаны все связи (переменные и вызовы) ссылки на отдельные модули (на те кусочки которые в папке modules)

output это выход
на выходе я хочу создать файл бандл.джээс
и указываю на него путь имя директории 
/media/ksenya/Files/programming/Local/wp/ где лежит файл webpack.config.js + dist


