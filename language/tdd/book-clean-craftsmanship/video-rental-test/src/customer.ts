
type Rental =
    | 'Regular'

export class Customer {
    private regularRentalCount = 0;

    constructor(private readonly name: string) { }

    addRental(type: Rental, days: number) {
        if (type === 'Regular') this.regularRentalCount += 1;
    }

    getRentalFee() {
        return this.regularRentalCount * 1.5;
    }

    getRentalPoints() {
        return this.regularRentalCount;
    }
}