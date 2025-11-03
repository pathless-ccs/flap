
const PipeState = {
    IDLE: "idle",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}


export class Pipe {
    constructor() {
        this.x = 0
        this.y = 0
        this.dx = 0
        this.dy = 0
        this.isvisable = false
        this.img = new Image();
        this.img.src = 'pipe.png';
        this.setPipeState(PipeState.IDLE)
    }    
    draw(ctx) {
       ctx.drawImage(this.img, this.x, this.y)
    }
    animate(){
        this.y = (this.y + this.dy)
        this.x = (this.x +this.dx)
    }

    startmoving(){
       this.setPipeState(PipeState.FALLING)
    }
    stopmoving(){
        this.setPipeState(PipeState.GAMEOVER)
    }


    setPipeState(state){
        if (state == PipeState.IDLE){
            this.x = 480
            this.y = 360
            this.dx = 0
        }else if (state == PipeState.PLAYING){
          this.dx = -10
        } else if (state == PipeState.GAMEOVER){
            this.dx = 0
        }
        this.state = state     
    }
}