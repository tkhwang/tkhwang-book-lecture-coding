

export class PalindromeChecker {

    isPalindrome(word: string): boolean {
        const normalizedWord = word.toLowerCase();
        return normalizedWord === normalizedWord.split('').reverse().join('');
    }
}