/**
 * @file Example / Calendar
 * @author cxtom<cxtom2010@gmail.com>
 */


import React from 'react';
import Calendar from 'melon/Calendar';
import Title from 'melon/Title';

require('../code/Calendar.txt');

function View(props) {

    return (
        <div>
            <div className="melon-row">
                <div className="melon-column melon-column-6">
                    <Title level={5}>普通日历</Title>
                    <Calendar></Calendar>
                </div>
                <div className="melon-column melon-column-6">
                    <Title level={5}>限定区间</Title>
                    <Calendar
                        value="2015-09-01"
                        begin={new Date(2015, 7, 10)}
                        end={new Date(2015, 9, 28)}></Calendar>
                    2015-7-10 to 2015-9-28
                </div>
            </div>
            <div className="melon-row">
                <div className="melon-column melon-column-6">
                    <Title level={5}>禁用</Title>
                    <Calendar disabled></Calendar>
                </div>
                <div className="melon-column melon-column-6">
                    <Title level={5}>只读</Title>
                    <Calendar begin={new Date(2014, 9, 10)} end={new Date(2015, 9, 10)} readOnly></Calendar>
                </div>
            </div>
        </div>
    );
}

module.exports = View;
