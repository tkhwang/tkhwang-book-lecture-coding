package me.tkhwang.demo.service;

import me.tkhwang.demo.domain.BoardVO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {
    @Override
    public String hello(String name) {
        return "Hello : " + name;
    }

    @Override
    public BoardVO getBoard() {
        BoardVO   board = new BoardVO();
        board.setSeq(1);
        board.setTitle("테스트 제목...");
        board.setWriter("테스터");
        board.setContent("테스트 내용입니다....");
        board.setCreateDate(new Date());
        board.setCnt(0);

        return board;
    }

    @Override
    public List<BoardVO> getBoardList() {
        ArrayList<BoardVO> boardList = new ArrayList<>();
        for (int i = 1; i <= 10; i ++) {
            BoardVO   board = new BoardVO();
            board.setSeq(1);
            board.setTitle("제목" + i);
            board.setWriter("테스터");
            board.setContent(i + "번 내용입니다.");
            board.setCreateDate(new Date());
            board.setCnt(0);
            boardList.add(board);
        }

        return boardList;
    }
}
