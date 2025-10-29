import {Background} from './background.js'
import {Bird} from './Bird.js'

const GameState = {
    INTRO: "intro",
    READY: "ready",
    HITPIPE: "hitpipe",
    HITGROUND: "hitground",
    FALLING: "falling",
    ASCENDING: "ascending",
}

export default class Game {
    constructor() {
        
        const canvas = document.getElementById("game")
        this.ctx = canvas.getContext("2d")
        document.addEventListener("keydown", this.keydown.bind(this))
        //document.addEventListener("keyup", this.keyup.bind(this))
        this.bird = new Bird ()
        this.background = new Background ('Background.webp',2)
        this.floor = new Background ('Floor.webp', 1)
        this.setState(GameState.INTRO)
    }
    run() {
        console.log ("running the game")
        this.frame()
    }
    frame() {
        this.ctx.clearRect(0, 0, 960, 720)
       // this.background.draw(this.ctx)
        this.floor.draw(this.ctx)
        if (this.state == GameState.INTRO) {
            this.ctx.font = "30px serif"
            this.ctx.fillStyle = "rgba(0, 0, 0, 1"
            this.ctx.fillText("FLAP BIRD", 400, 125)
            this.ctx.fillText("press SPACE to begin", 240, 250)
        }
        window.requestAnimationFrame(this.frame.bind(this))
        this.background.animate()
        this.floor.animate()
        this.bird.draw(this.ctx)
        this.bird.animate()
    }

    keydown(event) {
        if (this.state == GameState.INTRO) {
            if (event.key == " ") {
                this.setState(GameState.START)
            }
        }
        if (this.state == GameState.READY) {
            if (event.key == " ") {
                this.setState(GameState.START)
            }
        }
    }

    setState(state){
        if (state == GameState.INTRO){
            this.bird.prepare()
        }
        else if (state == GameState.READY){
            this.bird.beginFlying()
        }
        this.state = state
    }
}