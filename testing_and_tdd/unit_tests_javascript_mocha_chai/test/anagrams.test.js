import { expect } from 'chai';
import { isAnagram } from '../src/anagrams';

describe('isAnagram - basic functionality', () => {
    it('returns true when two known anagrams are passed in', () => {
        expect(isAnagram('listen', 'silent')).to.equal(true);
        expect(isAnagram('elbow', 'below')).to.equal(true);
    })
    it('returns false when either of the strings has extra letters', () => {
        expect(isAnagram('elbows', 'below')).to.equal(false);
        expect(isAnagram('below', 'elbows')).to.equal(false);
    })
    it('returns false when the strings have the same letters but in different quantities', () => {
        expect(isAnagram('listens', 'silent')).to.equal(false);
    })
    it('returns true when the strings are anagrams, even if either one contains whitespaces', () => {
        expect(isAnagram('conversation', 'voices rant on')).to.equal(true);
    })
    it('returns true when the strings are anagrams, regardless of letter case', () => {
        expect(isAnagram('STATE', 'taste')).to.equal(true);
    })
})
