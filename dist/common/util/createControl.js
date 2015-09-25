define('melon/common/util/createControl', [
    'exports',
    '../../babelHelpers',
    'react',
    '../component/Base'
], function (exports) {
    var babelHelpers = require('../../babelHelpers');
    var React = require('react');
    var Base = require('../component/Base');
    module.exports = function (Component) {
        var displayName = Component.displayName;
        var dashDisplayName = displayName.toLowerCase();
        return React.createClass({
            displayName: displayName,
            render: function render() {
                return React.createElement(Base, {
                    originProps: this.props,
                    displayName: dashDisplayName
                }, function (props, extraProps) {
                    return React.createElement(Component, React.__spread({}, props, extraProps));
                });
            }
        });
    };
});