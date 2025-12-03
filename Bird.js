//setting states in a new way or format
const BirdState = {
    IDLE: "idle",
    READY: "ready",
    GETTINGREADY: "gettingready",
    HITPIPE: "HITPIPE",
    HITGROUND: "HITGROUND",
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
        this.bobheight = 0
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
        this.imagesArray[20] = "hdayin.png";
        this.imagesArray[21] = "conneor.png";
        this.imagesArray[22] = "madi.png";
        this.imagesArray[23] = "md.png";
        this.imagesArray[24] = "mel.png";
        this.imagesArray[25] = "sop.png";
        this.loadBird(Math.floor(Math.random() * 23.99999999))
        this.setState(BirdState.IDLE)
    }

    log(str) {
        var seconds = Date.now() / 1000
        console.log(`${seconds} %c[BIRD] ${str}`,"color:orange")
    }
    draw(ctx) { 
        var height = this.height
        var scale = this.height/this.img.height
        var width = this.img.width*scale
        ctx.save()
        ctx.translate(this.x, this.y + Math.sin(this.bobheight)*5)
        ctx.rotate(((this.bobangle * 3) * Math.PI) / 180)
        ctx.drawImage(this.img, -width/2, -height/2, width, height)
        ctx.restore()
    }
    
    animate(){
        this.y = (this.y + this.dy)
        this.x = (this.x +this.dx) 
        if (this.isgravity) {
            this.dy += 0.4
        }

        this.bobangle = (this.bobangle * 0.95) + (this.dy * 0.05)

        this.bobheight += 0.1

        if (this.state == BirdState.GETTINGREADY) {
            this.stateCounter -= 1
            if (this.stateCounter == 0) {
                this.setState(BirdState.READY)
            } 
        }
        if (this.state == BirdState.HITPIPE) {
            this.stateCounter -= 1
            if (this.stateCounter == 0) {
                this.setState(BirdState.HITGROUND)
            }
        }
    }
    loadBird(birdnumber) {
        this.currentbirdnumber = birdnumber
        this.img = new Image()
        console.log(`loading bird ${this.currentbirdnumber}`)
        this.img.src = "sprites/"+this.imagesArray[birdnumber]
    }
    nextBird() {
        this.loadBird((this.currentbirdnumber + 1)%this.imagesArray.length)
    }
    lastBird() {
        this.loadBird((this.currentbirdnumber - 1)%this.imagesArray.length)
    }
    startRound() {
        this.setState(BirdState.IDLE)
    }
    prepare(){
        this.setState(BirdState.GETTINGREADY)
    }
    beginFlying(){
       this.setState(BirdState.FALLING)
    }

    jump() {
        this.setState(BirdState.ASCENDING)
    }

    isReady() {
        return (this.state == BirdState.READY)
    }

    boundingBox() {
        return {x: this.x-this.width/2, width: this.height, y: this.y-this.height/2, height: this.height}
    }
    hittingThePipe() {
        this.setState(BirdState.HITPIPE)
        this.dy -= 10 
    }
    hittingTheGround() {
        this.setState(BirdState.HITGROUND)
    }
    
    setState(state){
        this.log(`set state to ${state}`)
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
            this.dy = -8
        }
        else if (state == BirdState.HITPIPE) {
            this.state = BirdState.FALLING
            this.bobheight = 0

        }
        else if (state == BirdState.HITGROUND) {
            this.dy = 0
            this.isgravity = false
            this.bobheight = 0
        }

        this.state = state     
    }
}