package chapter_02;

import chapter_01.ScoreCollection;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;

public class ScoreCollectionTest {
    @Test(expected = IllegalArgumentException.class)
    public void throwsExceptionWhenAddingNull() {
        ScoreCollection collection = new ScoreCollection();
        collection.add(null);
    }

    @Test
    public void answersZeroWhenNoElementsAdded() {
        ScoreCollection collection = new ScoreCollection();
        assertThat(collection.arithmeticMean(), equalTo(0));
    }

    @Test
    public void doesNotProperlyHandleIntegerOverflow() {
        ScoreCollection collection = new ScoreCollection();
        collection.add(() -> Integer.MAX_VALUE);
        collection.add(() -> 1);

        assertTrue(collection.arithmeticMean() < 0);
    }
}