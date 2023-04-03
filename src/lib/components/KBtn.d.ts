export const ButtonPriorities = ['primary', 'secondary', 'tertiary'] as const;
export type ButtonPriority = (typeof ButtonPriorities)[number];
