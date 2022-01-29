package me.tkhwang.bookobject.domain;

public interface DiscountCondition {
    boolean isSatisfiedBy(Screening screening);
}
