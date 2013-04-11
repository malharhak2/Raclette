require.config({
	baseUrl: "../",
    paths: {
        'rsocket_io'          : '/socket.io/socket.io',
        'jquery'              : '/Raclette/jquery',
        'rAnimation'          : '/Raclette/Animation',
        'rAnimationInstance'  : '/Raclette/AnimationInstance',
        'rAnimationManager'   : '/Raclette/AnimationManager',
        'rbox2d'              : '/Raclette/box2d',
        'rCamera'             : '/Raclette/Camera',
        'rCanvasManager'      : '/Raclette/CanvasManager',
        'rCONFIG'             : '/Raclette/CONFIG',
        'rController'         : '/Raclette/Controller',
        'rControllerKey'      : '/Raclette/ControllerKey',
        'rDebug'              : '/Raclette/Debug',
        'rGame'               : '/Raclette/Game',
        'rGameLoop'           : '/Raclette/GameLoop',
        'rGamepad'            : '/Raclette/Gamepad',
        'rGui'                : '/Raclette/Gui',
        'rimageManager'       : '/Raclette/imageManager',
        'rinputsManager'      : '/Raclette/inputsManager',
        'rInterfaceManager'   : '/Raclette/InterfaceManager',
        'rkeyboardManager'    : '/Raclette/keyboardManager',
        'rLoader'             : '/Raclette/Loader',
        'rmain'               : '/Raclette/main',
        'rMap'                : '/Raclette/Map',
        'rMapCase'            : '/Raclette/MapCase',
        'rMapLoader'          : '/Raclette/MapLoader',
        'rPhysicalObject'     : '/Raclette/PhysicalObject',
        'rPhysicalObjectType' : '/Raclette/PhysicalObjectType',
        'rPhysics'            : '/Raclette/Physics',
        'rRenderer'           : '/Raclette/Renderer',
        'rTile'               : '/Raclette/Tile',
        'rTileset'            : '/Raclette/Tileset',
        'rTilesManager'       : '/Raclette/TilesManager',
        'rutils'              : '/Raclette/utils',
        'rWorld'              : '/Raclette/World',
        'rWorldLayer'         : '/Raclette/WorldLayer',
        'rWorldMapObject'     : '/Raclette/WorldMapObject',
        'rWorldObject'        : '/Raclette/WorldObject',
        'rWorldObjectType'    : '/Raclette/WorldObjectType'
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
require(["rGameLoop"], function(gameloop) {
	gameloop.init();
	gameloop.run();
});