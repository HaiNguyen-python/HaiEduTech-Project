type MultipleChoiceExercise = {
  options: [string, string, string, string];
  answer: number;
};

/** Distributes correct choices across A-D without changing question meaning. */
export function balanceExerciseOptions<T extends MultipleChoiceExercise>(exercises: T[]): T[] {
  return exercises.map((exercise, index) => {
    const target = index % exercise.options.length;
    if (exercise.answer === target) return exercise;
    const options = [...exercise.options] as [string, string, string, string];
    [options[target], options[exercise.answer]] = [options[exercise.answer], options[target]];
    return { ...exercise, options, answer: target };
  });
}