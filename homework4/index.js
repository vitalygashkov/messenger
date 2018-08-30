var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/**
 * Обработка главной страницы приложения.
 */
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


// @todo: Добавьте код сюда...


/**
 * Запуск приложения.
 */
http.listen(3000, function(){
    console.log('Server started on port 3000');
});
