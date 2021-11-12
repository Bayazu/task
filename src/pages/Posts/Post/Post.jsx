import React, {useContext, useEffect, useState} from 'react';
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../../UserAuth/UserAuth";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";

const pictureClose = require('../../../Picture/chatClose.svg').default;
const commentPicture = require('../../../Picture/chatPic.svg').default;

const Post = (props) => {



    const baseURL = `http://test.flcd.ru/api/`;

    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [getData, setGetData] = useState(false)
    const [commentsReplyVisibility, setCommentsReplyVisibility] = useState(false)
    const {userAuth} = useContext(UserContext);
    const {tokenData} = useContext(UserContext);

    console.log(tokenData)

    const [inputValue, setInputValue] = useState()
    const [inputError, setInputError] = useState(true)
    const [formValid, setFormValid] = useState(false)

    console.log(userAuth)

    const {id} = useParams()

    useEffect(() => {
        axios.get(`${baseURL}post/${id}`)
            .then((res) => {
                setPost(res.data);
                console.log(res.data)
            })
            .catch((error) => console.error(error))
    }, []);


    useEffect(() => {
        axios.get(`${baseURL}post/${id}/comments`)
            .then((res) => {
                setComments(res.data);
                console.log(res.data)
            })
            .catch((error) => console.error(error))
    }, []);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + tokenData);

    const createComment = async (e) => {
        e.preventDefault();
        const text = inputValue
        const post_id = id

        await fetch('http://test.flcd.ru/api/comment', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                text,
                post_id
            })
        }).then((res) => {
            if (res.status === 200) {
                setGetData((prevState => !prevState))
            }
        }).catch((errors) => console.error(errors))
    }
    //
    // const deletePost = async (id) => {
    //     await fetch(`http://test.flcd.ru/api/post/${id}`, {
    //         method: 'delete',
    //         headers: myHeaders,
    //         body: JSON.stringify(id)
    //     }).then((res) => {
    //         if (res.status === 200) {
    //             setAlertSuccess(true)
    //             setGetData((prevState => !prevState))
    //         }
    //         if (res.status === 403) {
    //             setAlertFail(true)
    //         }
    //     }).catch((errors) => console.error(errors))
    // }


    useEffect(() => {
        if (inputError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [inputError])

    const inputHandler = (e) => {
        setInputValue(e.target.value)
        if (!e.target.value) {
            setInputError(true)
        } else {
            setInputError(false)
        }
    }

    const viewReplies = () =>{
        setCommentsReplyVisibility((prevState => !prevState))
    }


    return (
        <div>
            <Box
                p={5}
                sx={{
                    padding: 5,
                    maxWidth: 900,
                    alignItems: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                <Paper>
                    <Box p={5}>
                        {post.text}
                        <div className="delete-post-pic">
                            {/*{*/}
                            {/*    (userData) && (userData.id ===post.user_id)*/}
                            {/*        ? <img*/}
                            {/*            src={pictureClose}*/}
                            {/*            alt={'someText'}*/}
                            {/*            onClick={() => deletePost(post.id)}*/}
                            {/*        />*/}
                            {/*        : null*/}
                            {/*}*/}
                        </div>
                        <Box mt={10}>
                            <div className='comments'>
                                {comments.length}
                                <div className="comments-pic">
                                    <img
                                        src={commentPicture}
                                        alt={'someText'}
                                    />
                                </div>
                            </div>
                        </Box>
                        <Box sx={{float: 'right'}}>
                            <div>
                                Дата создания {dayjs(post.created_at).format('DD.MM.YYYY')}
                            </div>
                            <div>
                                Дата редактирования {dayjs(post.created_at).format('DD.MM.YYYY')}
                            </div>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box
                p={5}
                sx={{
                    marginTop: 0,
                    padding: 0,
                    maxWidth: 300,
                    alignItems: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                <form action="" onSubmit={createComment}>
                    <TextareaAutosize
                        minRows={10}
                        value={inputValue}
                        style={{width: 300}}
                        onChange={e => inputHandler(e)}
                    />
                    <div className='button'>
                        <Button
                            sx={{float: 'right'}}
                            variant="contained"
                            disabled={!formValid}
                            type='submit'>
                            Ответить на пост
                        </Button>
                    </div>
                </form>
            </Box>


            {comments.map(comment =>
                <Box p={5}
                     sx={{
                         maxWidth: 900,
                         alignItems: 'center',
                         marginLeft: 'auto',
                         marginRight: 'auto',
                     }}>
                    <Paper>
                        <Box p={5}
                             sx={{
                                 maxWidth: 900,
                                 alignItems: 'center',
                                 marginLeft: 'auto',
                                 marginRight: 'auto',
                             }}>
                            <div>{comment.text}</div>
                            <div>
                                <div onClick={viewReplies}>
                                    Показать ответы на комментарий ({comment.replies.length})
                                </div>
                                <div className='replies'>
                                    {commentsReplyVisibility
                                        ? (
                                            <>
                                                {
                                                    comment.replies.map(replie =>
                                                        <Paper>
                                                            <Box p={5} sx={{marginTop: 2}}>
                                                                <div>
                                                                    {replie.text}
                                                                </div>
                                                                <br/>
                                                                {userAuth
                                                                    ?
                                                                    <div  className='answer-on-comment'>Ответить на комментарий</div>
                                                                    : null
                                                                }

                                                            </Box>
                                                        </Paper>
                                                    )
                                                }
                                            </>
                                        )
                                        : null
                                    }
                                </div>
                            </div>
                        </Box>
                    </Paper>
                </Box>
            )}


        </div>
    );
};

export default Post;

