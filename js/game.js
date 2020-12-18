import {target, canvas, context, time, pause, figure} from './dom.js'
import Track from './track.js'

class Game {

    constructor(fruit){
        this.fruit = fruit
        const margin = 0
        const trackWidth = fruit[0].image.width + margin * 2
        const tracksPerCanvas = Math.floor(canvas.width / trackWidth)
        const padding = (canvas.width - tracksPerCanvas * trackWidth) / 2
        let position = Math.round(padding)
        Game.getRandomFruit = () => {
            const pos = Math.floor(Math.random() * fruit.length)
            return fruit[pos]
        }
        Game.setRandomFruit = () => {
            const rfName = Game.getRandomFruit().name
            target.src   = `img/${rfName}.png`
            target.title = rfName
        }
        Track.getRandomFruit = Game.getRandomFruit
        Track.setRandomFruit = Game.setRandomFruit
        this.tracks = new Array(tracksPerCanvas)
        for(let i = 0; i < tracksPerCanvas; i++){
            this.tracks.push(new Track(position))
            position += trackWidth
        }
    }

    play(){


        Game.setRandomFruit()
        const howLong = 60000
        let startTimestamp = null
        let pausedTimestamp = null
        let pausedTime = 0
        let pausedState = false
        let toShow = howLong / 1000
        time.textContent = toShow
        let expired = howLong

        pause.addEventListener('click', () => {
            pausedState = !pausedState
            Track.setPaused(pausedState)
        })

        const setExpation = (timestamp) => {
            if(!startTimestamp) startTimestamp = timestamp
            if(!pausedTimestamp && pausedState) pausedTimestamp = timestamp
            if(pausedState) return
            if(pausedTimestamp){
                 pausedTime += timestamp - pausedTimestamp
                 pausedTimestamp = 0
            }
            const progress = timestamp - startTimestamp - pausedTime
            expired = howLong - progress
            const secs = Math.floor(expired / 1000)
            if(secs != toShow){
                toShow = secs
                time.textContent = toShow
            } 
        }
        
        return new Promise((resolve, reject) => {
            const redrawFruit = (timestamp)=> {
                setExpation(timestamp) 
                if(pausedState) return requestAnimationFrame(redrawFruit)
                if(expired < 1) resolve()
                context.clearRect(0, 0, canvas.width, canvas.height)
                this.tracks.forEach((track, i) => {
                    track.step() 
                })
                requestAnimationFrame(redrawFruit)
            }
            requestAnimationFrame(redrawFruit)
        })
    }
}

export default Game