let canvas = document.getElementById("canvas")
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.9;
let context = canvas.getContext("2d")

const bg = new Background('Assets/bg/MetalSlugBackground.png', canvas.width, canvas.height);
const player = new Player(0, canvas.height*0.67)

function animate() {

    context.clearRect( 0, 0, canvas.width, canvas.height)

    //for background
    if(!player.isDead && player.isRight) {
        bg.update()
    }
    bg.draw()
  
    // if (player.x >  (canvas.width*0.5)) {
    //     player.isDead = true
    //     player.update('hurt')
    //     player.draw('hurt')
    // }

    //walk
    if (player.isRight && !player.isDead) {
        player.update('walk')
        player.draw('walk')
    }

    if (player.isLeft && !player.isDead) {
        player.update('leftwalk')
        player.draw('leftwalk')
    }
    
    //gun
    else if (!player.isRight && !player.isLeft && !player.isDead && player.isShot){
        player.update('gun')
        player.draw('gun')
    }

    //idle
    else if (!player.isRight && !player.isLeft && !player.isDead  && !player.isShot) {
        player.update('idle')
        player.draw('idle')
    }
    
    
    requestAnimationFrame(animate)
}

animate()

document.addEventListener('keydown' , key_down_listener)
document.addEventListener('keyup' , key_up_listener)

function key_down_listener(event) {
    //console.log('key down (hold)')
   // console.log(event.key)
    player.move("key_down",event.key) 
}


function key_up_listener(event) {
   // console.log('release')
   // console.log(event.key)
    player.move('key_up', event.key)
}








