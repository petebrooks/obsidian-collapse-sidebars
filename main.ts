import { Plugin } from "obsidian";

export default class FocusMode extends Plugin {
    collapseSidebarsActive = false;

    maximisedClass = "maximised";
    focusModeClass = "focus-mode";
    superFocusModeClass = "super-focus-mode";
    sidebarCollapsedClass = "sidebars-collapsed";

    leftSidebarWasCollapsed: boolean;
    rightSidebarWasCollapsed: boolean;

    sidebarIsOpen() {
        return (
            !this.app.workspace.leftSplit.collapsed ||
            !this.app.workspace.rightSplit.collapsed
        );
    }

    collapseSidebars() {
        this.leftSidebarWasCollapsed = this.app.workspace.leftSplit.collapsed;
        this.rightSidebarWasCollapsed = this.app.workspace.rightSplit.collapsed;

        this.app.on("active-leaf-change", () => {
            try {
                this.app.workspace.activeLeaf.view.editor.blur();
                this.app.workspace.activeLeaf.view.editor.focus();
                this.app.workspace.activeLeaf.view.editor.refresh();
            } catch (ignore) {}
        });

        this.app.workspace.leftSplit.collapse();
        this.app.workspace.rightSplit.collapse();
    }

    restoreSidebars() {
        if (!this.leftSidebarWasCollapsed) {
            this.app.workspace.leftSplit.expand();
        }

        if (!this.rightSidebarWasCollapsed) {
            this.app.workspace.rightSplit.expand();
        }
    }

    toggleSidebars() {
        if (this.sidebarIsOpen()) {
            this.collapseSidebars();
        } else {
            this.restoreSidebars();
        }
    }

    async onload() {
        console.log("loading sidebar toggle plugin ...");

        this.addCommand({
            id: "toggle-sidebars",
            name: "Toggle Sidebars",
            callback: () => {
                this.toggleSidebars();
            },
        });
    }

    onunload() {
        console.log("unloading sidebar toggle plugin ...");
    }
}
