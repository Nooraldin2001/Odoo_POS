# -*- coding: utf-8 -*-
from . import models

def post_init_hook(cr, registry):
    """Initialize the restricted_delete_group_id field for all companies"""
    from odoo import api, SUPERUSER_ID
    env = api.Environment(cr, SUPERUSER_ID, {})
    companies = env['res.company'].search([])
    restricted_group = env.ref('custom_pos_disable_delete.group_pos_cashier_restricted', False)
    if restricted_group:
        for company in companies:
            company.restricted_delete_group_id = restricted_group.id