from odoo import fields, models


class PosConfig(models.Model):
    _inherit = "pos.config"

    group_delete_numpad_id = fields.Many2one(
        comodel_name="res.groups",
        compute="_compute_groups",
        string="Point of Sale - Allow Delete Numpad",
        help="This field is there to pass the id of the 'PoS - Allow Delete"
        " Numpad' Group to the Point of Sale Frontend.",
    )

    def _compute_groups(self):
        res = super()._compute_groups()
        self.update(
            {
                "group_delete_numpad_id": self.env.ref(
                    "custom_delete_numwidget.group_delete_numpad"
                ).id,
            }
        )
        return res 