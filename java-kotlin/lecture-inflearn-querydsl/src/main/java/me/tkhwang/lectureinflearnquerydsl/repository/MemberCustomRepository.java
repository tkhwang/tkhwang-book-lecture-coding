package me.tkhwang.lectureinflearnquerydsl.repository;

import me.tkhwang.lectureinflearnquerydsl.dto.MemberSearchCondition;
import me.tkhwang.lectureinflearnquerydsl.dto.MemberTeamDto;

import java.util.List;

public interface MemberCustomRepository {
    List<MemberTeamDto> search(MemberSearchCondition condition);
}
