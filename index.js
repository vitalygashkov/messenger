var app = require('express')();
var http = require('http').Server(app);
var client = require('socket.io')(http);
const mongo = require('mongodb').MongoClient;

/**
 * Обработка главной страницы приложения.
 */
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Connect to mongo
mongo.connect('mongodb://127.0.0.1/chat', function(err, db){
    if(err){
        throw err;
    } else {
        console.log('[INFO] MongoDB connected...');
    }

    // Connect to Socket.io
    client.on('connection', function(socket){
        let chat = db.collection('messages');
        let users = db.collection('users');

        // Get messages from collection and send to output
        chat.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }
            console.log('[DATA] Messages: ', res);

            // Emit the messages
            socket.emit('output', res);
        });

        // Get users from collection
        users.find().limit(100).sort({_id:1}).toArray(function(err, res){
            if(err){
                throw err;
            }
            console.log('[DATA] Users: ', res);
        });

        // Handle join events
        socket.on('join', function(data){
            let name = data.name;
            let pass = data.pass;
            let idBtn = data.btn;

            // Checking user
            users.findOne({name: name}).then((user_search) => {
                if (idBtn === 'loginBtn' && user_search !== null && user_search.name === name && user_search.pass === pass) {
                    // If user already registered
                    socket.emit('auth', [data]);
                    client.emit('status', name + ' joined the chat');
                    console.log('[INFO] ' + name + ' has been logged');
                } else if (idBtn === 'registerBtn' && user_search == null) {
                    // If user isn't registered
                    // Adding user to DB
                    users.insertOne({name: name, pass: pass}, function(){
                        socket.emit('auth', [data]);
                        client.emit('status', name + ' joined the chat first time!');
                        console.log('[INFO] ' + name + ' has been registered');
                    });
                } else {
                    // If
                    socket.emit('auth', '');
                    console.log('[INFO] Login attempt')
                }
            });
        });

        // Handle input events
        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;

            // Check for name and message
            if(name == '' || message == ''){
                // Send error status
            } else {
                // Insert message
                chat.insertOne({name: name, message: message}, function(){
                    client.emit('output', [data]);
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.deleteMany({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
            // Remove all users from collection
            users.deleteMany({});
        });
    });
});

/**
 * Запуск приложения.
 */
http.listen(3000, function(){
    console.log('[INFO] Server started...');
});
