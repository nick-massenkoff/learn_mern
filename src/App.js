const contentNode = document.getElementById('contents');

class IssueFilter extends React.Component {
  render() {
    return (
      <div>Filter placeholder</div>
    );
  }
}

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
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

class IssueTable extends React.Component {
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
        <tbody>{this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)}</tbody>
      </table>
    );
  }
}

class IssueAdd extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
    });
    form.owner.value = "";
    form.title.value = "";
  }


  render() {
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

class IssueList extends React.Component {
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
      res.data.records.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate)
          issue.completionDate = new Date(issue.completionDate);
      })
        this.setState({ issues: res.data.records });
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
ReactDOM.render(<IssueList />, contentNode);