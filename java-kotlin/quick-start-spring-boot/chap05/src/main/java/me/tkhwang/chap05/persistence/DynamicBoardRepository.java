package me.tkhwang.chap05.persistence;

import me.tkhwang.chap05.domain.Board;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

public interface DynamicBoardRepository
        extends CrudRepository<Board, Long>, QuerydslPredicateExecutor<Board> {

}
