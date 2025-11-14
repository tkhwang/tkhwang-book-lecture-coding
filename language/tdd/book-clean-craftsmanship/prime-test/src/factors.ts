export function factors(n: number): number[] {
    if (!Number.isInteger(n) || n < 2) {
        return [];
    }

    const factors: number[] = [];

    while (n % 2 === 0) {
        factors.push(2);
        n /= 2;
    }

    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            factors.push(i);
            n /= i;
        }
    }

    if (n > 1) {
        factors.push(n);
    }

    return factors;
}
