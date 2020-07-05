import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';


// .split(/(#[^\s#]+)/g) (O)   VS.     .split(/#[^\s#]+/g) (X)
// regexr.com

const PostCardContent = ({ postData }) => ( // This is my first post. #HashTag #PrettyNice (in reducers/post.js)
    <div>
        {postData.split(/(#[^\s#]+)/g).map((v, i) => {

            if (v.match(/(#[^\s#]+)/)) {
                return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
            }
            return v;
        })}
    </div>
);

PostCardContent.propTypes = { postData: PropTypes.string.isRequired }

export default PostCardContent;