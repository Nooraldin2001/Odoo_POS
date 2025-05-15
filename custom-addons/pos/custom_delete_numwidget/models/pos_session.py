from odoo import models


class PosSession(models.Model):
    _inherit = "pos.session"

    def _get_pos_ui_res_users(self, params):
        user_vals = super()._get_pos_ui_res_users(params)
        user_id = user_vals.get("id")
        if user_id:
            user = self.env["res.users"].browse(user_id)
            groups = user.groups_id
            config = self.config_id
            user_vals.update(
                hasGroupDeleteNumpad=config.group_delete_numpad_id in groups,
            )
        return user_vals 