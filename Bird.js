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
        this.width = 34
        this.height = 24
        //angle goes here
        //flap sequence here
        this.isflying = false
        this.isgravity = false
        this.state = State.IDLE
    } 
    
    draw(ctx) {
        console.log("drawing bird at ", this.x, this.y)
        ctx.fillStyle = "rgba(7, 38, 13, 1)"
        ctx.beginPath()
        ctx.arc(this.x, 360, this.radius, 0, Math.PI * 2)
        ctx.fill()

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



