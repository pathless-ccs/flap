
const PipeState = {
    IDLE: "idle",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}


export class Pipe {
    constructor(speed) {
        this.x = 0
        this.y = 0
        this.dx = speed
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
        this.y += this.dy
        this.x += this.dx
    }

    startMoving(){
       this.setPipeState(PipeState.PLAYING)
    }
    stopMoving(){
        this.setPipeState(PipeState.GAMEOVER)
    }


    setPipeState(state){
        console.log(`set pipe state to ${state}`)
        if (state == PipeState.IDLE){
            console.log("setting pipe coordinates")
            this.x = 800
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