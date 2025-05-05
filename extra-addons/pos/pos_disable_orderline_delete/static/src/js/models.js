odoo.define('pos_disable_orderline_delete.models', function (require) {
    'use strict';

    const { Order, Orderline } = require('point_of_sale.models');
    const Registries = require('point_of_sale.Registries');
    const { PosGlobalState } = require('point_of_sale.models');

    // Extend the Orderline prototype to disable removal
    const DisableDeleteOrderline = (Orderline) => class DisableDeleteOrderline extends Orderline {
        // Override the can_be_merged_with function to prevent merging
        can_be_merged_with(orderline) {
            // Always return false to prevent merging which can lead to deletion
            return false;
        }

        // Override the set_quantity method to prevent setting quantity to 0
        set_quantity(quantity, keep_price) {
            // If trying to set quantity to 0 or less, keep the existing quantity
            if (quantity <= 0) {
                return;
            }
            // Call the original method with the validated quantity
            return super.set_quantity(quantity, keep_price);
        }
    };

    // Register the extended Orderline
    Registries.Model.extend(Orderline, DisableDeleteOrderline);

    // Extend the Order class to prevent removing order lines
    const DisableDeleteOrder = (Order) => class DisableDeleteOrder extends Order {
        remove_orderline(line) {
            // only block deletion for non-managers
            if (!this.pos.user.has_group('pos.group_pos_manager')) {
                return;
            }
            return super.remove_orderline(line);
        }
    };

    // Register the extended Order
    Registries.Model.extend(Order, DisableDeleteOrder);

    // Extend the PosGlobalState to disable the remove line function
    const DisableDeletePosGlobalState = (PosGlobalState) => class DisableDeletePosGlobalState extends PosGlobalState {
        // Hook into initialization
        async after_load_server_data() {
            const result = await super.after_load_server_data();

            // Patch the remove_orderline function in the UI
            const original_remove_orderline = this.get_order()?.remove_orderline;
            if (original_remove_orderline) {
                this.get_order().remove_orderline = function() {
                    // Do nothing, effectively disabling the delete functionality
                    return;
                };
            }

            return result;
        }
    };

    // Register the extended PosGlobalState
    Registries.Model.extend(PosGlobalState, DisableDeletePosGlobalState);

    return {
        DisableDeleteOrderline,
        DisableDeleteOrder,
        DisableDeletePosGlobalState
    };
});
