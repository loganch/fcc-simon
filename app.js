var app = new Vue({
    el: '#app',

    data: {
        sequence: [],
        sequenceCopy: [],
        stepCount: 0,
        playerStep: 0,
        playInterval: "",
        sounds: [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')]
    },

    methods: {
        addToSequence: function() {
            var newNumber = Math.floor(Math.random() * 4) + 1
            this.sequence.push(newNumber)
            this.stepCount += 1
            this.playSound(newNumber)
            this.lightUp(newNumber)
            
        },

        reset: function() {
            this.sequence = []
            this.stepCount = 0
        },

        lightUp: function(quadrant) {
            
            document.getElementById('q' + quadrant).setAttribute('style', 'opacity: 1')
            
            setTimeout(()=> {
                document.getElementById('q' + quadrant).setAttribute('style', 'opacity: .5')
            }, 800)
        },

        startPlayBack: function() {
            this.sequenceCopy = [...this.sequence]

            this.playInterval = setInterval(this.playBack, 1200)
        },

        playBack: function() {
            if (this.sequenceCopy.length > 0) {
                currentNum = this.sequenceCopy.shift()
                this.playSound(currentNum)
                this.lightUp(currentNum)
                
            } else {
                clearInterval(this.playInterval)
                console.log("Playback is done!")
            }
        },
        
        playSound: function(index) {
            this.sounds[index-1].play()
        }
    }
})