import {context} from './dom.js'

const fruitNames = [
    'strawberry',
    'strawberry-cut',
    'lemon',
    'lemon-cut',

    'pear',
    'pear-cut',
    'kiwi',
    'coconut',

    'orange',
    'watermelon',
    'apple-cut',
    'apple',

    'garnet',
    'avocado',
    'tomato-cut',
    'tomato'
]

const getNameAndImage = name => new Promise((resolve, nop) => {
    const image = new Image()
    image.onload = ()=> resolve({name, image})
    image.src = `img/${name}.png`
})

class Fruit {

    constructor(name, image){
        this.name = name
        this.image = image
    }

    isClicked(x, y){
        let ok  = x >= this.x
            ok &= y >= this.y
            ok &= x <= this.x + this.image.width
            ok &= y <= this.y + this.image.height
           return ok
    }

    setPoint(x, y){
        this.x = x
        this.y = y
    }

    render(){
        context.drawImage(this.image, this.x, this.y);
    }

}

export default Promise.all(fruitNames.map(name => getNameAndImage(name)))
    .then(data => data.map(({name, image}) => new Fruit(name, image)))
