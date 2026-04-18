export interface Chapter {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  notes: string;
  pdfUrl: string;
  quiz: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  chapters: Chapter[];
}

export interface ClassLevel {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  link: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
}
