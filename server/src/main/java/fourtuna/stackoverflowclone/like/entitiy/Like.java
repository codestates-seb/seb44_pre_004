package fourtuna.stackoverflowclone.like.entitiy;

import fourtuna.stackoverflowclone.answer.entity.Answer;
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
@Table(name = "LIKES")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long likeId;
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}

