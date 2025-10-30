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
}
 


const state= {
    INTRO: "intro",
    READY: "ready",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    FALLING: "falling",
    ASCENDING: "ascending",
}



