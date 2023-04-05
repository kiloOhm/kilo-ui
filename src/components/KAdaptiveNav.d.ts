import type { MenuCategory, MenuItem } from '../lib/components/KMenu';
import type { TabCategory, TabItem } from '../lib/components/KTabs';

export type AdaptiveNavStyle = 'side-menu' | 'side-drawer-menu' | 'tabs' | 'collapse-menu';
export type AdaptiveNavItem = MenuItem | MenuCategory | TabItem | TabCategory;
