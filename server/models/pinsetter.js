class PinSetter {
    constructor() {
        this._pins = {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true
        };
        this._knockedPins = 0;
    }

    //Compares the current knocked pins to what the user is saying is knocked in order to prevent inflated score.
    calculatePoints(knockedPins) {
        let points = 0;
        for(let i = 1; i <= 10; i++) {
            if(knockedPins[i] != this._pins[i]){
                if(this._pins[i]) {
                    this._pins[i] = false;
                    points++;
                }
            }
        }

        return points;
    }

    get pins() {
        return this._pins;
    }
}

module.exports = PinSetter;