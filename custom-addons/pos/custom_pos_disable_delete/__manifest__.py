{
    'name': 'POS Restrict Delete',
    'version': '17.0.1.0.0',
    'depends': ['point_of_sale'],
    'category': 'Point of Sale',
    'summary': 'Restrict delete for Cashiers in POS',
    'data': [
        'security/security.xml',
        'views/pos_user_groups.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'custom_pos_restrict_delete/static/src/js/DisableDeleteOrder.js',
        ],
    },
    'installable': True,
    'application': False,
}
