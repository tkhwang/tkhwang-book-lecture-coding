package me.tkhwang.chap05.persistence;

import me.tkhwang.chap05.domain.Board;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BoardRepository extends CrudRepository<Board, Long> {
    List<Board> findByTitle(String searchKeyword);

    @Query("SELECT b FROM Board b WHERE b.title like %?1 ORDER BY b.seq DESC")
    List<Board> queryAnnotationTest(String searchKeyword);
}
