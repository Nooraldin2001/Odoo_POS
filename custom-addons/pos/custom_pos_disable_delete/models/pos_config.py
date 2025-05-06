# -*- coding: utf-8 -*-
from odoo import api, fields, models

class PosConfig(models.Model):
    _inherit = 'pos.config'
    
    restrict_delete_for_cashiers = fields.Boolean(
        string="Restrict Delete for Cashiers",
        default=True,
        help="If enabled, users in the POS Cashier (No Delete) group cannot use the delete button"
    )
    
class ResCompany(models.Model):
    _inherit = 'res.company'
    
    restricted_delete_group_id = fields.Many2one(
        'res.groups',
        string="POS Restricted Delete Group",
        default=lambda self: self.env.ref('custom_pos_disable_delete.group_pos_cashier_restricted', False),
        help="Users in this group cannot delete order lines in POS"
    )