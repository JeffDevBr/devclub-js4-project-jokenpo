const div = document.querySelector('.buttons')
const spanYourScore = document.querySelector('.your-score span')
const spanAlexaScore = document.querySelector('.machine-score span')
const result = document.querySelector('.result')
const container = document.querySelector('.container')
const handPlayerAnimation = document.querySelector('.hand-player')
const handAlexaAnimation = document.querySelector('.hand-alexa')

const winSound = document.getElementById('win-sound')
const loseSound = document.getElementById('lose-sound')
const tieSound = document.getElementById('tie-sound')



const game = ['rock', 'paper', 'scissors']

const rules = {
    rock: { scissors: 'win', paper: 'loses', rock: 'tied' },
    paper: { scissors: 'loses', paper: 'tied', rock: 'win' },
    scissors: { scissors: 'tied', paper: 'win', rock: 'loses' }
}

let yourScore = 0
let alexaScore = 0

const updateScores = (gameResult) => {
    if (gameResult === 'win') {
        yourScore++
        spanYourScore.textContent = yourScore
        result.textContent = "Você ganhou"
        result.style.color = "rgb(180, 248, 44)"
        winSound.play()
        container.setAttribute('class', 'bg-win container')
    } else if (gameResult === 'loses') {
        alexaScore++
        spanAlexaScore.textContent = alexaScore
        result.textContent = "Você perdeu para Alexa"
        result.style.color = "red"
        container.setAttribute('class', 'bg-loses container')
        loseSound.play()
    } else {
        result.textContent = "Deu empate"
        result.style.color = "yellow"
        container.setAttribute('class', 'bg-tied container')

        tieSound.play()
    }
}

const alexaHand = () => game[Math.floor(Math.random() * 3)]

const handleButtonsClick = e => {
    disableButtons()
    if (game.includes(e.target.id)) {
        const alexa = alexaHand()
        const your = e.target.id
        const gameResult = rules[your][alexa]

        updateScores(gameResult)

        handPlayerAnimation.classList.add('show-player')
        handPlayerAnimation.src = `assets/img/${your}.png`
        handAlexaAnimation.classList.add('show-alexa')
        handAlexaAnimation.src = `assets/img/${alexa}.png`

        setTimeout(() => {
            enableButtons()
            container.setAttribute('class', 'container')
            handPlayerAnimation.classList.remove('show-player')
            handAlexaAnimation.classList.remove('show-alexa')
        }, 2000)
    }
}

div.addEventListener('click', handleButtonsClick)


document.addEventListener('DOMContentLoaded', () => {
    const audioElement = document.getElementById('background-music')

    audioElement.volume = 0.05

    const pauseMusic = () => audioElement.pause()
    const playMusic = () => audioElement.play()

    document.getElementById('pause-button').addEventListener('click', pauseMusic)
    document.getElementById('play-button').addEventListener('click', playMusic)
})

const disableButtons = () => {
    div.classList.add('disabled')
}

const enableButtons = () => {
    div.classList.remove('disabled')
}




