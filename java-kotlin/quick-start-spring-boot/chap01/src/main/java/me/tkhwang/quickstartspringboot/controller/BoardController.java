package me.tkhwang.quickstartspringboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {
    public BoardController() {
        System.out.println("BoardController 생성자 호출");
    }

    @GetMapping("/hello")
    public String hello(String name) {
        return "Hello " + name;
    }
}
