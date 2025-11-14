
const PipeState = {
    IDLE: "idle",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}


export class Pipe {
    constructor(speed, startingPOS) {
        this.startingPOS = startingPOS
        this.yCenter = 0
        this.opening = 200
        this.dx = speed
        this.dy = 0
        this.isvisable = false 
        this.img = new Image();
        this.img.src = 'pipe.png';
        this.setPipeState(PipeState.IDLE)
        this.xRandom
    }    
    draw(ctx, i) {
        if (this.state != PipeState.IDLE) {
            ctx.drawImage(this.img, this.x, this.yCenter + (this.opening/2))
            ctx.save()
            ctx.translate(this.x, this.yCenter - (this.opening/2))
            ctx.scale(1,-1)
            ctx.drawImage(this.img, 0, 0 )
            ctx.restore()
            ctx.fillText(`${this.startingPOS}`, this.x, this.yCenter)
        }
    }

    animate(){
        this.yCenter += this.dy
        this.x += this.dx
        this.x = (this.x + this.dx)
        if(this.x <= -200){
            this.x +=1260
        }

    }

    upperboundingBox() {
        return { x: this.x, width: this.img.width, y: this.yCenter -(this.opening/2)-this.img.height, height: this.img.height }
    }

    lowerboundingBox() {
        return { x: this.x, width: this.img.width, y: this.yCenter +(this.opening/2), height: this.img.height }
    }

    upperboundingBox() {
        return { x: this.x, width: this.img.width, y: this.yCenter -(this.opening/2)-this.img.height, height: this.img.height }
    }

    lowerboundingBox() {
        return { x: this.x, width: this.img.width, y: this.yCenter +(this.opening/2), height: this.img.height }
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
            this.x = this.startingPOS
            this.yCenter =  160+Math.random()*400 
            this.dx = 0
        }else if (state == PipeState.PLAYING){
          this.dx = -2 
        } else if (state == PipeState.GAMEOVER){
            this.dx = 0
        }
        this.state = state     
    }
}