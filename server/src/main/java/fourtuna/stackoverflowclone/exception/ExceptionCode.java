package fourtuna.stackoverflowclone.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    QUESTION_NOT_FOUND(404, "Q&A Question not found"),
    COMMENT_NOT_FOUND(404, "Q&A Comment not found"),
    UNMATCHED_WRITER(403, "작성자가 아닙니다."),
    CANNOT_READ_QUESTION(403, "Q&A Question can not read");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
