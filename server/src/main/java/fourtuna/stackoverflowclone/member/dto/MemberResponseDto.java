package fourtuna.stackoverflowclone.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MemberResponseDto {

    private long memberId;
    private String email;
    private String name;
    private String image;
    private String title;
    private String aboutMe;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
