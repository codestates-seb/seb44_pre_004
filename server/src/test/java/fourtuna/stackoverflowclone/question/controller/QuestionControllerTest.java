package fourtuna.stackoverflowclone.question.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import fourtuna.stackoverflowclone.question.dto.CreateQuestion;
import fourtuna.stackoverflowclone.question.dto.UpdateQuestion;
import fourtuna.stackoverflowclone.question.service.QuestionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(QuestionController.class)
class QuestionControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private QuestionService questionService;

    @Test
    void createQuestion_SUCCESS() throws Exception {
        CreateQuestion.Response response = CreateQuestion.Response.builder()
                .questionId(1L)
                .title("제목1")
                .body("내용1").build();

        CreateQuestion.Request request = new CreateQuestion.Request("제목2", "내용2");

        // given
        given(questionService.createQuestion(any(), anyString()))
                .willReturn(response);

        // when
        ResultActions result = mockMvc.perform(post("/qna/question")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)));

        // then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.questionId").value(response.getQuestionId()))
                .andExpect(jsonPath("$.title").value(response.getTitle()))
                .andExpect(jsonPath("$.body").value(response.getBody()))
                .andDo(print());
    }

    @Test
    void updateQuestion_SUCCESS_Not_Null() throws Exception {
        UpdateQuestion.Request request = new UpdateQuestion.Request("제목2", "내용2");

        UpdateQuestion.Response response = UpdateQuestion.Response.builder()
                .title("제목")
                .body("내용")
                .build();
        // given
        given(questionService.updateQuestion(any(), anyLong(), anyString()))
                .willReturn(response);

        // when
        ResultActions result = mockMvc.perform(patch("/qna/question/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)));

        // then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.questionId").value(response.getQuestionId()))
                .andExpect(jsonPath("$.title").value(response.getTitle()))
                .andExpect(jsonPath("$.body").value(response.getBody()))
                .andDo(print());
    }

    @Test
    void updateQuestion_SUCCESS_Title_Null() throws Exception {
        UpdateQuestion.Request request = new UpdateQuestion.Request(null, "내용2");

        UpdateQuestion.Response response = UpdateQuestion.Response.builder()
                .title("제목")
                .body("내용")
                .build();
        // given
        given(questionService.updateQuestion(any(), anyLong(), anyString()))
                .willReturn(response);

        // when
        ResultActions result = mockMvc.perform(patch("/qna/question/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)));

        // then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.questionId").value(response.getQuestionId()))
                .andExpect(jsonPath("$.title").value(response.getTitle()))
                .andExpect(jsonPath("$.body").value(response.getBody()))
                .andDo(print());
    }
}