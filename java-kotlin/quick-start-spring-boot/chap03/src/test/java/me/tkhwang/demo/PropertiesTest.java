package me.tkhwang.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
public class PropertiesTest {
    @Autowired
    Environment environment;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testMethod() {
        System.out.println(" 이름 = " + environment .getProperty("author.name"));
        System.out.println(" 나이 = " + environment .getProperty("author.age"));
        System.out.println(" 국가 = " + environment.getProperty("author.nation"));
    }

    @Test
    public void testHello() throws Exception {
        mockMvc.perform(get("/hello").param("name", "둘리"))
                .andExpect(status().isOk())
                .andExpect(content().string("Hello : 둘리"))
                .andDo(print());

    }
}
