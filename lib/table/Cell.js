(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.Cell = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon/TableCell
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('TableCell');

    var TableCell = function (_Component) {
        babelHelpers.inherits(TableCell, _Component);

        function TableCell() {
            babelHelpers.classCallCheck(this, TableCell);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        TableCell.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            return nextProps !== this.props;
        };

        TableCell.prototype.render = function render() {
            var _props = this.props,
                align = _props.align,
                width = _props.width,
                height = _props.height,
                content = _props.content;


            var style = {
                textAlign: align,
                width: width,
                height: height
            };

            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                _react2['default'].createElement(
                    'div',
                    { className: cx.getPartClassName('wrap1'), style: style },
                    _react2['default'].createElement(
                        'div',
                        { className: cx.getPartClassName('wrap2') },
                        _react2['default'].createElement(
                            'div',
                            { className: cx.getPartClassName('wrap3') },
                            content
                        )
                    )
                )
            );
        };

        return TableCell;
    }(_react.Component);

    exports['default'] = TableCell;


    TableCell.displayName = 'TableCell';

    TableCell.propTypes = {

        part: _react.PropTypes.oneOf(['header', 'body', 'footer']),

        columnData: _react.PropTypes.any,
        rowData: _react.PropTypes.any,
        columnIndex: _react.PropTypes.number,
        rowIndex: _react.PropTypes.number,
        cellData: _react.PropTypes.any,
        cellKey: _react.PropTypes.oneOfType([_react.PropTypes.string.isRequired, _react.PropTypes.number.isRequired]),
        height: _react.PropTypes.number.isRequired,
        width: _react.PropTypes.number.isRequired,
        minWidth: _react.PropTypes.number,
        maxWidth: _react.PropTypes.number,

        cellRenderer: _react.PropTypes.func

    };

    TableCell.defaultProps = {
        align: 'left'
    };
});
//# sourceMappingURL=Cell.js.map
