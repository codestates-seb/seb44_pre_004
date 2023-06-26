package fourtuna.stackoverflowclone.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<?> handleExhibitionException(BusinessLogicException e) {
        return new ResponseEntity<>(e, HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }
}
