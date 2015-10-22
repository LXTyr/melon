define('melon/ripples/TouchRipple', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'react-dom',
    '../Component',
    './RippleCircle',
    'react-motion',
    '../common/util/dom'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var Component = require('../Component');
    var RippleCircle = require('./RippleCircle');
    var _require = require('react-motion');
    var spring = _require.spring;
    var TransitionMotion = _require.TransitionMotion;
    var dom = require('../common/util/dom');
    var TouchRipple = function (_Component) {
        babelHelpers.inherits(TouchRipple, _Component);
        function TouchRipple(props) {
            babelHelpers.classCallCheck(this, TouchRipple);
            babelHelpers.get(Object.getPrototypeOf(TouchRipple.prototype), 'constructor', this).call(this, props);
            this.onMouseDown = this.onMouseDown.bind(this);
            this.state = {
                now: 't' + 0,
                center: [
                    0,
                    0
                ]
            };
            this.type = 'touch-ripple';
        }
        babelHelpers.createClass(TouchRipple, [
            {
                key: 'onMouseDown',
                value: function onMouseDown(_ref) {
                    var pageX = _ref.pageX;
                    var pageY = _ref.pageY;
                    var _position = this.position;
                    var top = _position.top;
                    var left = _position.left;
                    this.setState({
                        center: [
                            pageX - left - this.radius,
                            pageY - top - this.radius
                        ],
                        now: 't' + Date.now()
                    });
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var main = ReactDOM.findDOMNode(this);
                    this.position = dom.getPosition(main);
                    this.radius = Math.max(this.position.width, this.position.height) / 2;
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.position = null;
                }
            },
            {
                key: 'willLeave',
                value: function willLeave(key, valOfKey) {
                    return babelHelpers._extends({}, valOfKey, {
                        opacity: spring(0, [
                            60,
                            15
                        ]),
                        scale: spring(2, [
                            60,
                            15
                        ])
                    });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var _this = this;
                    var _state = this.state;
                    var _state$center = babelHelpers.slicedToArray(_state.center, 2);
                    var centerX = _state$center[0];
                    var centerY = _state$center[1];
                    var now = _state.now;
                    var styles = babelHelpers.defineProperty({}, now, {
                        opacity: spring(this.props.opacity),
                        scale: spring(0)
                    });
                    return React.createElement(TransitionMotion, {
                        willLeave: this.willLeave,
                        styles: styles
                    }, function (circles) {
                        return React.createElement('div', {
                            onMouseDown: _this.onMouseDown,
                            className: _this.getClassName()
                        }, Object.keys(circles).map(function (key) {
                            var _circles$key = circles[key];
                            var opacity = _circles$key.opacity;
                            var scale = _circles$key.scale;
                            if (opacity < 0.01) {
                                opacity = 0;
                                scale = 2;
                            }
                            return React.createElement(RippleCircle, {
                                key: key,
                                className: _this.getPartClassName('circle'),
                                opacity: opacity,
                                scale: scale,
                                style: {
                                    width: _this.radius * 2 || 0,
                                    height: _this.radius * 2 || 0,
                                    left: centerX,
                                    top: centerY
                                }
                            });
                        }));
                    });
                }
            }
        ]);
        return TouchRipple;
    }(Component);
    var PropTypes = React.PropTypes;
    TouchRipple.defaultProps = { opacity: 0.3 };
    TouchRipple.propTypes = { opacity: PropTypes.number };
    module.exports = TouchRipple;
});