package fourtuna.stackoverflowclone.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberPatchDto {
    private long memberId;
    private String name;
    private String image;
    private String title;
    private String aboutMe;
    private LocalDateTime creatAt;
    private LocalDateTime updateAt;
}
