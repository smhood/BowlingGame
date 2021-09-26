class Player {

    score = {
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        10: []
    }

    constructor(name) {
        this.name = name;
    }
    
    getFrame(frame) {
        return this.score[frame]
    }
}