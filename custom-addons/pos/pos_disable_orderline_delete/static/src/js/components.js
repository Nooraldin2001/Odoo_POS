odoo.define('pos_disable_orderline_delete.components', function (require) {
    'use strict';

    const Registries = require('point_of_sale.Registries');
    const OrderlineDisplay = require('point_of_sale.OrderlineDisplay');
    const NumpadWidget = require('point_of_sale.NumpadWidget');
    const { useListener } = require("@web/core/utils/hooks");
    const { onWillStart } = owl;

    // Override OrderlineDisplay to hide or disable the trash button
    const DisableDeleteOrderlineDisplay = (OrderlineDisplay) => class DisableDeleteOrderlineDisplay extends OrderlineDisplay {
        setup() {
            super.setup();

            // Remove the delete button click handler
            this.removeListener('click', '.deleteButton');
        }

        get isDeleteButtonVisible() {
            // only show the trash-can if the user is in the Manager group
            return this.env.pos.user.has_group('pos.group_pos_manager');
        }
    };

    // Register the extended OrderlineDisplay
    Registries.Component.extend(OrderlineDisplay, DisableDeleteOrderlineDisplay);

    // Override NumpadWidget to prevent setting quantity to zero
    const DisableDeleteNumpadWidget = (NumpadWidget) => class DisableDeleteNumpadWidget extends NumpadWidget {
        setup() {
            super.setup();

            // Add a hook before processing input
            onWillStart(() => {
                const originalClickAppendNewChar = this.clickAppendNewChar;
                this.clickAppendNewChar = (event) => {
                    const newChar = event.target.innerText.trim();
                    if (this.state.activeMode === 'quantity' && newChar === '0' && !this.state.buffer) {
                        // Don't allow setting quantity to 0
                        return;
                    }
                    originalClickAppendNewChar.call(this, event);
                };

                // Override the delete button behavior
                const originalClickDelete = this.clickDelete;
                this.clickDelete = (event) => {
                    if (this.state.activeMode === 'quantity' &&
                        (this.state.buffer === '1' || this.state.buffer === '')) {
                        // Don't allow setting quantity to 0
                        return;
                    }
                    originalClickDelete.call(this, event);
                };
            });
        }

        // Override changeMode to prevent quantity changes that would lead to deletion
        changeMode(mode) {
            if (mode === 'quantity') {
                const selectedOrderline = this.env.pos.get_order()?.get_selected_orderline();
                if (selectedOrderline && this.state.buffer === '0') {
                    this.state.buffer = '1';
                }
            }
            return super.changeMode(mode);
        }
    };

    // Register the extended NumpadWidget
    Registries.Component.extend(NumpadWidget, DisableDeleteNumpadWidget);

    return {
        DisableDeleteOrderlineDisplay,
        DisableDeleteNumpadWidget
    };
});
