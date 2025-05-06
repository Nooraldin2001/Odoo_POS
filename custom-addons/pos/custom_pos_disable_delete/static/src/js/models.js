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
        
        // Get the restricted group ID from company
        if (loadedData['res.company']) {
            const company = loadedData['res.company'].find(
                comp => comp.id === this.company.id
            );
            if (company && company.restricted_delete_group_id) {
                this.restricted_delete_group_id = company.restricted_delete_group_id[0];
                console.log("💡 Restricted Delete Group ID:", this.restricted_delete_group_id);
            }
        }
    },
    
    can_delete_orderlines() {
        // If restriction is disabled in POS config, allow delete
        if (!this.config.restrict_delete_for_cashiers) {
            return true;
        }
        
        // Check if user is in the restricted group
        const restrictedGroupId = this.restricted_delete_group_id;
        if (!restrictedGroupId) {
            console.log("No restricted group ID found, allowing delete");
            return true;
        }
        
        // If user has the restricted group, disable delete
        if (this.user_groups.includes(restrictedGroupId)) {
            console.log("User in restricted group, delete disabled");
            return false;
        }
        
        console.log("User not in restricted group, allowing delete");
        return true;
    }
});