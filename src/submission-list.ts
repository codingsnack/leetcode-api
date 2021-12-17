import { Constants } from './constants';
import { ISubmission } from './models/ISubmission';
import { ISubmissionList } from './models/ISubmissionList';

export class SubmissionList implements ISubmissionList {
  lastKey: any;
  hasNext: boolean;
  submissions: ISubmission[];

  constructor(lastKey: any, hasNext: boolean, submissions: ISubmission[]) {
    this.lastKey = lastKey;
    this.hasNext = hasNext;
    this.submissions = submissions;
    if (submissions) {
      this.submissions.forEach((submission) => {
        submission.absoluteUrl = `${Constants.ENDPOINT}${submission.url}`;
      });
    }
  }
}
