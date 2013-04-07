LajiliEngine V0.4.0
============

A HTML5 engine with gamepad integration and Box2D abstraction layer

How does that work?
-----------------

You have two folders in the root:
LajiliEngine : it contains all of the engine class you're not supposed to modify except if you're an advanced user
Game: it contains YOUR game.

Game is supposed to have at least 3 files:
Main.js --> it's the first file of your game. The engine will call its function init(engine) with the engine as a parametter. It will also call its function "update" at each frame.
images.js --> it's a list of the images you'll use in your game.
config.js --> it's a serie of what is specific to your game, like the title of the page and so on.


You little liar, there is no "game" folder!
------------------------
Actually, in order for all of us to work on the same github repo, I have add a gitignore on the game folder. But, i'll let my game in "exampleGame". Just copy and rename the folder as "Game", and you're on.

What does not work right now / is not implemented:
----------------------
.The support of nonPhysical objects. I'm working on it.
.A Gui Abstraction Layer
.Box2D is only partially abstraction layered (yep, i invent words, that's how badass i am). That is to say, there is no simplification right now for for collision mask and category bit. The joints are also not implemented.
.MouseEvents : Yep, it's basic stuff, but i didn't need it. I'll add that soon.
.Animations : Also pretty basic stuff, but didn't have time for that. I'll add it later on.

I want to Improve the engine, what should I do
-----------------------
First, create a branch or fork the project. you have to understand the way RequireJS works. Then, imitate the way the differents modules exists, and add yours. Then contact me, i'll merge if I think it's a plus for the engine.

