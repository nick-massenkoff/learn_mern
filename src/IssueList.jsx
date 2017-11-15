import React from 'react';
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import axios from 'axios';

export default class IssueList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {issues: []};
    this.createIssue = this.createIssue.bind(this);
    this.axios = axios.create({
      baseURL: 'http://localhost:3000/api/'
    });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.axios.get('issues').then((res) => {
      console.log('Total num of records: ' + res.data._metadata.total_count);
      if (res.status === 200) {
        res.data.records.forEach(issue => {
          issue.created = new Date(issue.created);
          if (issue.completionDate)
            issue.completionDate = new Date(issue.completionDate);
        })
        this.setState({ issues: res.data.records });
      } else {
        alert('Error in fetching data from server:', res.message);
      }
    }).catch((err) => {
        console.log(err);
    });
  }

  createIssue(newIssue) {
    this.axios.post('issues', newIssue).then((res) => {
        res.data.created = new Date(res.data.created);
        if (res.data.completionDate)
          res.data.completionDate = new Date(res.data.completionDate);
      const newIssues = this.state.issues.concat(res.data);
      this.setState({ issues: newIssues });
    }).catch(err => {
      console.log(err.response);
      alert('Error creating issue. ' + err.response.data.message);
    });
  }

  render() {
    return (
      <div>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
        <hr />
      </div>
    );
  }
}
