import { Plugin } from "obsidian";

export default class FocusMode extends Plugin {
    collapseSidebarsActive = false;

    maximisedClass = "maximised";
    focusModeClass = "focus-mode";
    superFocusModeClass = "super-focus-mode";
    sidebarCollapsedClass = "sidebars-collapsed";

    leftSidebarWasCollapsed: boolean;
    rightSidebarWasCollapsed: boolean;

    // removeExtraneousClasses() {
    //     if (
    //         // @ts-ignore
    //         this.app.workspace.rootSplit.containerEl.hasClass(
    //             this.maximisedClass
    //         )
    //     ) {
    //         // @ts-ignore
    //         this.app.workspace.rootSplit.containerEl.removeClass(
    //             this.maximisedClass
    //         );

    //         // @ts-ignore
    //         this.app.workspace.onLayoutChange();
    //     }

    //     if (document.body.classList.contains(this.superFocusModeClass)) {
    //         document.body.classList.remove(this.superFocusModeClass);
    //     }
    // }

    sidebarIsOpen() {
        return (
            !this.app.workspace.leftSplit.collapsed ||
            !this.app.workspace.rightSplit.collapsed
        );
    }

    collapseSidebars() {
        this.leftSidebarWasCollapsed = this.app.workspace.leftSplit.collapsed;
        this.rightSidebarWasCollapsed = this.app.workspace.rightSplit.collapsed;

        // @ts-ignore
        this.app.on("active-leaf-change", () => {
            try {
                // @ts-ignore
                this.app.workspace.activeLeaf.view.editor.blur();
                // @ts-ignore
                this.app.workspace.activeLeaf.view.editor.focus();
                // @ts-ignore
                this.app.workspace.activeLeaf.view.editor.refresh();
            } catch (ignore) {}
        });

        // if (!document.body.classList.contains(this.focusModeClass)) {
        //     this.storeSplitsValues();
        // }

        this.app.workspace.leftSplit.collapse();
        this.app.workspace.rightSplit.collapse();
    }

    restoreSidebars() {
        // if (document.body.classList.contains(this.focusModeClass)) {
        //     document.body.classList.remove(this.focusModeClass);
        // }

        if (!this.leftSidebarWasCollapsed) {
            this.app.workspace.leftSplit.expand();
        }

        if (!this.rightSidebarWasCollapsed) {
            this.app.workspace.rightSplit.expand();
        }
    }

    toggleSidebars() {
        console.log("\n\n\n\n\n");
        console.log("BEFORE toggle");
        console.log(
            `this.leftSidebarWasCollapsed: ${this.leftSidebarWasCollapsed}`
        );
        console.log(
            `this.rightSidebarWasCollapsed: ${this.rightSidebarWasCollapsed}`
        );
        console.log(
            `real leftSplit.collapsed: ${this.app.workspace.leftSplit.collapsed}`
        );
        console.log(
            `real rightSplit.collapsed: ${this.app.workspace.rightSplit.collapsed}`
        );

        if (this.sidebarIsOpen()) {
            console.log("........collapseSidebars........");
            this.collapseSidebars();
        } else {
            console.log("........restoreSidebars........");
            this.restoreSidebars();
        }

        console.log("\n\n");
        console.log("AFTER toggle");
        console.log(
            `this.leftSidebarWasCollapsed: ${this.leftSidebarWasCollapsed}`
        );
        console.log(
            `this.rightSidebarWasCollapsed: ${this.rightSidebarWasCollapsed}`
        );
        console.log(
            `real leftSplit.collapsed: ${this.app.workspace.leftSplit.collapsed}`
        );
        console.log(
            `real rightSplit.collapsed: ${this.app.workspace.rightSplit.collapsed}`
        );

        console.log("--------------------");
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
