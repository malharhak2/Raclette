define(["Raclette/Debug", "Raclette/box2d", "Raclette/PhysicalObjectType", "Raclette/PhysicalObject"], function (debug, Box2D, PhysicalObjectType, PhysicalObject) {
	var Physics = function () {
		this.indexObject = 0; 
		this.objects = [];
		this.callStack = [];
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
		this.objectTypes[args.id] = new PhysicalObjectType (args);
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
		var fixtureDef = this.objectTypes[args.typeId].fixtureDef;
		args.fixedRotation = fixtureDef.fixedRotation;
		args.fixtureDef = fixtureDef;
		args.width = fixtureDef.width;
		args.height = fixtureDef.height;
		args.noGravity = fixtureDef.noGravity;
		args.trigger = fixtureDef.trigger;
		args.indexObject = this.indexObject;

		this.objects.push(new PhysicalObject (args, this.world));
		this.indexObject++;
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
		for (var i=0; i<this.objects.length; i++) {
			if (this.objects[i] == null) continue;
			if (this.objects[i].noGravity) continue;
			var objekt = this.objects[i];
			var gravite = new this.b2Vec2(
				this.gravity.x*objekt.GetMass(), 
				this.gravity.y*objekt.GetMass()
			);
			objekt.ApplyForce(gravite, objekt.GetWorldCenter())
		};
	}

	Physics.prototype.checkStack = function () {
		while (this.callStack.length > 0) {
			this.objects[this.callStack[0].body.m_userData.id] = null;
			this.world.DestroyBody(this.callStack[0].body);
			this.callStack.splice(0,1);
		}
	}

	Physics.prototype.removeObject = function (object) {
		this.callStack.push({
			body : object.body
		})
	}

	return new Physics();
})