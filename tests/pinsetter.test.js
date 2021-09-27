const PinSetter = require('../server/models/pinsetter');
const { SPAREONE, SPARETWO, ONEPIN } = require('./testData');

describe("PinSetter Class", () => {
    it("calculates knockedPins", () => {
        let pinsetter = new PinSetter();

        let score1 = pinsetter.calculatePoints(SPAREONE);
        expect(score1).toBe(5);
        let score2 = pinsetter.calculatePoints(SPARETWO);
        expect(score2).toBe(5);
    });

    it("ignore already knocked pins", () => {
        let pinsetter = new PinSetter();

        let score1 = pinsetter.calculatePoints(ONEPIN);
        expect(score1).toBe(1);
        let score2 = pinsetter.calculatePoints(SPAREONE);
        expect(score2).toBe(4);
    });
});