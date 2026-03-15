import React from 'react';

const Skeleton = ({ type }) => {
    let classes = 'bg-gray-300 animate-pulse rounded ';

    switch (type) {
        case 'text':
            classes += 'w-full h-3 mb-2';
            break;
        case 'title':
            classes += 'w-1/2 h-5 mb-4';
            break;
        case 'avatar':
            classes += 'w-10 h-10 rounded-full';
            break;
        case 'thumbnail':
            classes += 'w-full h-40 rounded-lg';
            break;
        case 'card':
            classes += 'p-5 border border-gray-200 bg-white';
            break;
        default:
            classes += '';
    }

    return <div className={classes}></div>;
};

export default Skeleton;
