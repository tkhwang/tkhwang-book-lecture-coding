package me.tkhwang.bookobject.domain.pricing;

import me.tkhwang.bookobject.domain.Money;
import me.tkhwang.bookobject.domain.Screening;

public class NoneDiscountPolicy implements DiscountPolicy {
    @Override
    public Money calculateDiscountAmount(Screening screening) {
        return Money.ZERO;
    }
}

