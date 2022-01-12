package me.tkhwang.demo;

import me.tkhwang.demo.domain.BoardVO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.env.Environment;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class PropertiesTest {
    @Autowired
    private TestRestTemplate testRestTemplate;

    @Test
    public void testHello() throws Exception {
        String result = testRestTemplate.getForObject("/hello?name=둘리", String.class);
        assertEquals("Hello : 둘리",  result);
    }

    @Test
    public void testGetBoard() throws Exception {
        BoardVO board = testRestTemplate.getForObject("/getBoard", BoardVO.class);
        assertEquals("테스터", board.getWriter());
    }
}
