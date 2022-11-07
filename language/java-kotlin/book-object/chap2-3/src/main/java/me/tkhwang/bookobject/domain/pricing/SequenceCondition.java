package me.tkhwang.bookobject.domain.pricing;

import me.tkhwang.bookobject.domain.Screening;
import me.tkhwang.bookobject.domain.pricing.DiscountCondition;

public class SequenceCondition implements DiscountCondition {
    private int sequence;

    public SequenceCondition(int sequence) {
        this.sequence = sequence;
    }

    public boolean isSatisfiedBy(Screening screening) {
        return screening.getSequence() == sequence;
    }
}
