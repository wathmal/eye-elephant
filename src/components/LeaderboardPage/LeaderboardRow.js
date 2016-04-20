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
                <td className="txt-rht leaderboard-rank-col">{this.props.player.rank}.</td>
                <td className="txt-lft leaderboard-name-col">{this.props.player.name}</td>
                <td className="txt-lft leaderboard-points-col">{this.props.player.points}</td>
            </tr>
        );
    }
}

export default LeaderboardRow;
