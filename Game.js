import {Background} from './background.js'
import {Bird} from './Bird.js'
import {Pipe} from './Pipe.js'

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
        this.background = new Background ('Background.webp',-1)
        this.floor = new Background ('Floor2.webp', -2)
        this.pipe = new Pipe (-2)
        this.setState(GameState.INTRO)
    }
    run() {
        console.log ("running the game")
        this.frame()
    }
    frame() {
        this.ctx.clearRect(0, 0, 960, 720)
        this.background.draw(this.ctx)
        this.floor.draw(this.ctx)
        this.pipe.draw(this.ctx)
        this.bird.draw(this.ctx)

        if (this.state == GameState.INTRO) {
            this.ctx.font = "70px monospace"
            this.ctx.fillStyle = "rgba(144, 9, 255, 1)"
            this.ctx.fillText("FLAPPY BIRD", 300, 200)
          /*  this.ctx.font = "50px monospace"
            this.ctx.fillStyle = "rgb(0, 0, 0)"
            this.ctx.fillText("press SPACE to begin", 240, 550) */
        }
        else if (this.state == GameState.READY) {
            this.ctx.font = "70px monospace"
            this.ctx.fillStyle = "rgba(0, 0, 0, 1)"
            this.ctx.fillText("PRESS SPACE", 300, 200)
        }

        this.pipe.animate()
        this.background.animate()
        this.floor.animate()  
        this.bird.animate()

        if (this.state == GameState.GETTINGREADY) {
           if (this.bird.isReady())
            this.setState(GameState.READY)
        }

        window.requestAnimationFrame(this.frame.bind(this))
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
            this.pipe.startMoving()
        }
        this.state = state
    }
}