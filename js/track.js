import {canvas, scores, target, figure} from './dom.js'

canvas.width  = figure.clientWidth
canvas.height = figure.clientHeight

const {x, y} = canvas.getBoundingClientRect()
const gameLeft = x
const gameTop = y
const endPoint = canvas.height

class Track {

    static setPaused(b){
        this.paused = b
    }

    constructor(padding){
        this.padding  = padding
        this.reset()
    }

    reset(){
        if(this.clicker) canvas.removeEventListener('click', this.clicker, false)
        this.speed = Math.round(3 + Math.random() * 7)
        this.fruit = Track.getRandomFruit()
        this.position = this.fruit.image.height * -1
        this.clicker = e => {
            if(this.constructor.paused) return
            let x = e.pageX - gameLeft, y = e.pageY - gameTop
            if(!this.fruit.isClicked(x, y)) return
            console.log(this.fruit.name)
            let n = scores.textContent.trim() || 0
            n = +n + (this.fruit.name == target.title ? this.speed + 10 : -5)
            scores.textContent = n
            Track.setRandomFruit()
            this.reset()
        }
        canvas.addEventListener('click', this.clicker, false)
    }

    step(){
        if(this.position > endPoint){
            this.reset()
        } 
        this.fruit.setPoint(this.padding, this.position)
        this.fruit.render()
        this.position += this.speed
    }

}

export default Track