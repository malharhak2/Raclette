define(["Raclette/Debug", "Raclette/box2d"], function (debug, Box2D) {
	var indexObject = 0; 
	var Physics = function () {
		this.objects = [];
		this.objectTypes = {};
		this.gravity = {x : 0, y : 0};
	};

	Physics.prototype.initWorld = function (gravity) {
		debug.log("Physics", "Initializing physical world...");
		if (gravity !== undefined) {
			this.gravity = gravity;
		} else {
			this.gravity = {x: 0, y:0}
		}
		this.b2Vec2 = Box2D.Common.Math.b2Vec2;
		this.b2BodyDef = Box2D.Dynamics.b2BodyDef;
		this.b2Body = Box2D.Dynamics.b2Body;
		this.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
		this.b2Fixture = Box2D.Dynamics.b2Fixture;
		this.b2World = Box2D.Dynamics.b2World;
		this.b2MassData = Box2D.Collision.Shapes.b2MassData;
		this.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
		this.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
		this.b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;
		this.b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint;
		this.world = new this.b2World(
			new this.b2Vec2(0, 0),
			false
		);
		this.contactListener = new Box2D.Dynamics.b2ContactListener;
		this.contactListener.BeginContact = function(contact, manifold) {
			if (contact.m_fixtureA.m_body.m_userData != undefined && contact.m_fixtureA.m_body.m_userData.onCollision != undefined) {
				contact.m_fixtureA.m_body.m_userData.onCollision(contact.m_fixtureB.m_body);
			}
			if (contact.m_fixtureB.m_body.m_userData != undefined && contact.m_fixtureB.m_body.m_userData.onCollision != undefined) {
				contact.m_fixtureB.m_body.m_userData.onCollision(contact.m_fixtureA.m_body);
			}
		};
		this.contactListener.PreSolve = function(contact, manifold) {
			if (contact.m_fixtureA.m_body.m_userData != undefined && contact.m_fixtureA.m_body.m_userData.onPreSolve != undefined) {
				contact.m_fixtureA.m_body.m_userData.onPreSolve(contact.m_fixtureB.m_body, contact);
			}
			if (contact.m_fixtureB.m_body.m_userData != undefined && contact.m_fixtureB.m_body.m_userData.onPreSolve != undefined) {
				contact.m_fixtureB.m_body.m_userData.onPreSolve(contact.m_fixtureA.m_body, contact);
			}
		};
		this.world.SetContactListener(this.contactListener);
		debug.log("Physics", "Physical world initialized");		
	};

	Physics.prototype.createPhysicalObjectType = function (args) {
		debug.log("Physics", "Creating physical class...", args);
		this.objectTypes[args.id] = new this.b2FixtureDef;
		this.objectTypes[args.id].density = args.density;
		this.objectTypes[args.id].friction = args.friction;
		this.objectTypes[args.id].restitution = args.restitution;
		this.objectTypes[args.id].height = args.height;
		this.objectTypes[args.id].width = args.width;
		this.objectTypes[args.id].image = args.image;
		this.objectTypes[args.id].imageWidth = args.imageWidth || args.width;
		this.objectTypes[args.id].imageHeight = args.imageHeight || args.height;
		this.objectTypes[args.id].imageOffset =  args.imageOffset || {x: 0, y: 0}
		this.objectTypes[args.id].fixedRotation = args.fixedRotation || false;
		this.objectTypes[args.id].animated = args.animated || false;
		this.objectTypes[args.id].noGravity = args.noGravity || false;
		if (args.category != null) {
			this.objectTypes[args.id].filter.categoryBits = args.category;
		}
		if (args.mask != null) {
			this.objectTypes[args.id].filter.maskBits = args.mask;
		}
		if (args.trigger) {
			this.objectTypes[args.id].isSensor = true;
			this.objectTypes[args.id].trigger = true;
		}
		if (args.shape == "square") {
			this.objectTypes[args.id].shape = new this.b2PolygonShape;
			this.objectTypes[args.id].shape.SetAsBox(args.width, args.height);
		}
		if (args.shape == "round") {
			this.objectTypes[args.id].shape =  new this.b2CircleShape(args.width);
		}
		debug.log("Physics", "Physical class created");
	};

	Physics.prototype.createDistanceJoint = function (body1, body2, anchor1, anchor2) {
		var jointDef = new this.b2DistanceJointDef();
		var firstAnchor = new this.b2Vec2(body1.GetPosition().x, body1.GetPosition().y);
		var secondAnchor = new this.b2Vec2(body2.GetPosition().x, body2.GetPosition().y);
		jointDef.Initialize(body1,body2,firstAnchor,secondAnchor);
		//jointDef.collideConnected = true;
		this.world.CreateJoint(jointDef)
		return jointDef;		
	};

	Physics.prototype.instancePhysicalObject = function (args) {
		var bodyDef = new this.b2BodyDef;
		if (args.fixe) {
			bodyDef.type = this.b2Body.b2_staticBody;
		} else {
			bodyDef.type = this.b2Body.b2_dynamicBody;
		}
		bodyDef.position.x = args.x
		bodyDef.position.y = args.y
		bodyDef.args.userData = args.userData || {};
		bodyDef.args.userData.id = indexObject;
		if (!args.typeId) {
			debug.error("Physics", this.objectTypes, args.typeId);
		}
		bodyDef.args.fixedRotation = this.objectTypes[args.typeId].args.fixedRotation;
		var thisAnim = null;
		if (this.objectTypes[args.typeId].animated) {
			thisAnim = animationManager.pushAnim({animName: 
				this.objectTypes[args.typeId].image});
		}
		this.objects.push({
			id: indexObject,
			args.typeId : args.typeId,
			body: this.world.CreateBody(bodyDef).CreateFixture(this.objectTypes[args.typeId]).GetBody(),
			width : this.objectTypes[args.typeId].width,
			height : this.objectTypes[args.typeId].height,
			imageWidth : this.objectTypes[args.typeId].imageWidth,
			imageHeight : this.objectTypes[args.typeId].imageHeight,
			imageOffset : this.objectTypes[args.typeId].imageOffset,
			noGravity : this.objectTypes[args.typeId].noGravity,
			image: this.objectTypes[args.typeId].image,
			trigger: this.objectTypes[args.typeId].trigger,
			args.tags: args.tags,
			renderer:{ // For the animation engine
				img: this.objectTypes[args.typeId].image,
				state: "",
				dir: "",
				anim: thisAnim
			}
		});
		indexObject++;
		return (this.objects[this.objects.length - 1])
	}

	Physics.prototype.update = function () {
		this.applyGravity();
		this.checkStack();
		this.world.Step(
			1 / 60,
			10,
			10
		);
		this.world.ClearForces();
	};

	Physics.prototype.instanceBlock = function (args) {
		return this.instancePhysicalObject({
			typeId : args.id,
			fixe : true,
			x : args.x,
			y : args.y,
			userData : args.userData,
			tags : args.tags
		});		
	};

	Physics.prototype.applyGravity = function () {
		for (var i=0; i<this.physics.objects.length; i++) {
			if (this.physics.objects[i] == null) continue;
			if (this.objects[i].noGravity) continue;
			var objet = this.objects[i].body;
			var gravite = new this.b2Vec2(this.gravity.x*objet.GetMass(), this.gravity.y*objet.GetMass())
			objet.ApplyForce(gravite, objet.GetWorldCenter())
		};
	}

	Physics.prototype.checkStack = function () {
		while (this.callStack.length > 0) {
			this.objects[this.callStack[0].object.m_userData.id] = null;
			this.world.DestroyBody(this.callStack[0].object);
			this.callStack.splice(0,1);
		}
	}

	return new Physics();
})