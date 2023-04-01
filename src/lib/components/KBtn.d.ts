export const ButtonPriorities = ['first', 'second', 'third'] as const;
export type ButtonPriority = (typeof ButtonPriorities)[number];
