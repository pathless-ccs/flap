const FloorState = {
    INTRO: 'intro',
    PLAYING: "playing",
    GAMEOVER: "gameover",
}

export class Floor {
    constructor(imagefile,speed){
        this.x = 0
        this.y = 0
        this.dx = 0
        this.dy = 0
        this.speed = speed
        this.img = new Image();
        this.img.src = imagefile;
        //img.onload = () => {
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, (1000 - this.img.height));
        ctx.drawImage(this.img, this.x + 960, (1000 - this.img.height));
    }
    animate(ctx){
        this.x = (this.x + this.dx)
        if(this.x == -960){
            this.x = 0
        }
    } 

    boundingBox() {    
        return {x: 0, width: 960, y: (1000 - this.img.height), height: 200}
    }

    startRound(){
        this.setState(FloorState.INTRO)
    }
    playing(){
        this.setState(FloorState.PLAYING)
    }
    gameover(){
        this.setState(FloorState.GAMEOVER)
    }

        setState(state) {
         if (state == FloorState.INTRO){
            this.dx = this.speed
            this.dy = 0
        }
        else if (state == FloorState.PLAYING) {
            this.dx = -2
        }
        
        else if (state == FloorState.GAMEOVER) {
            this.dx = 0
        }
        this.state = state
    }
}

