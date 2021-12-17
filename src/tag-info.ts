import { IByTag, TopicTagQuestion } from './models/IByTag';

export class TagInfo implements IByTag {
  name: string;
  slug: string;
  questions: TopicTagQuestion[];
  frequencies: string;

  constructor(name: string, slug: string, questions: TopicTagQuestion[], frequencies: string) {
    this.name = name;
    this.slug = slug;
    this.questions = questions;
    this.frequencies = frequencies;

    this.initFrequency(frequencies, questions);
  }

  private initFrequency(frequencies: string, questions: TopicTagQuestion[]) {
    try {
      const freqs = JSON.parse(frequencies);
      for (let questionId in freqs) {
        if (questions) {
          questions.forEach((question) => {
            if (question.questionId === questionId) {
              question.frequency = freqs[questionId];
            }
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
