package chapter_01;

import org.junit.Test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.*;

public class ScoreCollectionTest {

	@Test
	public void answerArithmeticMeanOfTwoNumbers() {

		// arrange
		ScoreCollection collection = new ScoreCollection();

		collection.add(() -> 5);
		collection.add(() -> 7);

		// act
		int actualResult = collection.arithmeticMean();

		// assert
		assertThat(actualResult, equalTo(6));
	}
}
