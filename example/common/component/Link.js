/**
 * @file Link
 * @author leon <ludafa@outlook.com>
 */

import LinkButton from 'melon/Link';
import {Bind} from 'lodash-decorators';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

export default class Link extends PureComponent {

    static contextTypes = {
        locator: PropTypes.object
    };

    @Bind()
    onClick(e) {

        let {href, onClick} = this.props;

        if (onClick) {
            onClick(e);
        }

        if (!href || href.startsWith('http') || e.isDefaultPrevented()) {
            return;
        }

        e.preventDefault();
        this.context.locator.redirect(href);

    }

    render() {
        return (
            <LinkButton {...this.props} onClick={this.onClick} />
        );
    }

}