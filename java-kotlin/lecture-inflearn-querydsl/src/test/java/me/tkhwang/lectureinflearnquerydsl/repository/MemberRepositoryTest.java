package me.tkhwang.lectureinflearnquerydsl.repository;

import me.tkhwang.lectureinflearnquerydsl.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void basicTest() {
        Member member = new Member("member1", 10);
        this.memberRepository.save(member);

        Member findMember = this.memberRepository.findById(member.getId()).get();
        assertThat(findMember).isEqualTo(member);

        List<Member> result1 = this.memberRepository.findAll();
        assertThat(result1).containsExactly(member);

        List<Member> result2 = this.memberRepository.findByUsername(member.getUsername());
        assertThat(result2).containsExactly(member);
    }

}