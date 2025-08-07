// lessonStore.ts

let selectedLesson: any = null;

export const setSelectedLesson = (lesson: any) => {
  selectedLesson = lesson;
};

export const getSelectedLesson = () => selectedLesson;
