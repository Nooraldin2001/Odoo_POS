{
    'name': 'POS Restrict Delete',
    'version': '17.0.1.0.0',
    'depends': ['point_of_sale'],
    'category': 'Point of Sale',
    'summary': 'Restrict delete for Cashiers in POS',
    'author': 'Custom',
    'license': 'LGPL-3',
    'description': """
        This module disables the delete (⌫) button in POS for cashiers.
        Managers and administrators can still use the delete button.
    """,
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'views/pos_config_views.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'custom_pos_disable_delete/static/src/css/pos_disable_delete.css',
            'custom_pos_disable_delete/static/src/js/models.js',
            'custom_pos_disable_delete/static/src/js/disable_delete_button.js',
        ],
    },
    'post_init_hook': 'post_init_hook',
    'installable': True,
    'application': False,
}