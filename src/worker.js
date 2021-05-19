
importScripts('lib/ammo.js');

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