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
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].value === 'Backspace') {
                buttons[i].disabled = !canDelete;
                // Make it visually clear the button is disabled
                if (!canDelete) {
                    buttons[i].class = (buttons[i].class || '') + ' disabled-button';
                }
            }
        }
        
        return buttons;
    },
    
    _onClickNumpad(event) {
        const button = event.target.closest('.numpad-button');
        if (button && button.dataset.value === 'Backspace' && !this.deleteEnabled) {
            // Prevent action if delete is disabled
            console.log("Delete button is disabled for this user");
            return;
        }
        return super._onClickNumpad(event);
    }
});