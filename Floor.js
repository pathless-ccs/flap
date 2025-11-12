export class Floor {
    constructor(imagefile,speed){
        this.x = 0
        this.y = 0
        this.dx = speed
        this.dy = 0
        //Move Ground
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
        return {x: this.x, width: this.height, y: this.y, height: this.height}
    }
}
 


const state= {
    INTRO: "intro",
    READY: "ready",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    FALLING: "falling",
    ASCENDING: "ascending",
}



