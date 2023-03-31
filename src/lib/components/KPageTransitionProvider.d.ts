export type Transition = FlyTransition | FadeTransition;

export type FlyTransition = {
	type: 'fly';
	direction: 'left' | 'right' | 'up' | 'down';
	amount: number;
	duration: number;
};

export type FadeTransition = {
	type: 'fade';
	duration: number;
};
