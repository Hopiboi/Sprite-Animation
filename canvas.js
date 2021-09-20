let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth * 0.7
canvas.height = window.innerHeight * 0.9
let context = canvas.getContext("2d")

const bg = new Background('Assets/bg/MetalSlugBackground.png', canvas.width, canvas.height);
const player = new Player(0, canvas.height*0.67)

function animate() {

    context.clearRect( 0, 0, canvas.width, canvas.height)

    if(!player.isHurt()) {
        bg.update()
    }
    bg.draw()


    if(player.isHurt()){
        player.update('hurt')
        player.draw('hurt')
    }

    else if (player.isJump()) {
        player.update('jump')
        player.draw('jump')
    }

    else if (player.isFalling()){
        player.update('fall')
        player.draw('fall')
    }

    else if (player.isWalking()) {
        player.update('walk')
        player.draw('walk')
    }

    else if(player.isShot()){
        player.update('gun')
        player.draw('gun')
    }

    else {
        player.update('idle')
        player.draw('idle')
    }


    requestAnimationFrame(animate)
}

animate()

document.addEventListener('keydown' , key_down_listener)
document.addEventListener('keyup' , key_up_listener)

function key_down_listener(event) {
    player.move("keydown",event.key) 
}


function key_up_listener(event) {
    player.move('keyup', event.key)
}








