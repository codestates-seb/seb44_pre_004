package fourtuna.stackoverflowclone.question.dto;

import fourtuna.stackoverflowclone.answer.dto.AnswerDto;
import fourtuna.stackoverflowclone.comment.dto.CommentDto;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class QuestionDetailDto {
    private String title;
    private String content;
    private int answerCount;
    private int likeCount;
    private boolean likeExist;
    private String writerName;
    private String writerImageUrl;
    private String createdAt;
    private String updatedAt;

    private List<CommentDto> comments;
    private List<AnswerDto> answers;

    public static QuestionDetailDto from(Question question, Member member) {
        List<AnswerDto> answers = question.getAnswers().stream()
                .map(answer -> AnswerDto.from(answer, member))
                .collect(Collectors.toList());

        List<CommentDto> comments = question.getComments().stream()
                .map(comment -> CommentDto.from(comment))
                .collect(Collectors.toList());

        boolean exist = false;
        if (member != null) {
            long count = question.getLikes().stream()
                    .filter(like -> like.getMember().getMemberId() == member.getMemberId())
                    .count();
            exist = count != 0;
        }

        return QuestionDetailDto.builder()
                .title(question.getTitle())
                .content(question.getContent())
                .likeCount(question.getLikes().size())
                .likeExist(exist)
                .answerCount(question.getAnswers().size())
                .writerName(question.getMember().getName())
                .writerImageUrl(question.getMember().getImage())
                .createdAt(question.getCreatedAt().toString())
                .updatedAt(question.getUpdatedAt().toString())
                .comments(comments)
                .answers(answers).build();
    }
}
