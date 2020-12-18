const intro   = document.querySelector('#intro')
const game    = document.querySelector('#game')
const result  = document.querySelector('#result')

const form    = intro.querySelector('form')
const input   = form.querySelector('input')

const figure  = game.querySelector('figure')
const target  = game.querySelector('nav img')
const scores  = game.querySelector('.gamers-scores')
const time    = game.querySelector('.gamers-time')
const pause   = game.querySelector('button')
const canvas  = figure.querySelector('canvas')

const context = canvas.getContext('2d')

export {intro, game, result, form, canvas, input, context, target, scores, time, pause, figure}





