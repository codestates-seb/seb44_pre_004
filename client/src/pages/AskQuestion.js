import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNav, setFooter } from '../store/showComponentsSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../util/ApiController';

// 로그인 시에만 이용 가능하도록 작성 필요

const AskQuestion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);

  // 처음 렌더링 될 때 Nav와 Footer 제거
  useEffect(() => {
    dispatch(setNav(false));
    dispatch(setFooter(false));
  }, []);

  const [qna, setQna] = useState({
    title: '',
    content: '',
  });

  const { title, content } = qna;

  const onChange = (event) => {
    const { value, name } = event.target;
    setQna({
      ...qna,
      [name]: value,
    });
  };

  const saveQna = async () => {
    const qnaData = { title, content };
    // alert('등록되었습니다.');

    instance
      .post('/qna/question', qnaData)
      .then((res) => {
        const { questionId } = res.data.data;
        alert('Question submitted successfully.');
        navigate(`/qna/${questionId}`);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(
          'An error occurred while submitting the question. Please try again.'
        );
        // setIsLoading(false);
      });

    // try {
    //   const response = await instance.post('/qna/question', qnaData);
    //   console.log('response:', response.data);
    //   const { questionId } = response.data.data;
    //   navigate(`/qna/${questionId}`);
    //   alert('Question submitted successfully.');
    // } catch (error) {
    //   console.error(error.response);
    //   alert(
    //     'An error occurred while submitting the question. Please try again.'
    //   );
    // }
  };

  return (
    <>
      <MainComponent>
        <H1>Review Your question</H1>
      </MainComponent>
      <MainComponent>
        <NoticeDiv>
          Please do a final review of your question and then post.
        </NoticeDiv>
      </MainComponent>
      <MainComponent>
        <TextAreaDiv>
          <TextDiv>Title</TextDiv>
          <TitleTextArea
            name="title"
            value={title}
            onChange={onChange}
            placeholder="제목을 작성해주세요."
          ></TitleTextArea>
        </TextAreaDiv>
      </MainComponent>
      <MainComponent>
        <TextAreaDiv>
          <TextDiv>Body</TextDiv>
          <BodyTextArea
            name="content"
            value={content}
            onChange={onChange}
            placeholder="내용을 작성해주세요."
          ></BodyTextArea>
        </TextAreaDiv>
      </MainComponent>
      <MainComponent>
        <AskButton onClick={saveQna}>Post your question</AskButton>
      </MainComponent>
    </>
  );
};

const MainComponent = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
`;

const H1 = styled.h1`
  width: 100%;
  font-size: x-large;
`;

const NoticeDiv = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: var(--light-blue);
  border-radius: 5px;
`;

const AskButton = styled.button`
  height: 2.5rem;
  background-color: var(--bright-blue);
  border-radius: 5px;
  color: white;
  cursor: pointer;
  :hover {
    background-color: var(--dark-blue);
  }
`;

const TextAreaDiv = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  background-color: var(--light-grey);
`;

const TextDiv = styled.div`
  margin-bottom: 0.5rem;
`;

const TitleTextArea = styled.textarea`
  width: 100%;
  height: 2rem;
`;

const BodyTextArea = styled.textarea`
  width: 100%;
  height: 10rem;
`;

export default AskQuestion;
