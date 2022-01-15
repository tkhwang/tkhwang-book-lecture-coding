package me.tkhwang.chap05.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
public class Board {
    @Id
    @GeneratedValue
    private Long seq;

    private String title;

    private String writer;

    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    private Long cnt;
}
