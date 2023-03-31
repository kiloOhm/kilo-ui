export type TabItem = {
	type: 'item';
	key: string;
	label?: string;
	iconHTML?: string;
};

export type TabCategory = {
	type: 'category';
	key: string;
	label?: string;
	items: TabItem[];
};
