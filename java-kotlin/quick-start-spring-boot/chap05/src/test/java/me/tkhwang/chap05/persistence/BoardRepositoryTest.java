package me.tkhwang.chap05.persistence;

import me.tkhwang.chap05.domain.Board;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BoardRepositoryTest {
    @Autowired
    private BoardRepository boardRepository;

    @Test
    public void testInsertBoard() {
        Board board = new Board();
        board.setTitle("첫 번째 게시글");
        board.setContent(" 잘 등록되나요?");
        board.setCreatedDate(new Date());
        board.setCnt(0L);

        boardRepository.save(board);
    }

    @Test
    public void testQueryAnnotationTest1() {
        List<Board> boardList = boardRepository.queryAnnotationTest("테스트 제목 10");
        for (Board board : boardList) {
            System.out.println("board = " + board.toString());
        }
    }

}