# -*- coding: utf-8 -*-
{
    'name': 'POS Disable Orderline Delete',
    'version': '17.0.1.0.0',
    'category': 'Point of Sale',
    'summary': 'Disables the ability to delete order lines in POS',
    'description': """
        This module prevents users from deleting order lines in the Point of Sale interface.
        Once a product is added to the order, it cannot be removed.
    """,
    'author': 'Your Company',
    'website': 'https://www.yourcompany.com',
    'depends': ['point_of_sale'],
    'data': [],
    'assets': {
        'point_of_sale.assets': [
            'pos_disable_orderline_delete/static/src/js/models.js',
            'pos_disable_orderline_delete/static/src/js/components.js',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
