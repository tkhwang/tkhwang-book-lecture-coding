package me.tkhwang.chap05.persistence;

import me.tkhwang.chap05.domain.Board;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;

@SpringBootTest
public class QueryMethodTest {
    @Autowired
    private BoardRepository boardRepository;


    @BeforeEach
    public void dataPrepare() {
        for (int i = 1; i <= 200; i++) {
            Board board = new Board();
            board.setTitle(" 테스트 제목 " + i);
            board.setWriter("테스트");
            board.setContent("테스트 내용 " + i);
            board.setCreatedDate(new Date());
            board.setCnt(0L);

            boardRepository.save(board);
        }
    }

    @Test
    public void testFindByTitle() {
        List<Board> boardList = boardRepository.findByTitle("테스트 제목 10");

        System.out.println("검색 결과");

        for (Board board : boardList) {
            System.out.println("board = " + board.toString());
        }
    }


}
