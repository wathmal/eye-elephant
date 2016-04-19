/**
 * Created by thisara on 4/19/16.
 */
import React, { Component, PropTypes } from 'react';
import styles from './LeaderboardRow.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class LeaderboardRow extends Component {

    static propTypes = {
        player: PropTypes.object
    };

    constructor() {
        super();
    }

    componentDidMount() {

    }

    render() {
        return (
            <tr className='list-highlight'>
                <td>{this.props.player.rank}</td>
                <td className="txt-rht">{this.props.player.name}</td>
                <td className="txt-rht">{this.props.player.points}</td>
            </tr>
        );
    }
}

export default LeaderboardRow;
