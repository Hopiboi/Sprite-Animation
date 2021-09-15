class Player {
    constructor(posX, posY){

        this.spritesheet_idle = new Image()
        this.spritesheet_idle.src = "Assets/Gunvolt/Idle/GunvoltIdle.png"

        this.spritesheet_hurt = new Image()
        this.spritesheet_hurt.src = "Assets/Gunvolt/Hurt/GunvoltHurt.png"

        this.spritesheet_walk = new Image()
        this.spritesheet_walk.src = "Assets/Gunvolt/Walk/GunvoltWalk.png"

        this.spritesheet_leftwalk = new Image()
        this.spritesheet_leftwalk.src = "Assets/Gunvolt/Walk/GunvoltWalkLeft.png"

        this.spritesheet_gun = new Image()
        this.spritesheet_gun.src = "Assets/Gunvolt/Gun/GunvoltGun.png"


        this.x = posX
        this.y = posY

        this.gameFrame = 0
        this.frameSpeed = 5

        //this.isMoving = false

        this.isLeft = false
        this.isRight = false 

        this.isDead = false
        this.isShot = false
        
        // this.image = this.spritesheet_walk

        this.actions = {
            'walk' : {
                'spritesheet' : this.spritesheet_walk,
                'frame_counter' : 0,
                'spriteWidth' : 253,
                'speed' : 5,
            //     'frame_limit' : 7
            },

            'leftwalk' : {
                'spritesheet' : this.spritesheet_leftwalk,
                'frame_counter' : 0,
                'spriteWidth' : 249,
                'speed' : 5,
               //  'frame_limit' : 7
            },

            'idle' : {
                'spritesheet' : this.spritesheet_idle,
                'frame_counter' : 0,
                'spriteWidth' : 241,
                'speed' : 5,
              //  'frame_limit' : 6
            },

            'hurt' : {
                'spritesheet' : this.spritesheet_hurt,
                'frame_counter' : 0,
                'spriteWidth' : 241,
                'speed' : 5,
             //   'frame_limit' : 8
            },

            'gun' : {
                'spritesheet' : this.spritesheet_gun,
                'frame_counter' : 0,
                'spriteWidth' : 324,
                'speed' : 5,
               // 'frame_limit' : 4
            }
        }

    }

    move(keyType, key){

        if(keyType == 'key_down') {

            if (key == 'ArrowRight' && !this.isDead && this.x < (canvas.width/1.1)) {
                //this.isMoving = true
                this.isRight = true
                this.x = this.x + this.actions['walk'].speed;
            }
    
            else if (key == 'ArrowLeft' && !this.isDead && this.x > (canvas.width/120))   {
               // this.isMoving = true
               this.isLeft = true
                this.x = this.x - this.actions['leftwalk'].speed;
            }

            else if (key == 'ArrowDown' && !this.isDead && !this.isRight && !this.isLeft) {    
                this.isShot = true
                this.actions['gun']
            }

        }

       
        else if (keyType == 'key_up')
        {
            this.isShot = false
            this.isLeft = false
            this.isRight = false
            //this.isMoving = false
            this.actions['idle']
        }

       
    }

    update(action) {


        if (this.gameFrame % this.frameSpeed == 0) {


            // shorcut method, need the frame limit

            // if (action in this.actions) {
            //     this.actions[action].frame_counter++
    
            //     if(this.actions[action].frame_counter > this.actions[action].frame_limit) {
            //         this.actions[action].frame_counter = 0
            //     }
            // }

            if (action == "walk") {
                this.actions[action].frame_counter++
    
                if(this.actions[action].frame_counter > 7) {
                    this.actions[action].frame_counter = 0 
                }
    
            }

            else if (action == "leftwalk") {
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
            canvas.width*0.1,
            canvas.height*0.2
        )

    }
}