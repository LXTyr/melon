/**
 * @file esui-react/RippleCircle
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const Component = require('../Component');

class RippleCircle extends Component {

    static displayName = 'RippleCircle';

    constructor(props) {
        super(props);

        this.type = 'ripple-circle';
    }

    shouldComponentUpdate(nextProps) {

        let {
            opacity,
            scale
        } = this.props;

        return opacity !== nextProps.opacity || scale !== nextProps.scale;
    }

    render() {

        let {
            style,
            opacity,
            scale,
            ...other
        } = this.props;

        style = {
            ...style,
            opacity,
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`
        };

        return (
            <div {...other} style={style} />
        );


    }

}

const PropTypes = React.PropTypes;

RippleCircle.defaultProps = {
    opacity: 0.3,
    scale: 2
};

RippleCircle.propTypes = {
    opacity: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
};

module.exports = RippleCircle;
