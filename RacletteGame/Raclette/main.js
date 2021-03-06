var paths = {
    "engine" : "/Raclette/",
    "Game" : "Game/",
    "Gui" : "Gui/",
    "Inputs" : "Inputs/",
    "Map" : "Map/",
    "Physics" : "Physics/",
    "Rendering" : "Rendering/",
    "Resources" : "Resources/",
    "World" : "World/"
};
require.config({
    baseUrl: "../",
    paths: {
        // Game
            'rGame'               : paths.engine + paths.Game + 'Game',
            'rGameLoop'           : paths.engine + paths.Game + 'GameLoop',
        // GUI
            'rGui'                : paths.engine + paths.Gui + 'Gui',

        // Inputs
            'rController'         : paths.engine + paths.Inputs + 'Controller',
            'rControllerKey'      : paths.engine + paths.Inputs + 'ControllerKey',
            'rGamepad'            : paths.engine + paths.Inputs + 'Gamepad',
            "rGamepads"           : paths.engine + paths.Inputs + 'Gamepads',
            'rinputsManager'      : paths.engine + paths.Inputs + 'inputsManager',
            'rInterfaceManager'   : paths.engine + paths.Inputs + 'InterfaceManager',
            'rkeyboardManager'    : paths.engine + paths.Inputs + 'keyboardManager',

        // Map
            'rMap'                : paths.engine + paths.Map + 'Map',
            'rMapCase'            : paths.engine + paths.Map + 'MapCase',
            'rMapLoader'          : paths.engine + paths.Map + 'MapLoader',
            'rJsonStorer'         : paths.engine + paths.Map + 'JsonStorer',
        // Physics
            'rCollider'           : paths.engine + paths.Physics + 'Collider',

        // Rendering
            'rCamera'             : paths.engine + paths.Rendering + 'Camera',
            'rCanvasManager'      : paths.engine + paths.Rendering + 'CanvasManager',
            'rRenderer'           : paths.engine + paths.Rendering + 'Renderer',
            'rTile'               : paths.engine + paths.Rendering + 'Tile',
            'rTileset'            : paths.engine + paths.Rendering + 'Tileset',
            'rTilesManager'       : paths.engine + paths.Rendering + 'TilesManager',

        // Resources
            'rAnimation'          : paths.engine + paths.Resources + 'Animation',
            'rAnimationInstance'  : paths.engine + paths.Resources + 'AnimationInstance',
            'rAnimationManager'   : paths.engine + paths.Resources + 'AnimationManager',
            'rimageManager'       : paths.engine + paths.Resources + 'imageManager',
            'rSoundManager'       : paths.engine + paths.Resources + 'SoundManager',

        // World
            'rWorld'              : paths.engine + paths.World + 'World',
            'rWorldLayer'         : paths.engine + paths.World + 'WorldLayer',
            'rWorldMapObject'     : paths.engine + paths.World + 'WorldMapObject',
            'rWorldObject'        : paths.engine + paths.World + 'WorldObject',
            'rWorldObjectType'    : paths.engine + paths.World + 'WorldObjectType',
            'rWorldManager'       : paths.engine + paths.World + 'WorldManager',
            'rCurrentWorld'        : paths.engine + paths.World + 'CurrentWorld',
            
        'rCharacter'          : paths.engine + 'Character',
        'rPageVisibility'     : paths.engine + 'PageVisibility',
        'rsockets'            : paths.engine + 'sockets',
        'rGlobalVariables'    : paths.engine + 'GlobalVariables',
        'rsocket_io'          : '/socket.io/socket.io',
        'rfacebook'           : paths.engine + 'facebook',
        'jquery'              : paths.engine + 'jquery',
        'rCONFIG'             : paths.engine + 'CONFIG',
        'rDebug'              : paths.engine + 'Debug',
        'rLoader'             : paths.engine + 'Loader',
        'rmain'               : paths.engine + 'main',
        'rutils'              : paths.engine + 'utils',
        'rTime'               : paths.engine + 'Time',
        'rUser'               : paths.engine + "User",
        'rMessager'           : paths.engine + 'Messager'
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
});