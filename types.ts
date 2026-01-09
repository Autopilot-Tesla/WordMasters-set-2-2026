export interface WordData {
  id: number;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  definitions: string[];
  otherForms?: string;
  exampleSentence: string;
}
