package fourtuna.stackoverflowclone.answer.entity;

import fourtuna.stackoverflowclone.audit.Auditable;
import fourtuna.stackoverflowclone.comment.entity.Comment;
import fourtuna.stackoverflowclone.like.entitiy.Like;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL)
    private List<Like> likes;
//    @OneToMany(mappedBy = "answer")
//    private Set<Like> likes = new HashSet<>();

}

