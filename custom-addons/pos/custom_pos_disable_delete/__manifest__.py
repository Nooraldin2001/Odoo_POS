{
    'name': 'POS Restrict Delete',
    'version': '17.0.1.0.0',
    'depends': ['point_of_sale'],
    'category': 'Point of Sale',
    'summary': 'Restrict delete for Cashiers in POS',
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'views/pos_user_group.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
        'custom_pos_disable_delete/static/src/js/DisableDeleteOrder.js',
        ],
    },
    'installable': True,
    'application': False,
}
