/**
 * @file Zippy
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import {Motion, spring} from 'react-motion';
import {create} from './common/util/cxBuilder';

const cx = create('Zippy');

function getStyle(horizontal, value) {

    return {
        [horizontal ? 'overflowX' : 'overflowY']: 'hidden',
        [horizontal ? 'width' : 'height']: Math.round(value)
    };

}

export default class Zippy extends React.Component {

    render() {

        const props = this.props;

        const {
            expand,
            size,
            children,
            horizontal,
            value,
            style,
            ...others
        } = props;

        const className = cx(props).addStates({expand}).build();

        return (
            <Motion style={{value: spring(expand ? size : 0, {stiffness: 60, damping: 15})}}>
                {({value}) =>
                    <div
                        {...others}
                        className={className}
                        style={{
                            ...style,
                            ...getStyle(horizontal, value)
                        }}>
                        {children}
                    </div>
                }
            </Motion>
        );

    }

}

Zippy.displayName = 'Zippy';

Zippy.propTypes = {
    size: PropTypes.number.isRequired,
    horizontal: PropTypes.bool,
    expand: PropTypes.bool
};

Zippy.defaultProps = {
    horizontal: false,
    expand: false
};
