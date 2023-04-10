export interface SveldProp {
	description?: any;
	value?: any;
	name: string;
	kind: string;
	type?: string;
	isFunction: boolean;
	isFunctionDeclaration: boolean;
	isRequired: boolean;
	constant: boolean;
	reactive: boolean;
}

export interface SveldSlot {
	name: string;
	default: boolean;
	fallback: string;
	slot_props: string;
	description?: string;
}

export interface SveldEvent {
	detail?: any;
	type: string;
	name: string;
	element: string;
	description?: string;
}

export interface SveldRestProps {
	type: string;
	name: string;
}

export interface SveldTypedefs {
	type: string;
	name: string;
	ts: string;
}

export interface SveldModuleExport {
	name: string;
	kind: string;
	type?: string;
	value: string;
	isFunction: boolean;
	isFunctionDeclaration: boolean;
	isRequired: boolean;
	constant: boolean;
	reactive: boolean;
}

export interface SveldJson {
	props: SveldProp[];
	slots: SveldSlot[];
	events: SveldEvent[];
	typedefs: SveldTypedefs[];
	rest_props: SveldRestProps[];
	moduleExports: SveldModuleExport[];
	componentComment?: string;
	extends?: {
		interface: string;
		import: string;
	};
}
