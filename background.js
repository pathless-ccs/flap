export class Background {
    constructor(){
        this.x = 0
        this.y = 0
        this.dx = 0.1
        this.dy = 0
        //Move Ground?
        this.img = new Image();
        this.img.src = 'Background.webp';
        //img.onload = () => {
    }
    draw(ctx){
        ctx.drawImage(this.img, 0, 0, 1024, 574, this.x, 0, 960, 720);
    }
    animate(ctx){
        this.x = (this.x + this.dx)
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



