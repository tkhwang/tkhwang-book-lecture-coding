package me.tkhwang.bookobject.domain.pricing;

import me.tkhwang.bookobject.domain.Money;
import me.tkhwang.bookobject.domain.Screening;

public class NoneDiscountPolicy extends DiscountPolicy {

    @Override
    protected Money getDiscountAmount(Screening screening) {
        return Money.ZERO;
    }
}
