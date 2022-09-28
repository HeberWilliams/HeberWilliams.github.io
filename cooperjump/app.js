document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const end = document.querySelector('.end')
    const cooper = document.createElement('div')
    let cooperLeftSpace = 50
    let startPoint = 150
    let cooperBottomSpace = startPoint
    let isGameOver = false
    let speed = 3
    const gravity = 0.9
    let platformCount = 5
    let platforms = []
    let upTimerId
    let downTimerId
    let isJumping = true
    let isGoingLeft = false
    let isGoingRight = false
    let isGoingStraight = false
    let leftTimerId
    let rightTimerId
    let score = 0
    let gameStarted = false



    function createCooper() {
        grid.appendChild(cooper)
        cooper.classList.add('cooper')
        cooperLeftSpace = platforms[0].left
        cooper.style.left = cooperLeftSpace + 'px'
        cooper.style.bottom = cooperBottomSpace + 'px'
    }

// generate platform at random location
    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom
            this.left = Math.random() * 315
            this.visual = document.createElement('div')

            const visual = this.visual
            visual.classList.add('platform')
            visual.style.left = this.left + 'px'
            visual.style.bottom = this.bottom + 'px'
            grid.appendChild(visual)
        }
    }

    function createPlatforms() {
        for (let i = 0; i < platformCount; i++){
            let platGap = 600 / platformCount
            let newPlatBottom = 100 + i * platGap
            let newPlatform = new Platform(newPlatBottom)
            platforms.push(newPlatform)
            console.log(platforms)

        }
    }
    
    function movePlatforms() {
        if(cooperBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4
                let visual = platform.visual
                visual.style.bottom = platform.bottom + 'px'

                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual
                    firstPlatform.classList.remove('platform')
                    platforms.shift()
                    score ++
                    console.log(platforms)
                    let newPlatform = new Platform(600)
                    platforms.push(newPlatform)

                    if (gameStarted == true && isGameOver == false) {
                        
                        document.querySelector('.initial').innerHTML = ''
                        document.querySelector('.initial').innerHTML = score
                    }
                }

            })
        }
    }

    function jump() {
        clearInterval(downTimerId)
        isJumping = true
        upTimerId = setInterval(function () {
            cooperBottomSpace += 20
            cooper.style.bottom = cooperBottomSpace + 'px'
            if (cooperBottomSpace > startPoint + 200) {
                fall()
                isJumping = false
            }
        },30)
    }

    function fall() {
        clearInterval(upTimerId)
        isJumping = false
        downTimerId = setInterval(function () {
            cooperBottomSpace -= 5
            cooper.style.bottom = cooperBottomSpace + 'px'
            if (cooperBottomSpace <= 0) {
                gameOver()
            }
            platforms.forEach(platform => {
                if (
                    (cooperBottomSpace >= platform.bottom) &&
                    (cooperBottomSpace <= platform.bottom + 15) &&
                    ((cooperLeftSpace + 60) >= platform.left) &&
                    (cooperLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    console.log('Landed')
                    startPoint = cooperBottomSpace
                    jump()
                    isJumping = true
                }
            })


        },20)
    }

    function gameOver() {
        console.log('Game Over')
        isGameOver = true
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        
        grid.insertAdjacentHTML('afterbegin', 'Score: ')
        grid.insertAdjacentHTML('beforeend', score)
        grid.insertAdjacentHTML('afterend', 'Press Spacebar to reset')

        
        clearInterval(upTimerId)
        clearInterval(downTimerId)
        clearInterval(leftTimerId)
        clearInterval(rightTimerId)

        document.addEventListener('keyup', event => {
            if (event.code === 'Space') {

                //reset game after end
                location.reload()
            }
            
            
        })
    }

    function control(e) {
        cooper.style.bottom = cooperBottomSpace + 'px'
        if (e.key === "ArrowLeft") {
            moveLeft()
        } else if (e.key === "ArrowRight") {
            moveRight()
        } else if (e.key === "ArrowUp") {
            moveStraight()
        }
    }

    function moveLeft() {
        if (isGoingLeft) {
            return
        }

        if (isGoingRight) {
            clearInterval(rightTimerId)
            isGoingRight = false
        }
        
        isGoingLeft = true
        
        leftTimerId = setInterval(function () {
            if (cooperLeftSpace >= 0) {
            cooperLeftSpace -= 5
            cooper.style.left = cooperLeftSpace + 'px'
            } else moveRight()
        },20)
    }

    function moveRight() {
        if (isGoingRight) {
            return
        }

        if (isGoingLeft) {
            clearInterval(leftTimerId)
            isGoingLeft = false
        }
        
        isGoingRight = true
        
        rightTimerId = setInterval(function () {
            if (cooperLeftSpace <= 340) {
            cooperLeftSpace += 5
            cooper.style.left = cooperLeftSpace + 'px'
            } else moveLeft()
        },20)
    }

    function moveStraight() {

        if (isGoingStraight = true) {
            return
        }

        isGoingStraight = true
        isGoingLeft = false
        isGoingRight = false
        clearInterval(rightTimerId)
        clearInterval(leftTimerId)
    }


    
    function start() {
        gameStarted = true
        if (!isGameOver) {
            createPlatforms()
            createCooper()
            
            setInterval(movePlatforms,30)
            jump(startPoint)
            document.addEventListener('keydown', control)

            document.querySelector('.initial').innerHTML = '0'
        }
    }

    
    //attach to key spacebar
    function listenStart() {


        document.addEventListener('keyup', event => {
            if (event.code === 'Space' && gameStarted == false) {
                gameStarted = true
                start()
            }
        })
    }

    listenStart()
    

})