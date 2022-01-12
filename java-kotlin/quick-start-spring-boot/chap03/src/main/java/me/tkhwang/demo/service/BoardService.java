package me.tkhwang.demo.service;

import me.tkhwang.demo.domain.BoardVO;

import java.util.List;

public interface BoardService {
    String hello(String name);
    BoardVO getBoard();
    List<BoardVO> getBoardList();
}
