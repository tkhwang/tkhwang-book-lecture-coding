export function factors(n: number): number[] {
    if (!Number.isInteger(n) || n < 2) {
        return [];
    }

    const factors: number[] = [];

    for (let divisor = 2; n > 1; divisor += 1) {
        for (; n % divisor === 0; n /= divisor) {
            factors.push(divisor);
        }
    }

    return factors;
}
