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

        if (element.children) {
            if (element.type == "folder") {
                return element.children.map((child) => {
                    return TreeFactory(child as DirectoryItem);
                });
            } else {
                return element.children.map((child) => {
                    return CheckListFactory(child as ChecklistItem);
                })
            }
        } else {
            return [];
        }
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
        this.checkboxState = TreeItemCheckboxState.Unchecked;
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
    return new DevCLTreeItem(item.name, TreeItemCollapsibleState.Expanded, item.type, item.children);
}

function CheckListFactory(item: ChecklistItem) {
    return new CheckListItemTreeItem(item.title, item.checked);
}

export default ChecklistTreeViewProvider;