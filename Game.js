import {Background} from './background.js'
import {Bird} from './Bird.js'
import {Pipe} from './Pipe.js'
import {Floor} from './Floor.js'

const GameState = {
    INTRO: "intro",
    READY: "ready",
    GETTINGREADY: "gettingready",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    PLAYING: 'playing',
    DEAD: 'dead'
}

export default class Game {     
    constructor() {
        
        const canvas = document.getElementById("game")
        this.ctx = canvas.getContext("2d")
        document.addEventListener("keydown", this.keydown.bind(this))
        //document.addEventListener("keyup", this.keyup.bind(this))
        this.bird = new Bird ()
        this.background = new Background ('Background.webp',-.5)
        this.floor = new Background ('Floor2.webp', -4)
        this.createPipes()
        this.setState(GameState.INTRO)
    }
    createPipes(){
        this.pipes = []
        this.pipes[0] = new Pipe (-2, 1000)
        this.pipes[1] = new Pipe (-2, 1192) 
        this.pipes[2] = new Pipe (-2, 1384) 
        this.pipes[3] = new Pipe (-2, 1576) 
        this.pipes[4] = new Pipe (-2, 1768)   
    }
    run() {
        console.log ("running the game")
        this.frame()

    
    }
    frame() {
        this.ctx.clearRect(0, 0, 960, 720)
        this.background.draw(this.ctx)
        this.bird.draw(this.ctx)       
        this.floor.draw(this.ctx)
        for (let i = 0; i < this.pipes.length; i++){
            this.pipes[i].draw(this.ctx)
        }

        if (this.state == GameState.INTRO) {
            this.ctx.font = "70px monospace"
            this.ctx.fillStyle = "rgba(144, 9, 255, 1)"
            this.ctx.fillText("FLAPPY BIRD", 300, 200)
        }
        else if (this.state == GameState.READY) {
            this.ctx.font = "70px monospace"
            this.ctx.fillStyle = "rgba(0, 0, 0, 1)"
            this.ctx.fillText("PRESS SPACE", 300, 200)
        }

        this.background.animate()
        this.floor.animate()  
        this.bird.animate()
        for (let i = 0; i < this.pipes.length; i++){
            this.pipes[i].animate()
        }

        if (this.checkCollision(this.bird.boundingBox(),this.floor.boundingBox())) {

        }

        if (this.state == GameState.GETTINGREADY) {
           if (this.bird.isReady())
            this.setState(GameState.READY)
        }

        window.requestAnimationFrame(this.frame.bind(this))
    }

    checkCollision(obj1, obj2) {
        if (
            obj1.x < obj2.x + obj2.width &&
            obj1.x +obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y 
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    keydown(event) {
        if (this.state == GameState.INTRO) {
            if (event.key == " ") {
                this.setState(GameState.GETTINGREADY)
            }
        }
        else if (this.state == GameState.READY) {
            if (event.key == " ") {
                this.setState(GameState.PLAYING)
            }
        }
        else if (this.state == GameState.PLAYING) {
            if (event.key == " ") {
                this.bird.jump()
            }
        }
    }

    setState(state){
        console.log(`set game state to ${state}`)
        if (state == GameState.IDLE){
        }

        else if (state == GameState.GETTINGREADY){
            this.bird.prepare()
        }
        else if (state == GameState.READY) {
            
        }
        else if (state == GameState.PLAYING){
            this.bird.beginFlying()
        for (let i = 0; i < this.pipes.length; i++){
            this.pipes[i].startMoving()
        }
        }
        this.state = state
    }
}