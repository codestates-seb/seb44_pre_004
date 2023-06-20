package fourtuna.stackoverflowclone.member.mapper;
import fourtuna.stackoverflowclone.member.dto.MemberPostDto;
import fourtuna.stackoverflowclone.member.dto.MemberResponseDto;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;



@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    /*Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);
    MemberResponseDto memberToMemberResponseDto(Member member);
     */

    MemberResponseDto memberToMemberResponseDto(Member member);
    Member memberPostDtoToMember(MemberPostDto memberPostDto);
    //SingleResponseDto memberToSingleResponseDto(Member member);
}

