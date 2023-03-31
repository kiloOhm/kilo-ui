export type MenuItemMixed = MenuItem | MenuCategory | MenuDivider;

export type MenuItem = {
	type: 'item';
	key: string;
	label?: string;
	iconHTML?: string;
};

export type MenuCategory = {
	type: 'category';
	key: string;
	label?: string;
	items: MenuItem[];
};

export type MenuDivider = {
	type: 'divider';
	label?: string;
};
