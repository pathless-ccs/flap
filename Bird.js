//setting states in a new way or format
const State = {
    IDLE: "idle",
    READY: "ready",
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
        this.state = State.IDLE
        this.img = new Image();
        this.img.src = 'bird.png';
    } 
    
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    animate(){
        this.y = (this.y + this.dy)
    }

    goToINTRO(){
        this.setState(State.IDLE)
    }
    goToSTART(){
       this.setState(this.state.READY)
    }

    setState(state){
        if (state == State.IDLE){
            this.x = 480
            this.y = 360
        } else if (state == State.READY){
            this.x = 200
        } else if (state == State.FALLING) {
            this.isgravity = true
        }
        this.state = state
        

    }
}



