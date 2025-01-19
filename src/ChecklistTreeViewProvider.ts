import { CancellationToken, Event, ProviderResult, TreeDataProvider, TreeItem, TreeItemCheckboxState, TreeItemCollapsibleState, window } from "vscode";


class ChecklistTreeViewProvider implements TreeDataProvider<TreeItem> {
    data: DevCLTreeItem[] = [
        new DevCLTreeItem("Test", TreeItemCollapsibleState.Collapsed, [
            new DevCLTreeItem("tester", TreeItemCollapsibleState.None)
        ]),
    ]; 
    constructor(data) {
        
    }

    getTreeItem(element: DevCLTreeItem): TreeItem | Thenable<TreeItem> {
        return element;
    }
    getChildren(element?: DevCLTreeItem | undefined): DevCLTreeItem[] {
        if (element === undefined) {
            return this.data;
        }
        return element.children ?? [];
    }
}

class DevCLTreeItem extends TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: TreeItemCollapsibleState,
        public readonly children?: DevCLTreeItem[]
    ) {
        super(label, collapsibleState);
        this.tooltip = 'Hovering';
        this.description = "This is the description"
        this.checkboxState = TreeItemCheckboxState.Unchecked;
    }
}

export default ChecklistTreeViewProvider;