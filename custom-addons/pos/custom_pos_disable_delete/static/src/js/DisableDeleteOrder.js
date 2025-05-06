/** @odoo-module **/
console.log("✅ DisableDeleteOrder.js loaded");

import { patch } from "@web/core/utils/patch";
import { NumpadWidget } from "@point_of_sale/app/widgets/numpad/numpad";

patch(NumpadWidget.prototype, {
    mounted() {
        super.mounted();
        console.log("🔍 DisableDeleteOrder.js: mounted");

        const employee = this.env.pos.get_order().employee;
        const restricted = ["Cashier"];
        console.log("🔒 Logged-in employee:", employee?.name);

        if (employee && restricted.includes(employee.name)) {
            const deleteButton = this.el.querySelector("button");
            const allButtons = this.el.querySelectorAll("button");

            console.log("🔘 Numpad Buttons Found:", allButtons.length);
            const delBtn = [...allButtons].find(btn => btn.textContent.trim() === "⌫");
            if (delBtn) {
                console.log("🚫 Disabling ⌫ Button for", employee.name);
                delBtn.disabled = true;
                delBtn.style.opacity = 0.5;
                delBtn.style.pointerEvents = "none";
            } else {
                console.warn("⚠️ Delete button not found!");
            }
        }
    }
});
