package fourtuna.stackoverflowclone.member.mapper;

import fourtuna.stackoverflowclone.member.dto.LoginResponseDto;
import fourtuna.stackoverflowclone.member.dto.MemberPatchDto;
import fourtuna.stackoverflowclone.member.dto.MemberResponseDto;
import fourtuna.stackoverflowclone.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import fourtuna.stackoverflowclone.member.dto.MemberPostDto;


import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    MemberResponseDto memberToMemberResponseDto(Member member);

    List<MemberResponseDto> membersToMemberResponseDtos(List<Member> members);

    Member memberPostDtoToMember(MemberPostDto memberPostDto);
    LoginResponseDto loginToLoginResponsDto(Member member);
}



