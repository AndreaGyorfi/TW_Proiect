import axiosInstance from '../components/axiosApi';

const addQuestion = (data) =>{
    return axiosInstance.post('/quiz/add_question/', data);

}

const getAllQuestion = () =>{
    return axiosInstance.get('/quiz/get_questions/');
}

const getQuestion = (id) =>{
    return axiosInstance.get('/quiz/question/'+id);
}

const updateQuestion = (id, data) =>{
    return axiosInstance.put('/quiz/question/'+id, data);
}

const deleteQuestion = (id) =>{
    return axiosInstance.delete('/quiz/question/'+id);
}

const createQuiz = (data) =>{
    return axiosInstance.post('/quiz/createQuiz/',data);
}

const getAllQuiz = () =>{
    return axiosInstance.get('/quiz/getallquiz/');
}

const deleteQuiz = (id) =>{
    return axiosInstance.delete('/quiz/quiz/'+id);
}

const getQuiz = (id) =>{
    return axiosInstance.get('/quiz/quiz/'+id);
}

const editQuiz = (id, data) =>{
    return axiosInstance.put('/quiz/quiz/'+id,data);
}

const addQuizResult = (data) =>{
    return axiosInstance.post('/quiz/result/',data);
}

const getAllResult = () =>{
    return axiosInstance.get('quiz/getAllResult/');
}

const getResultsByQuiz = (id) =>{
    return axiosInstance.get('quiz/getQuizResult/'+id);
}

export default {
    addQuestion,
    getAllQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
    createQuiz,
    getAllQuiz,
    deleteQuiz,
    getQuiz,
    editQuiz,
    addQuizResult,
    getAllResult,
    getResultsByQuiz,
}