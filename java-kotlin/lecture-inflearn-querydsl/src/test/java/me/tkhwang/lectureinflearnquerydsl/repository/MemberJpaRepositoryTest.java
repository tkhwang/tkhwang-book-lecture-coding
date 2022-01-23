package me.tkhwang.lectureinflearnquerydsl.repository;

import me.tkhwang.lectureinflearnquerydsl.dto.MemberSearchCondition;
import me.tkhwang.lectureinflearnquerydsl.dto.MemberTeamDto;
import me.tkhwang.lectureinflearnquerydsl.entity.Member;
import me.tkhwang.lectureinflearnquerydsl.entity.Team;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;


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

    @Test
    void searchTest_Builder(){
        Team teamA = new Team("TeamA");
        Team teamB = new Team("TeamB");
        em.persist(teamA);
        em.persist(teamB);

        Member member1 = new Member("member1", 10, teamA);
        Member member2 = new Member("member2", 20, teamA);
        Member member3 = new Member("member3", 30, teamB);
        Member member4 = new Member("member4", 40, teamB);

        em.persist(member1);
        em.persist(member2);
        em.persist(member3);
        em.persist(member4);

        MemberSearchCondition condition = new MemberSearchCondition();
        condition.setAgeGoe(35);
        condition.setAgeLoe(40);
        condition.setTeamName("TeamB");

        //when
        List<MemberTeamDto> result = memberJpaRepository.searchByBuilder(condition);
        //then
        assertEquals(result.get(0).getUsername(), "member4");
    }

    @Test
    void searchTest_Wherer(){
        //given
        Team teamA = new Team("TeamA");
        Team teamB = new Team("TeamB");
        em.persist(teamA);
        em.persist(teamB);

        Member member1 = new Member("member1", 10, teamA);
        Member member2 = new Member("member2", 20, teamA);
        Member member3 = new Member("member3", 30, teamB);
        Member member4 = new Member("member4", 40, teamB);

        em.persist(member1);
        em.persist(member2);
        em.persist(member3);
        em.persist(member4);

        MemberSearchCondition condition = new MemberSearchCondition();
        condition.setAgeGoe(35);
        condition.setAgeLoe(40);
        condition.setTeamName("TeamB");

        //when
        List<MemberTeamDto> result = memberJpaRepository.searchByWhere(condition);
        //then
        assertEquals(result.get(0).getUsername(), "member4");
    }
}