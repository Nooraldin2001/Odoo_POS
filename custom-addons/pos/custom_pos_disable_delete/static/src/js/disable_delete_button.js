/** @odoo-module **/

import { NumpadWidget } from "@point_of_sale/app/widgets/numpad/numpad";
import { patch } from "@web/core/utils/patch";

patch(NumpadWidget.prototype, {
    setup() {
        super.setup();
        this.deleteEnabled = true;
    },
    
    get numpadButtons() {
        const buttons = super.numpadButtons;
        
        // Check permission before rendering
        const canDelete = this.env.pos.can_delete_orderlines();
        this.deleteEnabled = canDelete;
        
        // Find and update the delete button if it exists
        const deleteButton = buttons.find(btn => btn.value === 'Backspace');
        if (deleteButton) {
            deleteButton.disabled = !canDelete;
        }
        
        return buttons;
    },
    
    async _onClickNumpad(event) {
        const button = event.target.closest('.numpad-button');
        if (button && button.dataset.value === 'Backspace' && !this.deleteEnabled) {
            // Prevent action if delete is disabled
            return;
        }
        await super._onClickNumpad(event);
    }
});