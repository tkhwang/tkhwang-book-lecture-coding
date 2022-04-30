package me.tkhwang.chap05.persistence;

import com.fasterxml.jackson.databind.util.ArrayBuilders;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DynamicBoardRepositoryTest {

    @Autowired
    private DynamicBoardRepository dynamicBoardRepository;

    @Test
    public void testDynamicQuery() {
        String searchCondition = "TITLE";
        String searchKeyword = "테스트 제목 10";

}