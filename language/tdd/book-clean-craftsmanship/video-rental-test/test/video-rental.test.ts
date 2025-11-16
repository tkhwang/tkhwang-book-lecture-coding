import { describe, it, expect } from 'vitest';
import { Customer } from '../src/customer.js';

const assertFeeAndPoint = (
    customer: Customer,
    expectedFee: number, expectedPoints: number) => {
    const actualFee = customer.getRentalFee();
    const actualPoints = customer.getRentalPoints();

    expect(actualFee).toBe(expectedFee);
    expect(actualPoints).toBe(expectedPoints);
};

describe('Video Rental', () => {
    describe('일반 영화 대여', () => {
        it('첫째 날에 1.5달러이고 대여 기간 하루 당 1폰이트가 적립된다.', () => {
            const customer = new Customer('John Doe');
            customer.addRental('Regular', 1);

            const rentalFee = customer.getRentalFee();
            const rentalPoints = customer.getRentalPoints();

            assertFeeAndPoint(customer, 1.5, 1);
        });

        it('2일인 경우 무료이고 포인트는 적립되지 않는다.', () => {
            const customer = new Customer('John Doe');
            customer.addRental('Regular', 2);

            const rentalFee = customer.getRentalFee();
            const rentalPoints = customer.getRentalPoints();

            assertFeeAndPoint(customer, 1.5, 1);
        })

        it('3일인 경우 무료이고 포인트는 적립되지 않는다.', () => {
            const customer = new Customer('John Doe');
            customer.addRental('Regular', 3);

            const rentalFee = customer.getRentalFee();
            const rentalPoints = customer.getRentalPoints();

            assertFeeAndPoint(customer, 1.5, 1);
        })
    });

});
