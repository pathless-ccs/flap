export class Background {
    constructor(){
        this.x = 0
        this.y = 0
        this.dx = 0
        this.dy = 0
        //Move Ground?
        this.img = new Image();
        this.img.src = 'Background.webp';
        //img.onload = () => {
    }
    draw(ctx){
         ctx.drawImage(this.img, 50, 50, 100, 100, 0, 0, 100, 100);
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



