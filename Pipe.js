
const PipeState = {
    IDLE: "idle",
    PLAYING: "playing",
    GAMEOVER: "gameover",
}


export class Pipe {
    constructor(speed, startingPOS) {
        this.startingPOS = startingPOS
        this.y = 0
        this.opening = 200
        this.dx = speed
        this.dy = 0
        this.isvisable = false 
        this.img = new Image();
        this.img.src = 'pipe.png';
        this.setPipeState(PipeState.IDLE)
        this.xRandom = 0
        this.yRandom = 0
    }    
    draw(ctx, i) {
        if (this.state != PipeState.IDLE) {
            ctx.drawImage(this.img, (this.x +this.xRandom), (this.y + this.yRandom)+ (this.opening/2))
            ctx.save()
            ctx.translate((this.x +this.xRandom), (this.y+ this.yRandom) - (this.opening/2))
            ctx.scale(1,-1)
            ctx.drawImage(this.img, 0, 0 )
            ctx.restore()
            ctx.fillText(`${this.startingPOS}`, this.x, this.y)

        }
    }

    upperboundingBox() {
        return {
            x:(this.x +this.xRandom),
            y: this.y -(this.opening/2)-this.img.height + this.yRandom,
            width: this.img.width,
            height: this.img.height
        }
    }

    lowerboundingBox() {
        return {
             x: (this.x +this.xRandom),
             width: this.img.width, 
             y: this.y +(this.opening/2) + this.yRandom,
              height: this.img.height
            }
    }

    animate(){
        this.y += this.dy
        this.x += this.dx
        this.x = (this.x + this.dx)
        if(this.x <= -200){
            this.x +=1260 
            this.yRandom = Math.random()*400-200
        }

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
            this.y = 360
            this.dx = 0
            this.xRandom = 50+Math.random()*100
        }else if (state == PipeState.PLAYING){
          this.dx = -2 
        } else if (state == PipeState.GAMEOVER){
            this.dx = 0
        }
        this.state = state     
    }
}
