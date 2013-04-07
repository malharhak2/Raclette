// Config require.js for external libs
require.config({
	baseUrl: "../",
    paths: {
        'socket_io' : '/socket.io/socket.io',
        'jquery'    : '/jQuery'
    },
    shim: {
        'socket_io' : {
            exports: 'io'
        },
        'jquery'    : {
            exports: '$'
        }
    }
});
// Call Game
require(["Raclette/GameLoop"], function(gameloop) {
    console.log(gameloop);
	gameloop.init();
	gameloop.run();
});