package me.tkhwang.tkhwangdatajpa.repository;

import me.tkhwang.tkhwangdatajpa.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
