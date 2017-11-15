import React from 'react';
import { Link } from 'react-router-dom';

export default class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td><Link to={`/issues/${issue._id}`}>{issue._id.substr(-4)}</Link></td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ? issue.completionDate.toDateString() : ''}</td>
        <td>{issue.title}</td>
      </tr>
    );
  }
}

