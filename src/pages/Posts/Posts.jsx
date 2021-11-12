import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";

import {UserContext} from "../UserAuth/UserAuth";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";

import './posts.css'
import {useNavigate} from "react-router"
import Alert from "@mui/material/Alert";

const pictureClose = require('../../Picture/chatClose.svg').default;
const commentPicture = require('../../Picture/chatPic.svg').default;

const Posts = (props) => {

    const navigate = useNavigate()

    const {userAuth} = useContext(UserContext);
    const {tokenData} = useContext(UserContext);
    const {userData, setUserData} = useContext(UserContext)


    const baseURL = `http://test.flcd.ru/api/`;

    const [posts, setPosts] = useState([])

    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertFail, setAlertFail] = useState(false)
    const [getData, setGetData] = useState(false)


    useEffect(() => {
        axios.get(`${baseURL}post`)
            .then((res) => {
                res.data = res.data.reverse()
                setPosts(res.data);
                console.log(res.data)
            })
            .catch((error) => console.error(error))
    }, [getData]);

    console.log(tokenData)

    useEffect(() => {
        const config = {
            headers:
                {
                    'Authorization': `Bearer ` + tokenData
                }
        };
        axios.get(
            'http://test.flcd.ru/api/user/self',
            config
        ).then((res) => {
            console.log(res.data)
            setUserData(res.data)
        })
            .catch((error) => console.error(error));
    }, [])

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ` + tokenData);
    //убрать крестик если id не совпадает
    const deletePost = async (id) => {
        await fetch(`http://test.flcd.ru/api/post/${id}`, {
            method: 'delete',
            headers: myHeaders,
            body: JSON.stringify(id)
        }).then((res) => {
            if (res.status === 200) {
                setAlertSuccess(true)
                setGetData((prevState => !prevState))
            }
            if (res.status === 403) {
                setAlertFail(true)
            }
        }).catch((errors) => console.error(errors))
    }

    return (
        <div>
            <div style={{position: "sticky", top: 0}}>
                {alertSuccess
                    ? <Alert onClose={() => {
                        setAlertSuccess(false)
                    }} severity="success">Пост успешно удалён!</Alert>
                    : null
                }
                {alertFail
                    ? <Alert onClose={() => {
                        setAlertFail(false)
                    }} severity="error">Вы не является автором данного поста!</Alert>
                    : null
                }
            </div>

            {posts.map(post =>
                <Box
                    p={5}
                    sx={{
                        maxWidth: 900,
                        alignItems: 'center',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                    <Paper>
                        <Box p={5}>
                            {post.text}
                            <div className="delete-post-pic">
                                {
                                    (userData) && (userData.id === post.user_id)
                                        ? <img
                                            src={pictureClose}
                                            alt={'someText'}
                                            onClick={() => deletePost(post.id)}
                                        />
                                        : null
                                }
                            </div>
                            <Box mt={10}>
                                <div className='comments'>
                                    {post.comments.length}
                                    <div className="comments-pic">
                                        <img
                                            src={commentPicture}
                                            alt={'someText'}
                                            onClick={() => navigate(`/post/${post.id}`)}
                                        />
                                    </div>
                                </div>
                            </Box>
                            <Box sx={{float: 'right'}}>
                                <div className="created">
                                    Дата создания {dayjs(post.created_at).format('DD.MM.YYYY')}
                                </div>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            )}
        </div>
    );
};

export default Posts;

// post.comments.map(sub=>
//     <div>
//         {post.comments.sub}
//     </div>
// )
// post.comments.map(sub=>
//     <div>
//         {post.comments.sub}
//         {console.log(sub.size)}
//         {/*{posts.post.id === post.comments.sub.id ? console.log('равен') : console.log('не равен') }*/}
//         {console.log(post.comments.length)}
//         {post.comments.length}
//     </div>
// )