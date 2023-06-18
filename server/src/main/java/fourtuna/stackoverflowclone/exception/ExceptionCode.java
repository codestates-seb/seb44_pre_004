package fourtuna.stackoverflowclone.Exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    COFFEE_NOT_FOUND(404, "Coffee not found"),
    COFFEE_CODE_EXISTS(409, "Coffee Code exists"),
    ORDER_NOT_FOUND(404, "Order not found"),
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    QNA_QUESTION_NOT_FOUND(404, "Q&A Question not found"),
    CANNOT_CHANGE_QNA_QUESTION(403, "Q&A Question can not change"),
    CANNOT_READ_QNA_QUESTION(403, "Q&A Question can not read");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
