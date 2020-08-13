
export const getLetterCount = string => {
    return string.split('').reduce((acc, letter) => {
        if (!acc[letter]) {
            acc[letter] = 1;
        } else {
            acc[letter] += 1;
        }
        return acc;
    }, {});
};
