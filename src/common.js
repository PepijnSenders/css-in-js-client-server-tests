import React from 'react';
import cxs from 'cxs';

const Box = (props) => (
    <div
        {...props}
        className={className}
    />
);

const className = cxs({
    padding: 32,
    backgroundColor: 'tomato',
});

export default Box;
