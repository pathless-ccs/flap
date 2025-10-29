//setting states in a new way or format
const BirdState = {
    IDLE: "idle",
    READY: "ready",
    GETTINGREADY: "gettingready",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    FALLING: "falling",
    ASCENDING: "ascending"
}


export class Bird {
    constructor() {
        this.x = 0
        this.y = 0
        this.dx = 0
        this.dy = 0
        this.radius = 25
        this.width = 80
        this.height = 55
        //angle goes here
        //flap sequence here
        this.isflying = false
        this.isgravity = false
        this.state = BirdState.IDLE
        this.img = new Image();
        this.img.src = 'zale.png';
    } 
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    animate(){
        this.y = (this.y + this.dy)
        this.x = (this.x +this.dx)
    }

    prepare(){
        this.setBirdState(BirdState.GETTINGREADY)
    }
    beginFlying(){
       this.setBirdState(this.state.READY)
    }

    setBirdState(state){
        if (state == BirdState.IDLE){
            this.x = 480
            this.y = 360
        }else if (state == BirdState.GETTINGREADY){
            this.dx = -10
        } else if (state == BirdState.READY){
            this.x = 200
        } else if (state == BirdState.FALLING) {
            this.isgravity = true
        }
        this.state = state
        

    }
}



