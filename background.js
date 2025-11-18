
const BackgroundState = {
    MOVING: "moving",
    NOTMOVING: "notmoving"
}

export class Background {
    constructor(imagefile,speed){
        this.x = 0
        this.y = 0
        this.dx = speed
        this.dy = 0
        //Move Ground
        this.img = new Image();
        this.img.src = imagefile;
        //img.onload = () => {
        this.setBackgroundState(BackgroundState.MOVING)
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, 0, 960, 820);
        ctx.drawImage(this.img, this.x + 960, 0, 960, 820);
    }
    animate(ctx){
        this.x = (this.x + this.dx)
        if(this.x == -960){
            this.x = 0
        }
    } 

    startRound() {
        this.setBackgroundState(BackgroundState.MOVING)
    }
    moving(){
        this.setBackgroundState(BackgroundState.MOVING)
    }

    notMoving(){
        this.setBackgroundState(BackgroundState.NOTMOVING)
    }

    setBackgroundState(state){
        console.log(`set background state to ${state}`)
        if (state == BackgroundState.MOVING){

        } else if (state == BackgroundState.NOTMOVING){
            this.dx = 0
        }
        this.state = state     
    }
}