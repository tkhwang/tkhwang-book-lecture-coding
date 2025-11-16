
type Rental =
    | 'Regular'

export class Customer {
    private regularRentalCount = 0;

    constructor(private readonly name: string) { }

    addRental(type: Rental, days: number) {
    }

    getRentalFee() {
        return 1.5;
    }

    getRentalPoints() {
        return 1;
    }
}