const { Bowling, DEFAULT_SCOREBOARD, DEFAULT_PINS } = require('../server/models/bowling');

describe("Bowling Service", () => {
    describe("start init and resets when", () => {
        it('called twice', () => {
            let bowling = new Bowling();
            let pins = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            expect(bowling.scoreboard).toEqual({});
        
            bowling.start(["Scott"]);
            expect(bowling.scoreboard).toEqual({
                "Scott": DEFAULT_SCOREBOARD
            });
        
            bowling.roll(pins);
            expect(bowling.scoreboard).not.toEqual({
                "Scott": DEFAULT_SCOREBOARD
            });
        
            bowling.start(["Scott"]);
            expect(bowling.scoreboard).toEqual({
                "Scott": DEFAULT_SCOREBOARD
            });
        });
    });

    describe("Players turn changes when", () => {
        it('one player rolls twice.', () => {
            let bowling = new Bowling();
            let pins = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            bowling.start(["Scott", "Katrina"]);
            bowling.roll(pins);
            bowling.roll(pins);
            bowling.roll(pins);
        
            expect(bowling.scoreboard["Scott"][1].length).toBe(2);
            expect(bowling.scoreboard["Scott"][1][0]).toBe(0);
            expect(bowling.scoreboard["Scott"][1][1]).toBe(0);
            expect(bowling.scoreboard["Katrina"][1].length).toBe(1);
            expect(bowling.scoreboard["Katrina"][1][0]).toBe(0);
        });

        it('one player roles a strike.', () => {
            let bowling = new Bowling();
            let scott_roll_1 = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let katrina_roll_1 = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            for(let i = 1; i <= 10; i++){
                scott_roll_1[i] = false;
            }
        
            bowling.start(["Scott", "Katrina"]);
            bowling.roll(scott_roll_1);
            bowling.roll(katrina_roll_1);
        
            expect(bowling.scoreboard["Scott"][1].length).toBe(1);
            expect(bowling.scoreboard["Scott"][1][0]).toBe(10);
            expect(bowling.scoreboard["Katrina"][1].length).toBe(1);
            expect(bowling.scoreboard["Katrina"][1][0]).toBe(0);
        });
    });

    describe("Bonus score is properly calculated when", () => {
        it('a player gets a spare.', () => {
            let bowling = new Bowling();
            let scott_roll_1 = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let scott_roll_2 = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let katrina_roll_1 = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            bowling.start(["Scott", "Katrina"]);
            for(let i = 1; i <= 5; i++){
                scott_roll_1[i] = false;
            }
            for(let i = 6; i <= 10; i++){
                scott_roll_2[i] = false;
            }
            bowling.roll(scott_roll_1);
            bowling.roll(scott_roll_2);
            bowling.roll(katrina_roll_1);
            bowling.roll(katrina_roll_1);
            bowling.roll(scott_roll_1);
        
            expect(bowling.scoreboard["Scott"][1].length).toBe(3);
            expect(bowling.scoreboard["Scott"][1].reduce((partial_sum, a) => partial_sum + a, 0)).toBe(15);
            expect(bowling.scoreboard["Katrina"][1].length).toBe(2);
            expect(bowling.scoreboard["Katrina"][1].reduce((partial_sum, a) => partial_sum + a, 0)).toBe(0);
        });

        it('a player gets a strike and then two regular rolls.', () => {
            let bowling = new Bowling();
            let scott_roll_1 = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let scott_roll_2 = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let scott_roll_3 = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let katrina_roll_1 = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            bowling.start(["Scott", "Katrina"]);
            for(let i = 1; i <= 10; i++){
                scott_roll_1[i] = false;
            }
            for(let i = 1; i <= 5; i++){
                scott_roll_2[i] = false;
            }
            scott_roll_3[10] = false;
            bowling.roll(scott_roll_1);
            bowling.roll(katrina_roll_1);
            bowling.roll(katrina_roll_1);
            bowling.roll(scott_roll_2);
            bowling.roll(scott_roll_3);
        
            expect(bowling.scoreboard["Scott"][1].length).toBe(3);
            expect(bowling.scoreboard["Scott"][1].reduce((partial_sum, a) => partial_sum + a, 0)).toBe(16);
            expect(bowling.scoreboard["Katrina"][1].length).toBe(2);
            expect(bowling.scoreboard["Katrina"][1].reduce((partial_sum, a) => partial_sum + a, 0)).toBe(0);
        });

        it('a player gets a turkey.', () => {
            let bowling = new Bowling();
            let scott_roll_1 = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            bowling.start(["Scott"]);
            for(let i = 1; i <= 10; i++){
                scott_roll_1[i] = false;
            }
            bowling.roll(scott_roll_1);
            bowling.roll(scott_roll_1);
            bowling.roll(scott_roll_1);
            bowling.roll(scott_roll_1);
        
            //Roll 1 = Strike Bonus Added
            expect(bowling.scoreboard["Scott"][1].length).toBe(3);
            expect(bowling.scoreboard["Scott"][1].reduce((partial_sum, a) => partial_sum + a, 0)).toBe(30);
            //Roll 2 = Strike Bonus Added
            expect(bowling.scoreboard["Scott"][2].length).toBe(3);
            expect(bowling.scoreboard["Scott"][2].reduce((partial_sum, a) => partial_sum + a, 0)).toBe(30);
            //Roll 3 = Strike Bonus Not Added One Away
            expect(bowling.scoreboard["Scott"][3].length).toBe(1);
            expect(bowling.scoreboard["Scott"][3].reduce((partial_sum, a) => partial_sum + a, 0)).toBe(10);
            //Roll 4 = Strike Bonus Not Added Two Away
            expect(bowling.scoreboard["Scott"][4].length).toBe(1);
            expect(bowling.scoreboard["Scott"][4].reduce((partial_sum, a) => partial_sum + a, 0)).toBe(10);
        });
    });

    describe("A players score is correct when", () => {
        it('a player rolls a perfect game.', () => {
            let bowling = new Bowling();
            let strike = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            bowling.start(["Scott"]);
            for(let i = 1; i <= 10; i++){
                strike[i] = false;
            }
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
        
            let total = 0;
            for (const [key, value] of Object.entries(bowling.scoreboard["Scott"])) {
                total += value.reduce((partial_sum, a) => partial_sum + a, 0);
            }
            expect(total).toBe(300);
        });

        it('when on final frame a player gets a spare then a strike.', () => {
            let bowling = new Bowling();
            let strike = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let spare_1 = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let spare_2 = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            bowling.start(["Scott"]);
            for(let i = 1; i <= 10; i++){
                strike[i] = false;
            }
            for(let i = 1; i <= 5; i++){
                spare_1[i] = false;
            }
            for(let i = 6; i <= 10; i++){
                spare_2[i] = false;
            }
        
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(spare_1);
            bowling.roll(spare_2);
            bowling.roll(strike);

            console.log(bowling.scoreboard);
        
            let total = 0;
            for (const [key, value] of Object.entries(bowling.scoreboard["Scott"])) {
                total += value.reduce((partial_sum, a) => partial_sum + a, 0);
            }
            expect(total).toBe(275);
        });

        it('when on final turn a player gets a strike then a spare.', () => {
            let bowling = new Bowling();
            let strike = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let spare_1 = JSON.parse(JSON.stringify(DEFAULT_PINS))
            let spare_2 = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            bowling.start(["Scott"]);
            for(let i = 1; i <= 10; i++){
                strike[i] = false;
            }
            for(let i = 1; i <= 5; i++){
                spare_1[i] = false;
            }
            for(let i = 6; i <= 10; i++){
                spare_2[i] = false;
            }
        
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(strike);
            bowling.roll(spare_2);
            bowling.roll(spare_2);
        
            let total = 0;
            for (const [key, value] of Object.entries(bowling.scoreboard["Scott"])) {
                total += value.reduce((partial_sum, a) => partial_sum + a, 0);
            }
            expect(total).toBe(285);
        });
    });

    describe("The bowling alley catches when", () => {
        it("goes past 10 frames", () => {
            let bowling = new Bowling();
            let gutter = JSON.parse(JSON.stringify(DEFAULT_PINS))
        
            bowling.start(["Scott"]);

            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            bowling.roll(gutter);
            expect(bowling.roll).toThrow(Error);
        });
    });
});

