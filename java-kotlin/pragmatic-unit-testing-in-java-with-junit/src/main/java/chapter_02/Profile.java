package chapter_02;

import java.util.HashMap;

public class Profile {
    private Map<String, Answer> answers = new HashMap<>();
    private int score;
    private String name;

    public Profile(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void add(Answer answer) {
        answers.put(answer.getQuestionText(), answer);
    }

    public boolean matches(Criteria criteria) {
        score = 0;

        boolean kill = false;
        boolean anyMatches = false;

        for (Criterion criterion) {
            Answer answer = answers.get(
                    criterion.getAnswer().getQuestionText()
            );
            boolean match = criterion.getWeight() == Weight.

        }

    }
}
