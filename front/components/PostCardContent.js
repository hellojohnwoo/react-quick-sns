import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';

// .split(/(#[^\s#]+)/g) (O)   VS.     .split(/#[^\s#]+/g) (X)
// regexr.com


const { TextArea } = Input;

const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdate  }) => { // This is my first post. #HashTag #PrettyNice (in reducers/post.js)
    const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
    const [editText, setEditText] = useState(postData);

    useEffect(() => {
        if (updatePostDone) {
            onCancelUpdate();
        }
    }, [updatePostDone]);

    const onChangeText = useCallback((e) => {
        setEditText(e.target.value);
    });

    return (
        <div>
            {editMode
                ? (
                    <>
                        <TextArea value={editText} onChange={onChangeText} />
                        <Button.Group>
                            <Button loading={updatePostLoading} onClick={onChangePost(editText)}>Update</Button>
                            <Button type="danger" onClick={onCancelUpdate}>Cancel</Button>
                        </Button.Group>
                    </>
                )
                : postData.split(/(#[^\s#]+)/g).map((v, i) => {
                    if (v.match(/(#[^\s#]+)/)) {
                        return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}><a>{v}</a></Link>;
                    }
                    return v;
                })}
        </div>
    );
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
    editMode: PropTypes.bool,
    onChangePost: PropTypes.func.isRequired,
    onCancelUpdate: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
    editMode: false,
};

export default PostCardContent;