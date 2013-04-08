require.config({
	baseUrl: "../",
    paths: {
        'socket_io' : '/socket.io/socket.io',
        'jquery'    : '/Raclette/jQuery'
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
require(["Raclette/GameLoop"], function(gameloop) {
	gameloop.init();
	gameloop.run();
});