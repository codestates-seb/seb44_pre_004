package fourtuna.stackoverflowclone.question.entity;

import fourtuna.stackoverflowclone.answer.entity.Answer;
import fourtuna.stackoverflowclone.audit.Auditable;
import fourtuna.stackoverflowclone.comment.entity.Comment;
import fourtuna.stackoverflowclone.like.entitiy.Like;
import fourtuna.stackoverflowclone.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long questionId;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Comment> comments;

//    @OneToMany(mappedBy = "question")
//    private Set<Like> likes = new HashSet<>();

}
