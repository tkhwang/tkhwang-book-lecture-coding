import { describe, it, expect } from 'vitest';
import { Customer } from '../src/customer.js';

const assertFeeAndPoint = (
    actualFee: number, actualPoints: number,
    expectedFee: number, expectedPoints: number) => {
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

            assertFeeAndPoint(rentalFee, rentalPoints, 1.5, 1);
        });
    });
});
