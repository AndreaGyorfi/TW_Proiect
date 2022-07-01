import axiosInstance from '../components/axiosApi';

const addNewPost = (data) =>{
    return axiosInstance.post('/forum/add_post/',data);
}

const getAllPosts = () =>{
    return axiosInstance.get('/forum/get_allPosts/');
}

const addNewComment = (id,data) =>{
    return axiosInstance.post('/forum/add_comment/'+id, data);
}

const deleteForum = (id) =>{
    return axiosInstance.delete('/forum/deletePost/'+id);
} 

const deleteComment = (id) =>{
    return axiosInstance.delete('/forum/deleteComment/'+id);
}

export default {
    addNewPost,
    getAllPosts,
    addNewComment,
    deleteForum,
    deleteComment,
}