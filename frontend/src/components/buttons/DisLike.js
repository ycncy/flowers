import React from 'react';

const DisLike = () => {
    return (
        <div>
            <svg className="dislike"
                 style={{fill: "black"}}
                 width="25" height="25" fill="none"
                 stroke="currentColor" strokeLinejoin="round"
                 strokeWidth="1.5" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path d="M22 8.862a5.95 5.95 0 0 1-1.654 4.13c-2.441 2.531-4.809 5.17-7.34 7.608-.581.55-1.502.53-2.057-.045l-7.295-7.562c-2.205-2.286-2.205-5.976 0-8.261a5.58 5.58 0 0 1 8.08 0l.266.274.265-.274A5.612 5.612 0 0 1 16.305 3c1.52 0 2.973.624 4.04 1.732A5.95 5.95 0 0 1 22 8.862Z"></path>
            </svg>
        </div>
    );
};

export default DisLike;