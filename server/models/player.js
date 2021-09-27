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
        if(frame >= 1 && frame <= 10) return this.score[frame]
        else throw new Error(`There is no frame ${frame}`)
    }

    addScore(frame, score) {
        if(frame >= 1 && frame <= 10) this.score[frame].push(score)
        else throw new Error(`There is no frame ${frame}`)
    }
}

module.exports = Player;