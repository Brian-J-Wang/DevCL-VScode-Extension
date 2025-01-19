export interface DirectoryItem {
	type: "folder" | "file",
    name: string,
	devclItems: ChecklistItem[],
	children: DirectoryItem[],
}

export interface ChecklistItem {
    title: string,
    checked: boolean
}