var app = new Vue({
    el: '#app',

    data: {
        sequence: [],
        stepCount: 0  
    },

    methods: {
        testAlert: function() {
            alert("TEST!")
        },

        addToSequence: function() {
            var newNumber = Math.floor(Math.random() * 4) + 1
            this.sequence.push(newNumber)
            this.stepCount += 1
        },

        reset: function() {
            this.sequence = []
            this.stepCount = 0
        }
    }
})