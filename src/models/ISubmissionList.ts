import { ISubmission } from './ISubmission';

export interface ISubmissionList {
  lastKey: any;
  hasNext: boolean;
  submissions: ISubmission[];
}
