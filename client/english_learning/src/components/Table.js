import React from 'react';

function Table(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Present</th>
                    <th>Simple Past</th>
                    <th>Past Participle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{props.children.present}</th>
                    <th>{props.children.past}</th>
                    <th>{props.children.participle}</th>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;