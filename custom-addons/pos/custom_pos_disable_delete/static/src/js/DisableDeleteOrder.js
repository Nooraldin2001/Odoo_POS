/*** custom_pos_disable_delete/static/src/js/DisableDeleteOrder.js ***/
odoo.define('custom_pos_disable_delete.DisableDeleteOrder', function (require) {
    "use strict";

    const OrderWidget = require('point_of_sale.OrderWidget');
    const { patch } = require('@web/core/utils/patch');

    patch(OrderWidget.prototype, {
        setup() {
            this._super.apply(this, arguments);
            const user = this.env.services.user;
            // You can define a group like 'group_pos_cashier' in Python and check here
            this.isCashier = user.has_group('your_module.group_pos_cashier'); 
        },
        deleteOrder() {
            if (this.isCashier) {
                this.showPopup('ErrorPopup', {
                    title: 'Permission Denied',
                    body: 'You are not allowed to delete orders.',
                });
                return;
            }
            this._super.apply(this, arguments);
        },
    });
});
