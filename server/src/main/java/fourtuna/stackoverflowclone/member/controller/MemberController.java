package fourtuna.stackoverflowclone.member.controller;

import fourtuna.stackoverflowclone.member.dto.MemberPatchDto;
import fourtuna.stackoverflowclone.member.dto.MemberResponseDto;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.mapper.MemberMapper;
import fourtuna.stackoverflowclone.member.service.MemberService;
import fourtuna.stackoverflowclone.response.MultiResponseDto;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;
import fourtuna.stackoverflowclone.member.dto.MemberPostDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/user")
@Validated
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PatchMapping("/edit/{memberId}")
    public ResponseEntity patchMember(@PathVariable("memberId")  @Positive long memberId,
                                      @Valid /*@RequestBody*/@RequestPart(required = false) MemberPatchDto requestBody,
                                      @RequestPart(required = false) MultipartFile image) throws IOException {
        requestBody.setMemberId(memberId);
        //Member member = mapper.memberPatchDtoToMember(requestBody);

        Member response = memberService.updateMember(requestBody);
        //Member response = memberService.updateMember(member);

        String img = memberService.write(image);
        response.setImage(img);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(response)),
                HttpStatus.OK
        );
    }

    @GetMapping("/edit/{memberId}")
    public ResponseEntity getMemberInfo(@PathVariable("memberId") @Positive long memberId) {
        Member response = memberService.findMember(memberId);
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponseDto(response)), HttpStatus.OK);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity getMember(
            @PathVariable("memberId") @Positive long memberId) {
        Member response = memberService.findMember(memberId);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponseDto(response)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);

        List<Member> members = pageMembers.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.membersToMemberResponseDtos(members),
                        pageMembers),
                HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){
        Member createdMember = memberService.createMember(mapper.memberPostDtoToMember(memberPostDto));
        MemberResponseDto response = mapper.memberToMemberResponseDto(createdMember);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }
}
