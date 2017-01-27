Sup.ArcadePhysics2D.setGravity(0, -0.005);

class EnemyScript extends Sup.Behavior {
  private states: {[key:string]: any;} = {};
  speed: number = 0.02;
  jumpSpeed: number = 0.1;
  private flip: number;
  flipX: number = 1;
  private dir: number;
  private jump: boolean;
  private vel: Sup.Math.Vector2;
  
  awake() {
    this.states["Attack"] = {enable: false, loop: false};
    this.states["Walk"] = {enable: false, loop: true};
    this.states["Idle"] = {enable: true, loop: true};
  }
  update() {
    this.checkCollision();
    
    this.vel = this.actor.arcadeBody2D.getVelocity();
    
    this.moveLogic();
    this.extraLogic();
    this.updateAnimation();
    
    this.actor.arcadeBody2D.setVelocity(this.vel);    
  }
  
  isOtherThan(arr: string[]) : boolean{    
    for (var key in this.states) {
      var value = this.states[key];
      if(!value.enable)
        continue;
      for(let str of arr){
        if(key == str){
          return false;
        }
      }
      return true;
    } 
    return false;
  }
  
  dontMoveX(){
    this.vel.x= 0;
  }
  
  moveLeft(){
    this.vel.x= -1 * this.speed;
  }
  
  moveRight(){
    this.vel.x=1 * this.speed;
  }
  
  moveLogic(){   
    if(this.dir != 0)
      this.states["Walk"].enable = true;
    else{      
      this.states["Walk"].enable = false;
      this.states["Idle"].enable = true; 
    }
  }
    
  moveUp(){    
    this.vel.y=this.jumpSpeed;
  }
  
  updateAnimation(){
    for (var key in this.states) {
        var value = this.states[key];
        var frameCount = this.actor.spriteRenderer.getAnimationFrameCount();
        var frameIndex = this.actor.spriteRenderer.getAnimationFrameIndex();
      if(value.enable == true && value.loop == false && frameIndex == frameCount - 1){
        value.enable = false;
      }
      if(value.enable == true){
        this.actor.spriteRenderer.setAnimation(key);        
        break;
      }
    }
    this.actor.spriteRenderer.setHorizontalFlip((this.flip * this.flipX) == 1 ? true : false);
  }
  
  checkCollision(){
    let touchSolids = this.actor.arcadeBody2D.getTouches().bottom;
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    
    if (touchSolids) {
        if (this.vel.x == 0){
          this.dir = 0;
        }
        else if(this.vel.x > 0){
          this.flip = -1;
          this.dir = 1;
        }else {
          this.flip = 1;
          this.dir = -1;
        }
    }
  }
    
  extraLogic(){    
    let touchSolids = this.actor.arcadeBody2D.getTouches().bottom;
    if(!this.isOtherThan(["Walk", "Idle"])){
      if (Sup.Input.isKeyDown("A")) {
        this.moveLeft();
      }
      else
      if (Sup.Input.isKeyDown("D")) {
        this.moveRight();
      }else{
        this.dontMoveX();
      }
      if (touchSolids) {
        if (Sup.Input.wasKeyJustPressed("W")) {
          this.moveUp();
        }
      }
    }else{
        this.dontMoveX();
      }
    if (Sup.Input.isKeyDown("S")) {
      this.states["Attack"].enable = true;
      Sup.Audio.playSound("Sound/Sound", 0.1);
    }
  }
}
Sup.registerBehavior(EnemyScript);
