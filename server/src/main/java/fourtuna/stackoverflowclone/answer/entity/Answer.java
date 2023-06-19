package fourtuna.stackoverflowclone.answer.entity;

import fourtuna.stackoverflowclone.audit.Auditable;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Answer extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long answerId;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

}

