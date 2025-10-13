# backend/rules/factories.py
from ingestion.models import Rule, RuleMatchType
from ingestion.categories.factory import seed_demo_categories


def seed_demo_rules(user_id: str):
    """
    Create a large, realistic set of categorization rules for the demo user.
    Each rule has a priority (lower = higher priority).
    Links rules to real Category UUIDs.
    """
    # ensure categories exist
    categories = seed_demo_categories(user_id)

    demo_rules = [
        # --- Food & Groceries ---
        {
            "name": "Lidl groceries",
            "match_type": "contains",
            "match_value": "lidl",
            "cat": "Groceries",
        },
        {
            "name": "Aldi groceries",
            "match_type": "contains",
            "match_value": "aldi",
            "cat": "Groceries",
        },
        {
            "name": "Spar groceries",
            "match_type": "contains",
            "match_value": "spar",
            "cat": "Groceries",
        },
        {
            "name": "Tesco groceries",
            "match_type": "contains",
            "match_value": "tesco",
            "cat": "Groceries",
        },
        {
            "name": "Penny groceries",
            "match_type": "contains",
            "match_value": "penny",
            "cat": "Groceries",
        },
        {
            "name": "McDonalds fast food",
            "match_type": "contains",
            "match_value": "mcdonald",
            "cat": "Food & Drinks",
        },
        {
            "name": "KFC fast food",
            "match_type": "contains",
            "match_value": "kfc",
            "cat": "Food & Drinks",
        },
        {
            "name": "Burger King fast food",
            "match_type": "contains",
            "match_value": "burger king",
            "cat": "Food & Drinks",
        },
        {
            "name": "Cafe / coffee",
            "match_type": "contains",
            "match_value": "café",
            "cat": "Food & Drinks",
        },
        {
            "name": "Starbucks coffee",
            "match_type": "contains",
            "match_value": "starbucks",
            "cat": "Food & Drinks",
        },
        {
            "name": "Pizza place",
            "match_type": "contains",
            "match_value": "pizza",
            "cat": "Food & Drinks",
        },
        {
            "name": "Wolt food delivery",
            "match_type": "contains",
            "match_value": "wolt",
            "cat": "Food & Drinks",
        },
        {
            "name": "Bolt Food delivery",
            "match_type": "contains",
            "match_value": "bolt food",
            "cat": "Food & Drinks",
        },
        # --- Entertainment ---
        {
            "name": "Spotify",
            "match_type": "contains",
            "match_value": "spotify",
            "cat": "Entertainment",
        },
        {
            "name": "Netflix",
            "match_type": "contains",
            "match_value": "netflix",
            "cat": "Entertainment",
        },
        {
            "name": "YouTube Premium",
            "match_type": "contains",
            "match_value": "youtube",
            "cat": "Entertainment",
        },
        {
            "name": "Steam",
            "match_type": "contains",
            "match_value": "steam",
            "cat": "Entertainment",
        },
        {
            "name": "PlayStation",
            "match_type": "contains",
            "match_value": "playstation",
            "cat": "Entertainment",
        },
        {
            "name": "Cinema",
            "match_type": "contains",
            "match_value": "cinema",
            "cat": "Entertainment",
        },
        {
            "name": "Ticket purchase",
            "match_type": "contains",
            "match_value": "ticket",
            "cat": "Entertainment",
        },
        # --- Transport ---
        {
            "name": "Uber",
            "match_type": "contains",
            "match_value": "uber",
            "cat": "Transport",
        },
        {
            "name": "Bolt taxi",
            "match_type": "contains",
            "match_value": "bolt",
            "cat": "Transport",
        },
        {
            "name": "Parking",
            "match_type": "contains",
            "match_value": "parking",
            "cat": "Transport",
        },
        {
            "name": "Fuel",
            "match_type": "contains",
            "match_value": "mol",
            "cat": "Transport",
        },
        # --- Shopping ---
        {
            "name": "Amazon",
            "match_type": "contains",
            "match_value": "amazon",
            "cat": "Shopping",
        },
        {
            "name": "eBay",
            "match_type": "contains",
            "match_value": "ebay",
            "cat": "Shopping",
        },
        {
            "name": "H&M",
            "match_type": "contains",
            "match_value": "h&m",
            "cat": "Shopping",
        },
        {
            "name": "Zara",
            "match_type": "contains",
            "match_value": "zara",
            "cat": "Shopping",
        },
        {
            "name": "IKEA",
            "match_type": "contains",
            "match_value": "ikea",
            "cat": "Home & Living",
        },
        # --- Utilities ---
        {
            "name": "E.ON utilities",
            "match_type": "contains",
            "match_value": "e.on",
            "cat": "Utilities",
        },
        {
            "name": "Telekom phone",
            "match_type": "contains",
            "match_value": "telekom",
            "cat": "Utilities",
        },
        {
            "name": "Vodafone phone",
            "match_type": "contains",
            "match_value": "vodafone",
            "cat": "Utilities",
        },
        {
            "name": "Insurance",
            "match_type": "contains",
            "match_value": "biztosító",
            "cat": "Utilities",
        },
        # --- Income ---
        {
            "name": "Salary",
            "match_type": "contains",
            "match_value": "fizetés",
            "cat": "Income",
        },
        {
            "name": "Revolut transfer",
            "match_type": "contains",
            "match_value": "revolut",
            "cat": "Income",
        },
        {
            "name": "Interest",
            "match_type": "contains",
            "match_value": "interest",
            "cat": "Income",
        },
        # --- General / Misc ---
        {
            "name": "Rent",
            "match_type": "amount_range",
            "match_value": "-999999,-10000",
            "cat": "Housing",
        },
        {
            "name": "Gym",
            "match_type": "contains",
            "match_value": "gym",
            "cat": "Health",
        },
        {
            "name": "Pharmacy",
            "match_type": "contains",
            "match_value": "gyógyszertár",
            "cat": "Health",
        },
        {
            "name": "Books",
            "match_type": "contains",
            "match_value": "book",
            "cat": "Education",
        },
    ]

    created = 0
    for idx, rule_data in enumerate(demo_rules, start=1):
        category_obj = categories[rule_data["cat"]]
        _, created_flag = Rule.objects.get_or_create(
            user_id=user_id,
            name=rule_data["name"],
            defaults={
                "priority": idx,
                "enabled": True,
                "match_type": rule_data["match_type"],
                "match_value": rule_data["match_value"],
                "action_set_category": str(category_obj.id),  # UUID link
            },
        )
        if created_flag:
            created += 1

    return created
