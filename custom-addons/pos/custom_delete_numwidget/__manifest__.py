# Copyright (C) 2023-Today
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

{
    "name": "Point of Sale - Delete Numpad Control",
    "version": "16.0.1.0.0",
    "category": "Point Of Sale",
    "summary": "Point of Sale - Extra Access Right for Numpad Delete Button",
    "author": "Custom Development",
    "license": "AGPL-3",
    "depends": ["point_of_sale", "pos_access_right"],
    "data": [
        "security/res_groups.xml",
    ],
    "assets": {
        "point_of_sale.assets": [
            "custom_delete_numwidget/static/src/css/*",
            "custom_delete_numwidget/static/src/js/*.js",
            "custom_delete_numwidget/static/src/xml/*.xml",
        ]
    },
    "installable": True,
} 