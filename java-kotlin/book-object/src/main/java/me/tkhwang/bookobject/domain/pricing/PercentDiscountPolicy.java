package me.tkhwang.bookobject.domain.pricing;

import me.tkhwang.bookobject.domain.Money;
import me.tkhwang.bookobject.domain.Screening;
import me.tkhwang.bookobject.domain.pricing.DiscountCondition;
import me.tkhwang.bookobject.domain.pricing.DiscountPolicy;

public class PercentDiscountPolicy extends DiscountPolicy {

    private double percent;

    public PercentDiscountPolicy(double percent, DiscountCondition... conditions) {
        super(conditions);
        this.percent = percent;
    }

    protected Money getDiscountAmount(Screening screening) {
        return screening.getMovieFee().times(percent);
    }
}
