package fourtuna.stackoverflowclone.comment.entity;

import fourtuna.stackoverflowclone.answer.entity.Answer;
import fourtuna.stackoverflowclone.audit.Auditable;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long commentId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Question question;

    @ManyToOne
    private Answer answer;
}
