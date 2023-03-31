import type { MenuCategory, MenuItem } from './KMenu';
import type { TabCategory, TabItem } from './KTabs';

export type AdaptiveNavStyle = 'side-menu' | 'side-drawer-menu' | 'tabs' | 'collapse-menu';
export type AdaptiveNavItem = MenuItem | MenuCategory | TabItem | TabCategory;
