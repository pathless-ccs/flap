
const PipeState = {
    IDLE: "idle",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}


export class Pipe {
    constructor(speed) {
        this.x = 0
        this.yCenter = 0
        this.opening = 200
        this.dx = speed
        this.dy = 0
        this.isvisable = false
        this.img = new Image();
        this.img.src = 'pipe.png';
        this.setPipeState(PipeState.IDLE)
    }    
    draw(ctx) {
        if (this.state != PipeState.IDLE) {
            ctx.drawImage(this.img, this.x, this.yCenter + (this.opening/2))
            ctx.save()
            ctx.translate(this.x, this.yCenter - (this.opening/2))
            ctx.scale(1,-1)
            ctx.drawImage(this.img, 0, 0 )
            ctx.restore()
        }
    }

    
      
    animate(){
        this.yCenter += this.dy
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
            this.x = 1000
            this.yCenter = 200
            this.dx = 0
        }else if (state == PipeState.PLAYING){
          this.dx = -10
        } else if (state == PipeState.GAMEOVER){
            this.dx = 0
        }
        this.state = state     
    }
}