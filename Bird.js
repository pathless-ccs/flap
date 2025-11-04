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
        this.imagesArray = new Array(9)
        this.imagesArray[0] = new Image();
        this.imagesArray[0].src = "jasper.png";
        this.imagesArray[1] = new Image();
        this.imagesArray[1].src = "tyler.png";
        this.imagesArray[2] = new Image();
        this.imagesArray[2].src = "nicetyler.png";
        this.imagesArray[3] = new Image();
        this.imagesArray[3].src = "zale.png";
        this.imagesArray[4] = new Image();
        this.imagesArray[4].src = "duo.png";
        this.imagesArray[5] = new Image();
        this.imagesArray[5].src = "emma.png";
        this.imagesArray[6] = new Image();
        this.imagesArray[6].src = "badtyler.png";
        this.imagesArray[7] = new Image();
        this.imagesArray[7].src = "melodih.png";
        this.imagesArray[8] = new Image();
        this.imagesArray[8].src = "connor.png";
        this.imagesArray[9] = new Image();
        this.imagesArray[9].src = "bill.png";
        this.imagesArray[10] = new Image();
        this.imagesArray[10].src = "madih.png";
        this.imagesArray[11] = new Image();
        this.imagesArray[11].src = "zaleington.png";
        this.imagesArray[12] = new Image();
        this.imagesArray[12].src = "haydih.png";
        this.imagesArray[13] = new Image();
        this.imagesArray[13].src = "anai.png";
        this.imagesArray[14] = new Image();
        this.imagesArray[14].src = "sophington.png";
        this.imagesArray[15] = new Image();
        this.imagesArray[15].src = "melody.png";
        this.imagesArray[16] = new Image();
        this.imagesArray[16].src = "car.png";
        this.imagesArray[17] = new Image();
        this.imagesArray[17].src = "chain.png";
        this.img = this.imagesArray[Math.floor(Math.random() * 17.99999999)]
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

    isReady() {
        return (this.state == BirdState.READY)
    }
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