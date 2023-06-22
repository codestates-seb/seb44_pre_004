package fourtuna.stackoverflowclone.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private long memberId;
    private String name;
    private String email;
}
