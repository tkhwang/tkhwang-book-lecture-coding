package me.tkhwang.demo.controller;

import me.tkhwang.demo.domain.BoardVO;
import me.tkhwang.demo.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/hello")
    public String hello(String name) {
        return this.boardService.hello(name);
    }

    @GetMapping("/getBoard")
    public BoardVO getBoard() {
        return this.boardService.getBoard();
    }

    @GetMapping("/getBoardList")
    public List<BoardVO> getBoardList() {
        return this.boardService.getBoardList();
    }
}
