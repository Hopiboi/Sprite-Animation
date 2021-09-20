class Player {
    constructor(posX, posY){

        this.spritesheet_idle = new Image()
        this.spritesheet_idle.src = "Assets/Gunvolt/Idle/GunvoltIdle.png"

        this.spritesheet_hurt = new Image()
        this.spritesheet_hurt.src = "Assets/Gunvolt/Hurt/GunvoltHurt.png"

        this.spritesheet_walk = new Image()
        this.spritesheet_walk.src = "Assets/Gunvolt/Walk/GunvoltWalk.png"

        this.spritesheet_jump = new Image()
        this.spritesheet_jump.src = "Assets/Gunvolt/Jump/GunvoltJump.png"

        this.spritesheet_fall = new Image()
        this.spritesheet_fall.src = "Assets/Gunvolt/Fall/GunvoltFall.png"

        // this.spritesheet_leftwalk = new Image()
        // this.spritesheet_leftwalk.src = "Assets/Gunvolt/Walk/GunvoltWalkLeft.png"

        this.spritesheet_gun = new Image()
        this.spritesheet_gun.src = "Assets/Gunvolt/Gun/GunvoltGun.png"

        this.x = posX
        this.y = posY
        this.imageWidth =  canvas.width*0.1
        this.imageHeight = canvas.height*0.2

        this.gameFrame = 0
        this.frameSpeed = 5

        this.movement = {
            LEFT: false,
            RIGHT : false,
            JUMP : false,
            FALL : false,
            SHOOT : false
        }

        this.keyCodes = {
            UP : 'ArrowUp',
            LEFT : 'ArrowLeft',
            RIGHT : 'ArrowRight', 
            DOWN :  'ArrowDown'
        }


        //var should be small letter
        this.actions = {
            walk : {
                'spritesheet' : this.spritesheet_walk,
                'frame_counter' : 0,
                'spriteWidth' : 253,
                'speed' : 20,
            },

            leftwalk : {
                'spritesheet' : this.spritesheet_leftwalk,
                'frame_counter' : 0,
                'spriteWidth' : 249,
                'speed' : 5,
            },

            idle : {
                'spritesheet' : this.spritesheet_idle,
                'frame_counter' : 0,
                'spriteWidth' : 241,
                'speed' : 5,
            },

            hurt : {
                'spritesheet' : this.spritesheet_hurt,
                'frame_counter' : 0,
                'spriteWidth' : 241,
                'speed' : 5,
            },

            gun : {
                'spritesheet' : this.spritesheet_gun,
                'frame_counter' : 0,
                'spriteWidth' : 324,
                'speed' : 5,

            },

            jump : {
                'spritesheet' : this.spritesheet_jump,
                'frame_counter' : 0,
                'spriteWidth' : 324,
                'jumpLimit' : 100,
                'position' : 0,
            },

            fall : {
                'spritesheet' : this.spritesheet_fall,
                'frame_counter' : 0,
                'spriteWidth' : 324,
                'fallLimit' : 0,
                'position' : 100
            }

        }

    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    move(keyType, key){

        if (keyType == 'keydown'){
            
            if (key == this.keyCodes.RIGHT) {
                this.movement.RIGHT = true

            }

            if (key == this.keyCodes.LEFT) {
                this.movement.LEFT = true
            }

            if (key == this.keyCodes.UP) {
                this.movement.JUMP = true
            }

            if (key =='z') {
                this.movement.SHOOT = true
            }

        }

        if (keyType == 'keyup') {

            if (key == this.keyCodes.RIGHT) {
                this.movement.RIGHT = false
            }

            if (key == this.keyCodes.LEFT) {
                this.movement.LEFT = false
            }   
        }

    }

    isWalking() {
        return this.movement.RIGHT || this.movement.LEFT
    }

    isShot() {
        return this.movement.SHOOT
    } 

    isHurt() {
        return this.x + this.imageWidth >= canvas.width 
    }

    isJump() {
        return this.movement.JUMP
    }

    isFalling() {
        return this.movement.FALL
    }
    
    
    update(action) {

        //moving the player
        if (this.gameFrame % this.frameSpeed == 0) {


        if (!this.isHurt()){

            if (this.movement.RIGHT) {
                this.x = this.x + this.actions.walk.speed
                
            }

            else if (this.movement.LEFT) {
                this.x = this.x - this.actions.walk.speed
            }

                if (this.movement.JUMP) {
                    this.y = this.y - 10
                    this.actions.jump.position = this.actions.jump.position + 10
    
    
                    if (this.actions.jump.position >= this.actions.jump.jumpLimit){
                        this.actions.jump.position = 0
                        this.movement.JUMP = false
                        this.movement.FALL = true
                        this.keyCodes.UP = false
                    }
                }
                
                else if(this.movement.FALL){
                    this.y = this.y + 10
                    this.actions.fall.position = this.actions.fall.position - 10

                    if (this.actions.fall.position <= this.actions.fall.fallLimit){
                        this.actions.fall.position = 100
                        this.movement.FALL = false                   
                        this.keyCodes.UP = true 
                        this.movement.JUMP = true
                    }
                }
            
            
        }

            //animation

            if (action == "walk") {
                this.actions[action].frame_counter++
    
                if(this.actions[action].frame_counter > 7) {
                    this.actions[action].frame_counter = 0 
                }
    
            }

            
            else if (action == "idle") {
                this.actions[action].frame_counter++
    
                if(this.actions[action].frame_counter > 6) {
                    this.actions[action].frame_counter = 0 
                }
            }  

            else if (action == "hurt") {
                this.actions[action].frame_counter++
    
                if(this.actions[action].frame_counter > 8) {
                    this.actions[action].frame_counter = 8 
                }
            }
            
            else if (action == "gun") {
                this.actions[action].frame_counter++
    
                if(this.actions[action].frame_counter > 4) {
                    this.actions[action].frame_counter = 0 
                    this.movement.SHOOT = false 
                }
                
            }

            else if (action == "jump") {
                this.actions[action].frame_counter++
    
                if(this.actions[action].frame_counter > 4) {
                    this.actions[action].frame_counter = 4 
                }
            }

            else if (action == "fall") {
                this.actions[action].frame_counter++
    
                if(this.actions[action].frame_counter > 4) {
                    this.actions[action].frame_counter = 4 
                }
            }
        }

        this.gameFrame++;

    }

    draw(action) {

        

        context.drawImage(

            this.actions[action].spritesheet,
            this.actions[action].frame_counter*this.actions[action].spriteWidth,
            0,
            this.actions[action].spriteWidth,
            this.actions[action].spritesheet.height,
            this.x,
            this.y,
            this.imageWidth,
            this.imageHeight
        )

    }
}