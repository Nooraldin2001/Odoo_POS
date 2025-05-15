odoo.define("custom_delete_numwidget.NumpadWidget", function (require) {
    "use strict";

    const Registries = require("point_of_sale.Registries");
    const NumpadWidget = require("pos_access_right.NumpadWidget");

    const CustomDeleteNumpadWidget = (OriginalNumpadWidget) =>
        class extends OriginalNumpadWidget {
            get hasDeleteNumpadRights() {
                return this.env.pos.user.hasGroupDeleteNumpad;
            }
        };

    Registries.Component.extend(NumpadWidget, CustomDeleteNumpadWidget);

    return NumpadWidget;
}); 