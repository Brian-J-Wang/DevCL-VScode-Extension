import { CancellationToken, Event, ProviderResult, TreeDataProvider, TreeItem, TreeItemCheckboxState, TreeItemCollapsibleState, window } from "vscode";
import { ChecklistItem, DirectoryItem } from "./interfaces";


class ChecklistTreeViewProvider implements TreeDataProvider<TreeItem> {
    constructor(private readonly data: DirectoryItem[]) {
        
    }

    getTreeItem(element: DevCLTreeItem): TreeItem | Thenable<TreeItem> {
        return element;
    }
    getChildren(element?: DevCLTreeItem | undefined): TreeItem[] {
        if (element === undefined) {
            return this.data.map((child) => {
                return TreeFactory(child);
            });
        }

        if (element.type == 'folder') {
            if (element.children) {
                return element.children.map((child) => {
                    return TreeFactory(child as DirectoryItem);
                });
            } else {
                return [];
            }
        } 

        if (element.type == "file") {
            if (element.children) {
                return element.children.map((child) => {
                    return CheckListFactory(child as ChecklistItem);
                })
            } else {
                return [];
            }
            
        }

        return [];
    }
}

class DevCLTreeItem extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly type: "folder" | "file",
        public readonly children?: DirectoryItem[] | ChecklistItem[]
    ) {
        super(label, collapsibleState);
        this.tooltip = 'Hovering';
        this.description = "This is the description"
    }
}

class CheckListItemTreeItem extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly checked: boolean
    ) {
        super(label, TreeItemCollapsibleState.None);
        this.checkboxState = checked ? TreeItemCheckboxState.Checked : TreeItemCheckboxState.Unchecked;
    }
}

function TreeFactory(item: DirectoryItem) {
    if (item.type == "file") {
        return new DevCLTreeItem(item.name, TreeItemCollapsibleState.Collapsed, item.type, item.devclItems);
    } else {
        return new DevCLTreeItem(item.name, TreeItemCollapsibleState.Collapsed, item.type, item.children);
    }
}

function CheckListFactory(item: ChecklistItem) {
    return new CheckListItemTreeItem(item.title, item.checked);
}

export default ChecklistTreeViewProvider;