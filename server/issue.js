const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
};

function validateIssue(issue) {
  let errorMessage;

  Object.keys(issueFieldType).forEach((field) => {
    const type = issueFieldType[field];
    if (type === 'required' && !issue[field]) {
      errorMessage = `${field} is required.`;
    }
  });

  if (!validIssueStatus[issue.status]) {
    return `${issue.status} is not a valid status.`;
  }

  return errorMessage;
}

export default {
  validateIssue,
};
