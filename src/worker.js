importScripts('lib/ammo.js');

const ammojsObjects = new Map()
let physicsWorld

Ammo().then(function(Ammo) {
    setupPhysicsWorld(Ammo);
});

function setupPhysicsWorld(Ammo) {
    const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration()
    const broadphase = new Ammo.btDbvtBroadphase()
    const solver = new Ammo.btSequentialImpulseConstraintSolver()
    this.dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration)
    this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(
      this.dispatcher,
      broadphase,
      solver,
      collisionConfiguration
    )
    this.physicsWorld.setGravity(0, -9.81, 0)

}

self.onmessage = function (msg) {
  switch (msg.data.msg) {
    case 'createPhysicObject':
        createPhysicObject(msg.data.data)
        break;
    case 'createPhysicObjects':
        createPhysicObjects(msg.data.data)
        break;
    default:
          throw 'cxvbxcvb';
  }
}

function createPhysicObjects(threejsObjects, mass) {
  threejsObjects.forEach((obj) => {
    createPhysicObject(obj, mass)
  })
}

function createPhysicObject(threejsObject, mass) {
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(threejsObject.position))
    transform.setRotation(new Ammo.btQuaternion({x: 0, y: 0, z: 0, w: 1}))
    //
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape( new Ammo.btVector3( 1, 1, 1 ) );
    colShape.setMargin( 0.05 ); // мб и ненада

    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( 0, localInertia );

    let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass || 0, motionState, colShape, localInertia );
    let body = new Ammo.btRigidBody( rbInfo );

    physicsWorld.addRigidBody( body );

    ammojsObjects.set(threejsObject.uuid, boby)
}