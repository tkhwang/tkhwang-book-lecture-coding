import { PalindromeChecker } from './palindromeChecker';

describe('palindrome checker', () => {

    let palindromeChecker: PalindromeChecker;

    beforeEach(() => {
        palindromeChecker = new PalindromeChecker();
    });

    it('should be able to tell that "mom" is not a palindrome', () => {
        const result = palindromeChecker.isPalindrome('mom');

        expect(result).toBeTruthy();
    });

    it('should be able to tell that "bill" is not a palindrome', () => {
        const result = palindromeChecker.isPalindrome('bill');

        expect(result).toBeFalsy();
    });

    it('should still detect a palindrome even if the casing is off', () => {
        const result = palindromeChecker.isPalindrome('Mom');

        expect(result).toBeTruthy();
    });
})