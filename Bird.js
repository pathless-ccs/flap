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
        this.width = 60
        this.height = 55
        this.statecounter = 0
        //angle goes here
        this.bobangle = 0
        //flap sequence here
        this.isflying = false
        this.isgravity = false
        this.state = BirdState.IDLE
        this.imagesArray = new Array()
        this.imagesArray[0] = "jasper.png";
        this.imagesArray[1] = "tyler.png";
        this.imagesArray[2] = "nicetyler.png";
        this.imagesArray[3] = "zale.png";
        this.imagesArray[4] = "duo.png";
        this.imagesArray[5] = "emma.png";
        this.imagesArray[6] = "badtyler.png";
        this.imagesArray[7] = "melodih.png";
        this.imagesArray[8] = "connor.png";
        this.imagesArray[9] = "bill.png";
        this.imagesArray[10] = "madih.png";
        this.imagesArray[11] = "zaleington.png";
        this.imagesArray[12] = "haydih.png";
        this.imagesArray[13] = "anai.png";
        this.imagesArray[14] = "sophington.png";
        this.imagesArray[15] = "melody.png";
        this.imagesArray[16] = "car.png";
        this.imagesArray[17] = "chain.png";
        this.imagesArray[18] = "kale.png";
        this.imagesArray[19] = "cailin.png";
        this.img = new Image()
        this.img.src = "sprites/"+this.imagesArray[Math.floor(Math.random() * 19.99999999)]
        this.setBirdState(BirdState.IDLE)
    } 

    draw(ctx) { 
        var height = this.height
        var scale = this.height/this.img.height
        var width = this.img.width*scale

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(((this.bobangle * 4) * Math.PI) / 180)
        ctx.drawImage(this.img, -width/2, 0, width, height)
        ctx.restore()
    }
    
    animate(){
        this.y = (this.y + this.dy)
        this.x = (this.x +this.dx) 
        if (this.isgravity) {
            this.dy += 0.25
        }

        this.bobangle = (this.bobangle * 0.90) + (this.dy * 0.10)

        if (this.state == BirdState.GETTINGREADY) {
            this.stateCounter -= 1
            if (this.stateCounter == 0) {
                this.setBirdState(BirdState.READY)
            } 
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
        console.log(`set bird state to ${state}`)
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