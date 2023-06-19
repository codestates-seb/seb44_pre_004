package fourtuna.stackoverflowclone.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponseDto {

    private long memberId;
    private String email;
    private String name;
    private String image;
    private String title;
    private String aboutMe;

}
