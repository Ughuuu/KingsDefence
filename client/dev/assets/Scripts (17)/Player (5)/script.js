class PlayerBehavior extends Sup.Behavior {
    constructor() {
        super(...arguments);
        this.a = 1;
        this.flip = false;
        this.states = {};
        this.speed = 1;
    }
    awake() {
        this.states["Attack"] = { enable: false, loop: false };
        this.states["Walk"] = { enable: false, loop: true };
        this.states["Idle"] = { enable: true, loop: true };
    }
    update() {
        this.physicsLogic();
        this.animationLogic();
        this.animate();
    }
    physicsLogic() {
        if (this.states["Attack"].enable == true)
            return;
        if (Sup.Input.isKeyDown("A")) {
            this.actor.p2Body.body.applyImpulse([-1 * this.speed, 0], [0, 0]);
        }
        else if (Sup.Input.isKeyDown("D")) {
            this.actor.p2Body.body.applyImpulse([1 * this.speed, 0], [0, 0]);
        }
    }
    animationLogic() {
        if (Sup.Input.isKeyDown("S")) {
            this.states["Attack"].enable = true;
            this.actor.spriteRenderer.getAnimation();
        }
        if (Sup.Input.isKeyDown("A")) {
            this.flip = false;
            this.states["Walk"].enable = true;
        }
        else if (Sup.Input.isKeyDown("D")) {
            this.flip = true;
            this.states["Walk"].enable = true;
        }
        else {
            this.states["Walk"].enable = false;
        }
    }
    animate() {
        for (var key in this.states) {
            var value = this.states[key];
            var frameCount = this.actor.spriteRenderer.getAnimationFrameCount();
            var frameIndex = this.actor.spriteRenderer.getAnimationFrameIndex();
            if (value.enable == true && value.loop == false && frameIndex == frameCount - 1) {
                value.enable = false;
            }
            if (value.enable == true) {
                this.actor.spriteRenderer.setAnimation(key);
                break;
            }
        }
        this.actor.spriteRenderer.setHorizontalFlip(this.flip);
    }
}
Sup.registerBehavior(PlayerBehavior);
//# sourceMappingURL=script.js.map