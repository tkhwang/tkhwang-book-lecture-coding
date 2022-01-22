package me.tkhwang.lectureinflearnquerydsl.repository;

import me.tkhwang.lectureinflearnquerydsl.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@Transactional
class MemberJpaRepositoryTest {

    @Autowired
    EntityManager em;

    @Autowired
    MemberJpaRepository memberJpaRepository;

    @Test
    public void basicTest() {
        Member member = new Member("member1", 10);
        this.memberJpaRepository.save(member);

        Member findMember = this.memberJpaRepository.findById(member.getId()).get();
        assertThat(findMember).isEqualTo(member);

        List<Member> result1 = this.memberJpaRepository.findAll();
        assertThat(result1).containsExactly(member);

        List<Member> result2 = this.memberJpaRepository.findByUsername("member1");
        assertThat(result2).containsExactly(member);
    }

    @Test
    public void basicQueryDslTest() {
        Member member = new Member("member1", 10);
        this.memberJpaRepository.save(member);

        Member findMember = this.memberJpaRepository.findById(member.getId()).get();
        assertThat(findMember).isEqualTo(member);

        List<Member> result1 = this.memberJpaRepository.findAll_queryDsl();
        assertThat(result1).containsExactly(member);

        List<Member> result2 = this.memberJpaRepository.findByUsername_queryDsl("member1");
        assertThat(result2).containsExactly(member);
    }
}