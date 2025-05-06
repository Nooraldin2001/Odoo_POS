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

class PosSession(models.Model):
    _inherit = 'pos.session'

    def _loader_params_res_company(self):
        result = super()._loader_params_res_company()
        result['search_params']['fields'].append('restricted_delete_group_id')
        return result
        
    def _pos_data_process(self, loaded_data):
        super()._pos_data_process(loaded_data)
        # Ensure the config has the restrict_delete_for_cashiers field
        if 'pos.config' in loaded_data:
            for config in loaded_data['pos.config']:
                if 'restrict_delete_for_cashiers' not in config:
                    config['restrict_delete_for_cashiers'] = True