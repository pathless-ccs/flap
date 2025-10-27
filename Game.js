import {Background} from './background.js'
import {Bird} from './Bird.js'

const State = {
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
        this.Background = new Background ()
        this.setState(State.INTRO)
    }
    run() {
        console.log ("running the game")
        this.frame()
    }
    frame() {
        this.ctx.clearRect(0, 0, 960, 720)
        if (this.state == State.INTRO) {
            this.ctx.font = "30px serif"
            this.ctx.fillStyle = "rgba(0, 0, 0, 1"
            this.ctx.fillText("FLAP BIRD", 400, 125)
            this.ctx.fillText("press SPACE to begin", 240, 250)
        }
        window.requestAnimationFrame(this.frame.bind(this))
        this.bird.draw(this.ctx)
        this.bird.animate()
        this.Background.draw(this.ctx)
    }

    keydown(event) {
        if (this.state == State.INTRO) {
            if (event.key == " ") {
                this.setState(State.START)
            }
        }
        if (this.state == State.READY) {
            if (event.key == " ") {
                this.setState(State.START)
            }
        }
    }

    setState(state){
        if (state == State.INTRO){
            this.bird.goToINTRO()
        }
        else if (state == State.READY){
            this.bird.goToSTART()
        }
        this.state = state
    }
}