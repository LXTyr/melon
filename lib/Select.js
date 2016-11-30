(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', './Icon', './select/SeparatePopup', 'melon-core/InputComponent', './select/OptionGroup', './select/Option', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('./Icon'), require('./select/SeparatePopup'), require('melon-core/InputComponent'), require('./select/OptionGroup'), require('./select/Option'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.Icon, global.SeparatePopup, global.InputComponent, global.OptionGroup, global.Option, global.cxBuilder, global.babelHelpers);
        global.Select = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _Icon, _SeparatePopup, _InputComponent2, _OptionGroup, _Option, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.createOptions = createOptions;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _SeparatePopup2 = babelHelpers.interopRequireDefault(_SeparatePopup);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _OptionGroup2 = babelHelpers.interopRequireDefault(_OptionGroup);

    var _Option2 = babelHelpers.interopRequireDefault(_Option);

    /**
     * @file melon/Select
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('Select');

    /**
     * melon/Select
     *
     * @extends {melon-core/InputComponent}
     * @class
     */

    var Select = function (_InputComponent) {
        babelHelpers.inherits(Select, _InputComponent);

        /**
         * 构造函数
         *
         * @public
         * @constructor
         * @param  {*} props   属性
         * @param  {*} context 上下文
         */
        function Select(props, context) {
            babelHelpers.classCallCheck(this, Select);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            /**
             * 状态
             *
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {
                open: false
            });

            _this.onClick = _this.onClick.bind(_this);
            _this.onClickOption = _this.onClickOption.bind(_this);
            _this.onPopupHide = _this.onPopupHide.bind(_this);

            return _this;
        }

        /**
         * Mount时的处理
         *
         * @public
         * @override
         */


        Select.prototype.componentDidMount = function componentDidMount() {

            _InputComponent.prototype.componentDidMount.call(this);

            var container = this.container = document.createElement('div');

            container.className = cx().part('popup').build();

            document.body.appendChild(container);

            /**
             * 浮层
             *
             * @type {Object}
             */
            this.popup = _reactDom2['default'].render(_react2['default'].createElement(
                _SeparatePopup2['default'],
                {
                    target: _reactDom2['default'].findDOMNode(this),
                    open: false,
                    onHide: this.onPopupHide },
                _react.Children.map(this.props.children, this.renderItem, this)
            ), container);
        };

        Select.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

            var children = nextProps.children;

            if (children !== this.props.children) {
                this.popup = _reactDom2['default'].render(_react2['default'].createElement(
                    _SeparatePopup2['default'],
                    {
                        target: _reactDom2['default'].findDOMNode(this),
                        open: this.state.open,
                        onHide: this.onPopupHide },
                    _react.Children.map(children, this.renderItem, this)
                ), this.container);
            }

            _InputComponent.prototype.componentWillReceiveProps.call(this, nextProps);
        };

        Select.prototype.componentWillUnmount = function componentWillUnmount() {

            var container = this.container;

            if (container) {
                _reactDom2['default'].unmountComponentAtNode(container);
                container.parentElement.removeChild(container);

                /**
                 * 浮层的容器
                 *
                 * @type {HTMLElement}
                 */
                this.container = container = null;
            }

            _InputComponent.prototype.componentWillUnmount.call(this);
        };

        Select.prototype.renderOptions = function renderOptions(open) {
            var _this2 = this;

            this.setState({
                open: open
            }, function () {
                _reactDom2['default'].render(_react2['default'].createElement(
                    _SeparatePopup2['default'],
                    {
                        target: _reactDom2['default'].findDOMNode(_this2),
                        open: open,
                        onHide: _this2.onPopupHide },
                    _react.Children.map(_this2.props.children, _this2.renderItem, _this2)
                ), _this2.container);
            });
        };

        Select.prototype.onClick = function onClick() {
            var _props = this.props,
                disabled = _props.disabled,
                readOnly = _props.readOnly;


            if (disabled || readOnly) {
                return;
            }

            this.renderOptions(!this.isOpen());
        };

        Select.prototype.onClickOption = function onClickOption(e) {

            var value = e.value;

            this.renderOptions(false);

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: value
            });
        };

        Select.prototype.onPopupHide = function onPopupHide() {
            this.renderOptions(false);
        };

        Select.prototype.renderItem = function renderItem(child, index) {

            if (!child) {
                return null;
            }

            if (child.type === 'option') {
                return _react2['default'].createElement(_Option2['default'], babelHelpers['extends']({}, child.props, {
                    onClick: this.onClickOption,
                    key: index }));
            }

            if (child.type === 'optgroup') {
                return _react2['default'].createElement(_OptionGroup2['default'], babelHelpers['extends']({}, child.props, {
                    onClick: this.onClickOption,
                    key: index }));
            }

            return null;
        };

        Select.prototype.renderHiddenInput = function renderHiddenInput() {
            var _props2 = this.props,
                name = _props2.name,
                value = _props2.value;


            return name ? _react2['default'].createElement('input', {
                name: name,
                type: 'hidden',
                value: value }) : null;
        };

        Select.prototype.renderLabel = function renderLabel() {

            var value = this.state.value;
            var _props3 = this.props,
                children = _props3.children,
                placeholder = _props3.placeholder;


            var option = this.findOption(value, children);

            var label = option ? option.props.label || option.props.children : _react2['default'].createElement(
                'span',
                { className: cx().part('label-placeholder').build() },
                placeholder
            );

            return _react2['default'].createElement(
                'label',
                { className: cx().part('label').build() },
                label
            );
        };

        Select.prototype.findOption = function findOption(value, children) {

            children = _react.Children.toArray(children);

            if (!children) {
                return null;
            }

            for (var i = 0, len = children.length; i < len; ++i) {
                var child = children[i];
                if (child.type === 'optgroup') {
                    var option = this.findOption(value, child.props.children);
                    if (option) {
                        return option;
                    }
                    continue;
                }
                if (child.props.value === value) {
                    return child;
                }
            }

            return null;
        };

        Select.prototype.renderIcon = function renderIcon() {
            return _react2['default'].createElement(_Icon2['default'], { icon: 'expand-more' });
        };

        Select.prototype.isOpen = function isOpen() {
            return this.state.open;
        };

        Select.prototype.render = function render() {

            return _react2['default'].createElement(
                'div',
                {
                    onClick: this.onClick,
                    className: cx(this.props).addStates(this.getStyleStates()).build() },
                this.renderLabel(),
                this.renderHiddenInput(),
                this.renderIcon()
            );
        };

        return Select;
    }(_InputComponent3['default']);

    exports['default'] = Select;


    Select.displayName = 'Select';

    Select.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        placeholder: '请选择'
    });

    Select.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        placeholder: _react.PropTypes.string,
        children: _react.PropTypes.node.isRequired
    });

    Select.childContextTypes = _InputComponent3['default'].childContextTypes;
    Select.contextTypes = _InputComponent3['default'].contextTypes;

    /**
     * 生成 Select 的选项
     *
     * @param  {Array<{disabled: boolean, name: string, value: string}>} dataSource 数据
     * @return {Array<ReactElement>}
     */
    function createOptions(dataSource) {

        return dataSource.map(function (option, index) {

            return _react2['default'].createElement('option', {
                key: index,
                disabled: option.disabled,
                value: option.value,
                label: option.name });
        });
    }

    Select.createOptions = createOptions;
});
//# sourceMappingURL=Select.js.map