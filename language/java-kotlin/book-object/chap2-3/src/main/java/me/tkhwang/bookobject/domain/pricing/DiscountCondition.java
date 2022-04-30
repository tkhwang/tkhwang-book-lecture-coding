package me.tkhwang.bookobject.domain.pricing;

import me.tkhwang.bookobject.domain.Screening;

public interface DiscountCondition {
    boolean isSatisfiedBy(Screening screening);
}
