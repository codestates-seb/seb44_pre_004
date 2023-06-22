package fourtuna.stackoverflowclone.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Builder
@AllArgsConstructor
@Getter
public class MemberPostDto {

    @NotBlank
    @Email
    private String email;

    @NotNull
    private String name;

    @Pattern(regexp = "^(?=.*[!@#$%^&*()_+\\\\-\\\\[\\\\]{};':\\\"\\\\\\\\|,.<>/?]).{8,}$" ,
            message = "특수문자를 1개를 포함하여 8자리 이상으로 작성해주세요")
    private String password;
    @Nullable
    private String image;

    @Nullable
    private String title;

    @Nullable
    private String aboutMe;
}
