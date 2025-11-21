import {Background} from './background.js'
import {Bird} from './Bird.js'
import {Pipe} from './Pipe.js'
import {Floor} from './Floor.js'

const GameState = {
    INTRO: "INTRO",
    READY: "READY",
    GETTINGREADY: "GETTINGREADY",
    HITPIPE: "HITPIPE",
    HITGROUND: "HITGROUND",
    PLAYING: "PLAYING",
    GAMEOVER: "GAMEOVER",
}

export default class Game {     
    constructor() {
        const canvas = document.getElementById("game")
        this.ctx = canvas.getContext("2d")
        document.addEventListener("keydown", this.keydown.bind(this))
        //document.addEventListener("keyup", this.keyup.bind(this))
        this.bird = new Bird ()
        this.bg = new Background ('Background.webp',-.5)
        this.floor = new Floor ('Floor2.webp', -4)
        this.createPipes()
        this.setState(GameState.INTRO)
        this.bobangle = 0
        this.bobheight = 0
        this.birdscore = 0
        this.whiteflashct = 0
        this.txtflash = 0
        this.highscore = 0

        this.highscore = localStorage.getItem("highscore")

    }
    createPipes(){
        var numberpipes = 4
        this.pipes = [] 
        for (let i = 0; i < numberpipes; i++){
            this.pipes[i] = new Pipe (-2, 1060+((1260/numberpipes)*i))
        }
    }
    run() {
        this.frame()
    }
    frame() {
        // Draw
        this.ctx.clearRect(0, 0, 960, 720)
        this.bg.draw(this.ctx)
        this.bird.draw(this.ctx)       
        this.floor.draw(this.ctx)
        for (let i = 0; i < this.pipes.length; i++){
            this.pipes[i].draw(this.ctx,i)
        }

        if (this.state == GameState.INTRO) {
            this.ctx.font = "bold 100px Courier"
            this.ctx.fillStyle = "rgba(144, 9, 255, 1)"
            this.ctx.fillText("FLAPPY SENIOR", 100, 200)
            this.ctx.font = "bold 100px Courier"
            this.ctx.fillStyle = "rgba(144, 9, 255, 1)"
            this.ctx.fillText(`HIGH SCORE: ${this.highscore}`, 100, 600)
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowOffsetX = 5;
            this.ctx.shadowOffsetY = 5;
        }
        else if (this.state == GameState.READY) {
            this.ctx.font = "bold 70px Courier"
            this.ctx.fillStyle = "rgba(144, 9, 255, 1)"
            this.ctx.fillText("PRESS SPACE TO START", 50, 200)
        }
        else if (this.state == GameState.GAMEOVER) {
            this.txtflash ++
                this.ctx.fillText("Press      to play again", 10, 600)
                this.ctx.fillStyle = "rgba(144, 9, 255, 1)"
                this.ctx.fillText("SPACE", 230, 600)
            if ((this.txtflash % 50) > 25){
                this.ctx.font = "70px monospace"
                this.ctx.fillStyle = "rgba(0, 0, 0, 1)"  
                this.ctx.fillText("GAMEOVER", 360, 300)
                this.ctx.font = "70px monospace"
                this.ctx.fillStyle = "rgba(0, 0, 0, 1)"
                this.ctx.fillText(`YOUR SCORE WAS ${this.birdscore}`, 200, 425)

            }
            }   
        else if (this.state == GameState.PLAYING) {
            this.ctx.font = "50px monospace"
            this.ctx.fillStyle = "rgba(0, 0, 0, 1)"
            this.ctx.fillText(`${this.birdscore}`, 460, 100)
        }

        if (this.whiteflashct > 0) {
            if (this.whiteflashct == 1) {
                this.ctx.fillStyle = "white" 
                this.ctx.fillRect(0, 0, 960, 720)
            }
            this.whiteflashct--
        }

        if (this.birdscore > parseInt(localStorage.getItem("highscore"))) {
            localStorage.setItem("highscore", this.birdscore)
        }

        if (this.storagedHighScore  || this.birdscore > parseInt(this.storagedHighScore)) {
            localStorage.setItem("highscore", this.birdscore)
        }
        // Animate
        this.bg.animate()
        this.floor.animate()  
        this.bird.animate()

        if (this.state == GameState.GETTINGREADY) {
            if (this.bird.isReady())
                this.setState(GameState.READY)
        }
        if ((this.state == GameState.PLAYING) || (this.state == GameState.HITPIPE)) {
            if (this.checkCollision(this.bird.boundingBox(),this.floor.boundingBox())) {
                this.log("hit FLOOR")
                this.setState(GameState.GAMEOVER)
            }
        }
        // Check for floor collision in both PLAYING and HITPIPE
        if (this.state == GameState.PLAYING) {
            var birdbounds = this.bird.boundingBox()
            for (let i = 0; i < this.pipes.length; i++) {
                var firstpipebounds = this.pipes[i].upperboundingBox()
                this.pipes[i].animate()
                var secondpipebounds = this.pipes[i].upperboundingBox()
                //console.log(firstpipebounds, birdbounds)
                if ((birdbounds.x < firstpipebounds.x) && (birdbounds.x >= secondpipebounds.x)) {
                    this.birdscore += 1
                }

                if (this.checkCollision(this.bird.boundingBox(),this.pipes[i].upperboundingBox())) {
                    this.log("hit UPPER pipe")
                    this.setState(GameState.HITPIPE)
                }
                if (this.checkCollision(this.bird.boundingBox(),this.pipes[i].lowerboundingBox())) {
                    this.log("hit LOWER pipe")
                    this.setState(GameState.HITPIPE)
                }
            }
        }

        window.requestAnimationFrame(this.frame.bind(this))
    }



    log(str) {
        var seconds = Date.now() / 1000
        console.log(`${seconds} %c[GAME] ${str}`,"color:purple")
    }

    setState(state){
        this.log(`set state to ${state}`)
        if (state == GameState.INTRO){
            this.bird.startRound()
            this.bg.startRound()
            this.floor.startRound()
            this.birdscore = 0
        for (let i = 0; i < this.pipes.length; i++){
                this.pipes[i].startRound()
            }
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
        else if (state == GameState.HITPIPE) {
            for (let i = 0; i < this.pipes.length; i++){
                this.pipes[i].stopMoving()
            }
            this.whiteflashct = 1
            this.bird.hittingThePipe()
            this.floor.gameover()
            this.bg.notMoving()

        }

        else if (state == GameState.GAMEOVER) {
            for (let i = 0; i < this.pipes.length; i++){
            this.pipes[i].stopMoving()
            }
            this.bird.hittingTheGround()
            this.floor.gameover()
            this.bg.notMoving()
            if (this.birdscore > this.highscore) {
                this.highscore = this.birdscore
                localStorage.setItem("highscore",this.highscore)
            }
        }
        this.state = state
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
        else if (this.state == GameState.GAMEOVER) {
            if (event.key == " ") {
                this.setState(GameState.INTRO)
            }
        }
    }
}