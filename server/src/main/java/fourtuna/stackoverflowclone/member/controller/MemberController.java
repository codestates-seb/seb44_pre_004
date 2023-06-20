package fourtuna.stackoverflowclone.member.controller;

import fourtuna.stackoverflowclone.member.dto.MemberPostDto;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.mapper.MemberMapper;
import fourtuna.stackoverflowclone.member.service.MemberService;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@Validated
@Slf4j
public class MemberController {
    private final MemberMapper mapper;
    private final MemberService memberService;

    public MemberController(MemberMapper mapper, MemberService memberService) {
        this.mapper = mapper;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){
        Member createdMember = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));
        //SingleResponseDto response = mapper.memberToSingleResponseDto(createdMember);

        //return response;
        return new ResponseEntity<>(mapper.memberToMemberResponseDto(createdMember), HttpStatus.CREATED);
    }
}
