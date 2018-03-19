var app = new Vue({
    el: '#app',

    data: {
        sequence: [],
        sequenceCopy: [],
        inPlay: false,
        stepCount: 0,
        playerStep: 0,
        playInterval: "",
        winningSteps: 20,
        sounds: [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')],
        strict: false
    },

    methods: {
        addToSequence: function() {
            var newNumber = Math.floor(Math.random() * 4) + 1
            this.sequence.push(newNumber)
            this.stepCount += 1
            // this.playSound(newNumber)
            // this.lightUp(newNumber)
        },

        reset: function() {
            this.sequence = []
            this.stepCount = 0
            this.playerStep = 0
            this.$refs['startBt'].removeAttribute('disabled')
            this.inPlay = false
        },

        lightUp: function(quadrant) {
            const quarter = this.$refs['q' + quadrant]
            quarter.classList.remove('dim')
            quarter.classList.add('lit')
            
            setTimeout(()=> {
                quarter.classList.add('dim')
                quarter.classList.remove('lit')
            }, 800)
        },

        startPlayBack: function() {
            this.sequenceCopy = [...this.sequence]

            this.playInterval = setInterval(this.playBack, 1100)
        },

        playBack: function() {
            if (this.sequenceCopy.length > 0) {
                const currentNum = this.sequenceCopy.shift()
                this.playSound(currentNum)
                this.lightUp(currentNum)
                
            } else {
                clearInterval(this.playInterval)
                console.log("Playback is done!")
            }
        },
        
        playSound: function(index) {
            this.sounds[index-1].play()
        },

        buttonClicked: function(index) {
            if (this.inPlay) {
                //compare the incoming index to the current one in the sequence
                if (index == this.sequence[this.playerStep]) {
                //if it's good, play right sound and add to playerStep
                    this.playSound(index)
                    console.log("RIGHT!!")
                    this.playerStep += 1
                    //Once the whole sequence has been matched,
                    //add to the sequence and reset the playerStep
                    if (this.playerStep == this.winningSteps) {
                        this.notify('won')
                        this.reset()
                        return
                    }

                    if (this.playerStep == this.stepCount) {
                        this.addToSequence()
                        this.startPlayBack()
                        this.playerStep = 0
                    }
                } else {
                    //if wrong, play 'wrong' sound, restart sequence and play it all back
                    // on strict mode, reset it all
                    this.playerStep = 0
                    if (this.strict) {
                        console.log('WRONG! - STARTING OVER')
                        this.notify('strict_restart')
                        this.beginPlaying()
                    } else {
                        console.log("WRONG!!")

                        this.notify('try_again')
                        this.startPlayBack()
                        this.playerStep = 0
                    }
                }
            }
        },

        notify: function(type) {
            let notifier = this.$refs['notifier']
            let classToChange
            let notifyText

            switch(type) {
                case 'try_again':
                    classToChange = 'is-warning'
                    notifyText = 'Try Again!'
                    break
                case 'strict_restart':
                    classToChange = 'is-danger'
                    notifyText = 'Strict Mode, Restarting!'
                    break
                case 'won':
                    classToChange = 'is-success'
                    notifyText = 'You Won!!'
                    break
                default:
                    break
            }

            notifier.classList.add(classToChange)
            notifier.innerHTML = notifyText
            notifier.classList.remove('is-hidden')    

            setTimeout((classToChange)=> {
                notifier.classList.add('is-hidden')
                notifier.classList.remove(classToChange)
            }, 750)
        },

        beginPlaying: function() {
            this.reset()
            // Disable the start button
            this.$refs["startBt"].setAttribute('disabled', '')
            this.$refs["resetBt"].removeAttribute('disabled')
            // Add to the sequence
            this.addToSequence()
            this.startPlayBack()
            this.inPlay = true
        }
    },

    mounted: function() {
        this.$refs['resetBt'].setAttribute('disabled', '')
    }
})