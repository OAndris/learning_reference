import { getLetterCount } from './letter-count';
import { isEqual } from 'lodash';

export const isAnagram = (string1, string2) => {
    return isEqual(
        getLetterCount(string1.toLowerCase().replace(/\s+/g, '')),
        getLetterCount(string2.toLowerCase().replace(/\s+/g, ''))
    );
};
