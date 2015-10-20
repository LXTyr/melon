define('melon/scrollview/Bar', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    '../common/util/dom',
    'underscore'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var dom = require('../common/util/dom');
    var _ = require('underscore');
    var ScrollViewBar = function (_Component) {
        babelHelpers.inherits(ScrollViewBar, _Component);
        function ScrollViewBar(props) {
            babelHelpers.classCallCheck(this, ScrollViewBar);
            babelHelpers.get(Object.getPrototypeOf(ScrollViewBar.prototype), 'constructor', this).call(this, props);
            this.type = 'scrollview-bar';
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onBarMouseDown = this.onBarMouseDown.bind(this);
            this.removeStateShow = _.throttle.call(this, this.removeStateShow, 100);
        }
        babelHelpers.createClass(ScrollViewBar, [
            {
                key: 'getVariants',
                value: function getVariants(props) {
                    var variants = babelHelpers.get(Object.getPrototypeOf(ScrollViewBar.prototype), 'getVariants', this).call(this, props);
                    variants.push(props.direction);
                    return variants;
                }
            },
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.positionThumb();
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    this.positionThumb();
                }
            },
            {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    if (Math.abs(nextProps.position - this.props.position) < 0.0005) {
                        return false;
                    }
                    dom.addClass(this.refs.main, 'state-show');
                    this.removeStateShow();
                    return true;
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.clearTimer();
                }
            },
            {
                key: 'positionThumb',
                value: function positionThumb() {
                    var _refs = this.refs;
                    var main = _refs.main;
                    var thumb = _refs.thumb;
                    var _props = this.props;
                    var direction = _props.direction;
                    var position = _props.position;
                    var thumbSize = _props.thumbSize;
                    var isVertical = direction === 'vertical';
                    var axis = isVertical ? 'top' : 'left';
                    this.barSize = main[isVertical ? 'offsetHeight' : 'offsetWidth'] - thumbSize - 4;
                    thumb.style[isVertical ? 'height' : 'width'] = thumbSize + 'px';
                    thumb.style[axis] = Math.round(position * this.barSize) + 'px';
                }
            },
            {
                key: 'getMousePosition',
                value: function getMousePosition(e, isVertical) {
                    if (isVertical) {
                        return e.pageY || e.clientY;
                    }
                    return e.pageX || e.clientX;
                }
            },
            {
                key: 'clearTimer',
                value: function clearTimer() {
                    if (this.timer) {
                        clearTimeout(this.timer);
                    }
                }
            },
            {
                key: 'removeStateShow',
                value: function removeStateShow() {
                    this.clearTimer();
                    var main = this.refs.main;
                    this.timer = setTimeout(function () {
                        dom.removeClass(main, 'state-show');
                    }, 1800);
                }
            },
            {
                key: 'onBarMouseDown',
                value: function onBarMouseDown(e) {
                    var target = e.target;
                    if (target === this.refs.thumb) {
                        return;
                    }
                    var _props2 = this.props;
                    var direction = _props2.direction;
                    var thumbSize = _props2.thumbSize;
                    var main = this.refs.main;
                    var me = this;
                    var isVertical = direction === 'vertical';
                    var axis = isVertical ? 'top' : 'left';
                    var barSize = main[isVertical ? 'offsetHeight' : 'offsetWidth'] - thumbSize - 4;
                    var mousePos = this.getMousePosition(e, isVertical) - dom.getPosition(main)[axis];
                    var pos = mousePos - thumbSize / 2;
                    pos = pos > barSize ? barSize : pos;
                    pos = pos < 0 ? 0 : pos;
                    me.fireAction('change', pos / barSize);
                    e.preventDefault();
                }
            },
            {
                key: 'onMouseDown',
                value: function onMouseDown(e) {
                    var body = document.body;
                    dom.addClass(body, 'ui-noselect');
                    var isVertical = this.props.direction === 'vertical';
                    var axis = isVertical ? 'top' : 'left';
                    this.thumbStart = parseInt(this.refs.thumb.style[axis], 10) || 0;
                    this.moveStart = this.getMousePosition(e, isVertical);
                    dom.on(body, 'mousemove', this.onMouseMove);
                    dom.on(body, 'mouseup', this.onMouseUp);
                    e.preventDefault();
                }
            },
            {
                key: 'onMouseMove',
                value: function onMouseMove(e) {
                    e = e || window.event;
                    var isVertical = this.props.direction === 'vertical';
                    var moveLength = this.getMousePosition(e, isVertical);
                    moveLength -= this.moveStart;
                    var pos = Math.min(this.barSize, Math.max(0, this.thumbStart + moveLength));
                    this.fireAction('change', pos / this.barSize);
                }
            },
            {
                key: 'onMouseUp',
                value: function onMouseUp(e) {
                    var body = document.body;
                    dom.removeClass(body, 'ui-noselect');
                    dom.off(body, 'mousemove', this.onMouseMove);
                    dom.off(body, 'mouseup', this.onMouseUp);
                    this.thumbStart = this.moveStart = 0;
                }
            },
            {
                key: 'fireAction',
                value: function fireAction(action, pos) {
                    var e = {
                        action: action,
                        position: pos,
                        target: this
                    };
                    var onAction = this.props.onAction;
                    onAction && onAction(e);
                }
            },
            {
                key: 'render',
                value: function render() {
                    return React.createElement('div', babelHelpers._extends({}, this.props, {
                        ref: 'main',
                        className: this.getClassName(),
                        onMouseDown: this.onBarMouseDown
                    }), React.createElement('div', {
                        ref: 'thumb',
                        className: this.getPartClassName('thumb'),
                        onMouseDown: this.onMouseDown
                    }));
                }
            }
        ]);
        return ScrollViewBar;
    }(Component);
    var PropTypes = React.PropTypes;
    ScrollViewBar.propTypes = {
        direction: PropTypes.oneOf([
            'vertical',
            'horizontal'
        ]).isRequired,
        position: PropTypes.number.isRequired,
        thumbSize: PropTypes.number,
        show: PropTypes.bool,
        onAction: PropTypes.func
    };
    module.exports = ScrollViewBar;
});