/**
 * @file example routes
 * @author leon <ludafa@outlook.com>
 */

// 首页
import Home from './Home';

// 指南
import Installation from './guides/installation.md';
import Usage from './guides/usage.md';

// 组件
import Avatar from './components/Avatar.md';
import Button from './components/Button.md';
import BoxGroup from './components/BoxGroup.md';
import Dialog from './components/Dialog.md';
import Breadcrumb from './components/Breadcrumb.md';
import Card from './components/Card.md';

export default [
    {
        pathname: '/',
        name: '首页',
        component: Home
    },
    {
        pathname: '/guide',
        name: '指南',
        components: [
            {
                name: '安装',
                pathname: '/installation',
                component: Installation
            },
            {
                name: '使用',
                pathname: '/usage',
                component: Usage
            }
        ]
    },
    {
        name: '组件',
        pathname: '/components',
        components: [
            {
                name: 'Avatar',
                pathname: '/Avatar',
                component: Avatar
            },
            {
                name: 'Button',
                pathname: '/Button',
                component: Button
            },
            {
                name: 'BoxGroup',
                pathname: '/BoxGroup',
                component: BoxGroup
            },
            {
                name: 'Dialog',
                pathname: '/Dialog',
                component: Dialog
            },
            {
                name: 'Breadcrumb',
                pathname: '/Breadcrumb',
                component: Breadcrumb
            },
            {
                name: 'Card',
                pathname: '/Card',
                component: Card
            }
        ]
    }
];