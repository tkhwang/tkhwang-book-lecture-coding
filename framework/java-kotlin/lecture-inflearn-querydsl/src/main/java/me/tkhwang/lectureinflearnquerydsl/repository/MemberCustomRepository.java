package me.tkhwang.lectureinflearnquerydsl.repository;

import me.tkhwang.lectureinflearnquerydsl.dto.MemberSearchCondition;
import me.tkhwang.lectureinflearnquerydsl.dto.MemberTeamDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MemberCustomRepository {
    List<MemberTeamDto> search(MemberSearchCondition condition);
    Page<MemberTeamDto> searchPageSimple(MemberSearchCondition condition, Pageable page);
    Page<MemberTeamDto> searchPageComplex(MemberSearchCondition condition, Pageable page);

}
