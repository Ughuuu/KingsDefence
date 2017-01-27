class CameraBehavior extends Sup.Behavior {
    awake() {
        this.player = Sup.getActor(this.follow);
    }
    update() {
        var pos = this.player.getPosition();
        this.actor.setPosition(pos.x, pos.y, 1);
    }
}
Sup.registerBehavior(CameraBehavior);
//# sourceMappingURL=script.js.map