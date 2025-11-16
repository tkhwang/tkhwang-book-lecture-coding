
type Rental =
    | 'Regular'

export class Customer {
    private days = 0;

    constructor(private readonly name: string) { }

    addRental(type: Rental, days: number) {
        this.days += days;
    }

    getRentalFee() {
        return this.applyGracePeriod(1.5, 3);
    }

    getRentalPoints() {
        return this.applyGracePeriod(1, 3);
    }

    private applyGracePeriod(amount: number, grace: number) {
        if (this.days > grace) return amount + amount * (this.days - grace);
        return amount;
    }
}