import React from 'react';
import IssueRow from './IssueRow.jsx';

export default class IssueTable extends React.Component {
  render() {
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completeion Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{this.props.issues.map(issue => <IssueRow key={issue._id} issue={issue} />)}</tbody>
      </table>
    );
  }
}

