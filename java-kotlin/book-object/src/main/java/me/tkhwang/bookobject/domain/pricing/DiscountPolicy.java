package me.tkhwang.bookobject.domain.pricing;

import me.tkhwang.bookobject.domain.Money;
import me.tkhwang.bookobject.domain.Screening;

public interface DiscountPolicy {
    public Money calculateDiscountAmount(Screening screening);
}
