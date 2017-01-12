/**
 * @file melon/Select
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes, Children} from 'react';
import Icon from './Icon';
import InputComponent from 'melon-core/InputComponent';
import Group from './select/OptionGroup';
import Option from './select/Option';
import {create} from 'melon-core/classname/cxBuilder';
import Layer from './Layer';
import align from 'dom-align';
import {Motion, spring} from 'react-motion';

const cx = create('Select');

/**
 * melon/Select
 *
 * @extends {melon-core/InputComponent}
 * @class
 */
export default class Select extends InputComponent {

    /**
     * 构造函数
     *
     * @public
     * @constructor
     * @param  {*} props   属性
     * @param  {*} context 上下文
     */
    constructor(props, context) {

        super(props, context);

        /**
         * 状态
         *
         * @type {Object}
         */
        this.state = {
            ...this.state,
            open: false
        };

        this.onClick = this.onClick.bind(this);
        this.onClickOption = this.onClickOption.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
        this.renderOptions = this.renderOptions.bind(this);

    }

    componentDidUpdate() {

        if (this.state.open && this.layer && this.main) {

            let {
                mainArchor,
                layerArchor
            } = this.props;

            align(
                this.layer,
                this.main,
                {
                    points: [layerArchor, mainArchor],
                    overflow: {
                        adjustX: true,
                        adjustY: true
                    }
                }
            );
        }

    }

    componentWillUnmount() {

        if (this.closeingTimer) {
            clearTimeout(this.closeingTimer);
        }

    }

    /**
     * 点击时处理
     *
     * @protected
     */
    onClick() {

        const {disabled, readOnly} = this.props;

        if (disabled || readOnly) {
            return;
        }

        let open = this.state.open;

        if (open) {
            this.hideOptions();
        }
        else {
            this.setState({
                open: true
            });
        }

    }

    /**
     * 点击选项时处理
     *
     * @protected
     * @param  {Object} e 事件对象
     * @param  {string} e.value 当前值
     */
    onClickOption(e) {

        const value = e.value;

        if (this.state.closing) {
            return;
        }

        this.hideOptions();

        super.onChange({
            type: 'change',
            target: this,
            value
        });

    }

    /**
     * 渲染选项浮层
     *
     * @protected
     * @return {ReactElement}
     */
    renderOptions() {

        let children = Children.map(
            this.props.children,
            this.renderItem,
            this
        );

        let className = cx.getPartClassName('popup');
        let {open, closing} = this.state;
        let begin = open && !closing ? 0 : 1;
        let end = open && !closing ? 1 : 0;

        return (
            <Motion
                defaultStyle={{
                    opacity: begin,
                    scale: begin
                }}
                style={{
                    opacity: spring(end),
                    scale: spring(end, {stiffness: 260, damping: 20})
                }}>
                {({scale, opacity}) => (
                    <div
                        className={className}
                        style={{
                            opacity: opacity,
                            transform: `scale(${scale}, ${scale})`
                        }}
                        ref={layer => {
                            this.layer = layer;
                        }}>
                        {children}
                    </div>
                )}
            </Motion>
        );

    }

    /**
     * 渲染选项
     *
     * @protected
     * @param  {ReactElement} child 节点
     * @param  {number} index 序号
     * @return {ReactElement}
     */
    renderItem(child, index) {

        if (!child) {
            return null;
        }

        if (child.type === 'option') {
            return (
                <Option
                    {...child.props}
                    onClick={this.onClickOption}
                    key={index} />
            );
        }

        if (child.type === 'optgroup') {
            return (
                <Group
                    {...child.props}
                    onClick={this.onClickOption}
                    key={index} />
            );
        }

        return null;

    }

    /**
     * 渲染input
     *
     * @protected
     * @return {ReactElement}
     */
    renderHiddenInput() {

        const {name, value} = this.props;

        return name
            ? (
                <input
                    name={name}
                    type="hidden"
                    value={value} />
            )
            : null;

    }

    /**
     * 渲染label部件
     *
     * @protected
     * @return {ReactElement}
     */
    renderLabel() {

        const value = this.state.value;
        const {children, placeholder} = this.props;

        const option = this.findOption(value, children);

        const label = option
            ? (option.props.label || option.props.children)
            : (
                <span className={cx().part('label-placeholder').build()}>
                    {placeholder}
                </span>
            );

        return (
            <label className={cx().part('label').build()}>
                {label}
            </label>
        );

    }

    /**
     * 找到当前选中的选项
     *
     * @protected
     * @param  {string} value    当前值
     * @param  {Array<ReactElement>} children 子节点数组
     * @return {Array<ReactElement>?}
     */
    findOption(value, children) {

        children = Children.toArray(children);

        if (!children) {
            return null;
        }

        for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i];
            if (child.type === 'optgroup') {
                const option = this.findOption(value, child.props.children);
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
    }

    /**
     * 渲染icon
     *
     * @protected
     * @return {ReactElement}
     */
    renderIcon() {
        return <Icon icon='expand-more' />;
    }

    /**
     * 是否打开
     *
     * @protected
     * @return {boolean}
     */
    isOpen() {
        return this.state.open;
    }

    hideOptions() {

        this.setState({
            closing: true
        });

        this.closeingTimer = setTimeout(() => {

            this.setState({
                open: false,
                closing: false
            });

            this.closeingTimer = null;

        }, 500);

    }

    /**
     * 渲染
     *
     * @public
     * @return {ReactElement}
     */
    render() {

        let className = cx(this.props).addStates(this.getStyleStates()).build();
        let {open, closing} = this.state;

        return (
            <div
                onClick={this.onClick}
                className={className}
                ref={main => {
                    this.main = main;
                }}>
                {this.renderLabel()}
                {this.renderHiddenInput()}
                {this.renderIcon()}
                <Layer
                    open={open || closing}
                    onClickAway={this.hideOptions}
                    render={this.renderOptions} />
            </div>
        );

    }

}

Select.displayName = 'Select';

let archor = PropTypes.oneOf([
    'tl', 'tc', 'tr',
    'cl', 'cc', 'cr',
    'bl', 'bc', 'br'
]);

Select.propTypes = {
    ...InputComponent.propTypes,
    placeholder: PropTypes.string,
    children: PropTypes.node.isRequired,
    layerArchor: archor,
    mainArchor: archor
};

Select.defaultProps = {
    ...InputComponent.defaultProps,
    placeholder: '请选择',
    layerArchor: 'tl',
    mainArchor: 'tl'
};

Select.childContextTypes = InputComponent.childContextTypes;
Select.contextTypes = InputComponent.contextTypes;

/**
 * 生成 Select 的选项
 *
 * @param  {Array<{disabled: boolean, name: string, value: string}>} dataSource 数据
 * @return {Array<ReactElement>}
 */
export function createOptions(dataSource) {

    return dataSource.map(function (option, index) {

        return (
            <option
                key={index}
                disabled={option.disabled}
                value={option.value}
                label={option.name} />
        );

    });

}

Select.createOptions = createOptions;
