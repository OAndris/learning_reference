import { expect } from 'chai';
import { getLetterCount } from '../src/letter-count';

describe('getLetterCount - basic functionality', () => {
    it('returns an empty object when passed an empty string', () => {
        const actual = getLetterCount('');
        const expected = {};
        expect(actual).to.deep.equal(expected);
    })

    it('returns the correct letter count for a word with only one of each letter', () => {
        const actual = getLetterCount('cat');
        const expected = { c: 1, a: 1, t: 1 };
        expect(actual).to.deep.equal(expected);
    })

    it('returns the correct letter count for a word with more than one of certain letters', () => {
        const actual = getLetterCount('better');
        const expected = { b: 1, e: 2, t: 2, r: 1 };
        expect(actual).to.deep.equal(expected);
    })
})
