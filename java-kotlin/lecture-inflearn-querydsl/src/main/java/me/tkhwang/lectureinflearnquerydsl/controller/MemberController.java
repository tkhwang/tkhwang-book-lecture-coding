package me.tkhwang.lectureinflearnquerydsl.controller;

import lombok.RequiredArgsConstructor;
import me.tkhwang.lectureinflearnquerydsl.dto.MemberSearchCondition;
import me.tkhwang.lectureinflearnquerydsl.dto.MemberTeamDto;
import me.tkhwang.lectureinflearnquerydsl.repository.MemberJpaRepository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberJpaRepository memberJpaRepository;

    public List<MemberTeamDto> searchMember1(MemberSearchCondition condition) {
        return this.memberJpaRepository.searchByWhere(condition);
    }
}
