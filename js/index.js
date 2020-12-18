import {intro, game, result, form, input, scores} from './dom.js'
import FruitPromise from './fruit.js'
import Game from './game.js'

const IntroPromise = new Promise((resolve, reject) => {
    form.addEventListener('submit', e => {
        e.preventDefault()
        const name = input.value.trim()
        if(!name) return alert('Пожалуйста, укажите имя игрока.')
        resolve(name)
    })
})

IntroPromise
    .then(name => {
        input.value = ''
        game.querySelector('.gamers-name').textContent = name
        result.querySelector('.gamers-name').textContent = name
        intro.classList.add('hidden')
        return Promise.resolve()
    })
    .then(() => FruitPromise)
    .then(fruit => new Game(fruit).play())
    .then(() => {
        result.querySelector('.gamers-scores').textContent = scores.textContent
        result.querySelector('button').addEventListener('click', () => location.reload())
        game.classList.add('hidden')
    })
    .catch(ex => console.log(ex))

