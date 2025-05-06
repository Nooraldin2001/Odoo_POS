/** @odoo-module **/

import { PosGlobalState } from "@point_of_sale/app/store/pos_store";
import { patch } from "@web/core/utils/patch";

patch(PosGlobalState.prototype, {
    async _processData(loadedData) {
        await super._processData(...arguments);
        // Store user groups in the POS session for easy access
        if (loadedData['res.users']) {
            const currentUser = loadedData['res.users'].find(
                user => user.id === this.user.id
            );
            this.user_groups = currentUser ? currentUser.groups_id : [];
            console.log("💡 POS User Groups:", this.user_groups);
        }
    },
    
    can_delete_orderlines() {
        // Check if user is in the restricted group
        const restrictedGroupId = this.company.restricted_delete_group_id?.[0];
        if (!restrictedGroupId) return true;
        
        // If feature is enabled in config and user has restricted group
        if (this.config.restrict_delete_for_cashiers && 
            this.user_groups.includes(restrictedGroupId)) {
            return false;
        }
        return true;
    }
});