package me.tkhwang.bookobject;

import me.tkhwang.bookobject.domain.*;
import me.tkhwang.bookobject.domain.pricing.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;

@SpringBootTest
class BookObjectApplicationTests {

    @Test
    void contextLoads() {

        Movie avatar = new Movie(
                "아바타",
                Duration.ofMinutes(120),
                Money.wons(10000),
                new AmountDiscountPolicy(
                        Money.wons(1800),
                        new SequenceCondition(1),
                        new SequenceCondition(10),
                        new PeroidCondition(
                                DayOfWeek.MONDAY,
                                LocalTime.of(10, 0),
                                LocalTime.of(11, 59)
                        ),
                        new PeroidCondition(
                                DayOfWeek.THURSDAY,
                                LocalTime.of(10, 0),
                                LocalTime.of(20, 59)
                        )
                )
        );

        Movie titanic = new Movie(
                " 타이타닉",
                Duration.ofMinutes(180),
                Money.wons(11000),
                new PercentDiscountPolicy(
                        0.1,
                        new PeroidCondition(
                                DayOfWeek.TUESDAY,
                                LocalTime.of(14, 0),
                                LocalTime.of(16, 59)
                        ),
                        new SequenceCondition(2),
                        new PeroidCondition(
                                DayOfWeek.THURSDAY,
                                LocalTime.of(10, 0),
                                LocalTime.of(13, 59)
                        )
                )
        );


        Movie starWars = new Movie(
                "스타워즈",
                Duration.ofMinutes(210),
                Money.wons(100000),
                new NoneDiscountPolicy()
        );

    }

}
