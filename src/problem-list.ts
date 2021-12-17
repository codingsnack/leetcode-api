import { IListProbems } from './models/IListProbems';
import { IProblem } from './models/IProblem';

export class ProblemList implements IListProbems {
  total: number;
  questions: IProblem[];

  constructor(total: number, questions: IProblem[]) {
    this.total = total;
    this.questions = questions;
  }
}
