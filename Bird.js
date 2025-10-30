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
        imagesArray = new Array(9)
        imagesArray[0] = new Image();
        imagesArray[0].src = new "jasper.png";
        imagesArray[1] = new Image();
        imagesArray[1].src = new "tyler.png";
        imagesArray[2] = new Image();
        imagesArray[2].src = new "nicetyler.png";
        imagesArray[3] = new Image();
        imagesArray[3].src = new "zale.png";
        imagesArray[4] = new Image();
        imagesArray[4].src = new "duo.png";
        imagesArray[5] = new Image();
        imagesArray[5].src = new "emma.png";
        imagesArray[6] = new Image();
        imagesArray[6].src = new "badtyler.png";
        imagesArray[7] = new Image();
        imagesArray[7].src = new "melodih.png";
        imagesArray[8] = new Image();
        imagesArray[8].src = new "connor.png";
        this.faceid
        //this.img = new Image();
        //this.img.src = 'zale.png';
        this.setBirdState(BirdState.IDLE)
    } 

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    animate(){
        this.y = (this.y + this.dy)
        this.x = (this.x +this.dx)
        if (this.state == BirdState.GETTINGREADY) {
            this.stateCounter -= 1
            if (this.stateCounter == 0) {
                this.setBirdState(BirdState.READY)
            }
        }
        if (this.isgravity) {
            this.dy += 0.25
        }
    }

    prepare(){
        this.setBirdState(BirdState.GETTINGREADY)
    }
    beginFlying(){
       this.setBirdState(BirdState.FALLING)
    }

    jump() {
        this.setBirdState(BirdState.ASCENDING)
    }

/*    ground() {
        this.setBirdState(BirdState.HITGROUND)
    }

    pipe() {
        this.setBirdState(BirdState.HITPIPE)
    }
*/
    setBirdState(state){
        if (state == BirdState.IDLE){
            this.x = 480
            this.y = 360
            this.dx = 0
        }else if (state == BirdState.GETTINGREADY){
          this.dx = -10
          this.stateCounter = 30
        } else if (state == BirdState.READY){
            this.dx = 0
        } else if (state == BirdState.FALLING) {
            this.isgravity = true
        }
        if (state == BirdState.ASCENDING) {
            this.dy = -6
        }
        else if (state == BirdState.HITGROUND) {
            this.dy = 0
            this.isgravity = false
        }
        else if (state == BirdState.HITPIPE) {
            this.dy = 0
            this.isgravity = false
        }
        this.state = state     
    }
}