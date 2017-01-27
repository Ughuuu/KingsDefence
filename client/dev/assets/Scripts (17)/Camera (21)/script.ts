class CameraBehavior extends Sup.Behavior {
  private player : Sup.Actor;
  follow: string;
  
  awake() {
    this.player = Sup.getActor(this.follow);
  }

  update() {
    var pos = this.player.getPosition();
    this.actor.setPosition(pos.x, pos.y, 1);
  }
}
Sup.registerBehavior(CameraBehavior);
