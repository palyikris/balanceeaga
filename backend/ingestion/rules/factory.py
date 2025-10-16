from ingestion.models import Rule
from ingestion.categories.factory import seed_demo_categories


def seed_demo_rules(user_id: str):
    """
    Create a realistic set of categorization rules based on
    common transaction patterns observed in Hungarian bank exports.
    """
    categories = seed_demo_categories(user_id)

    demo_rules = [
        # --- Income ---
        {
            "name": "Monthly salary",
            "match_type": "contains",
            "match_value": "fizetés",
            "cat": "Salary & Wages",
        },
        {
            "name": "Payroll or employer transfer",
            "match_type": "contains",
            "match_value": "bt.",
            "cat": "Salary & Wages",
        },
        {
            "name": "Revolut top-up or incoming",
            "match_type": "contains",
            "match_value": "revolut",
            "cat": "Transfers In",
        },
        {
            "name": "Wise incoming transfer",
            "match_type": "contains",
            "match_value": "wise",
            "cat": "Transfers In",
        },
        {
            "name": "Interest income",
            "match_type": "contains",
            "match_value": "kamat",
            "cat": "Investment Income",
        },
        # --- Groceries & Food ---
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
            "name": "McDonalds",
            "match_type": "contains",
            "match_value": "mcdonald",
            "cat": "Restaurants & Cafes",
        },
        {
            "name": "KFC",
            "match_type": "contains",
            "match_value": "kfc",
            "cat": "Restaurants & Cafes",
        },
        {
            "name": "Burger King",
            "match_type": "contains",
            "match_value": "burger king",
            "cat": "Restaurants & Cafes",
        },
        {
            "name": "Wolt food delivery",
            "match_type": "contains",
            "match_value": "wolt",
            "cat": "Restaurants & Cafes",
        },
        {
            "name": "Bolt Food delivery",
            "match_type": "contains",
            "match_value": "bolt food",
            "cat": "Restaurants & Cafes",
        },
        {
            "name": "Café",
            "match_type": "contains",
            "match_value": "café",
            "cat": "Restaurants & Cafes",
        },
        {
            "name": "Starbucks",
            "match_type": "contains",
            "match_value": "starbucks",
            "cat": "Restaurants & Cafes",
        },
        # --- Subscriptions & Entertainment ---
        {
            "name": "Netflix subscription",
            "match_type": "contains",
            "match_value": "netflix",
            "cat": "Online Subscriptions",
        },
        {
            "name": "Spotify",
            "match_type": "contains",
            "match_value": "spotify",
            "cat": "Online Subscriptions",
        },
        {
            "name": "YouTube Premium",
            "match_type": "contains",
            "match_value": "youtube",
            "cat": "Online Subscriptions",
        },
        {
            "name": "Apple services",
            "match_type": "contains",
            "match_value": "apple",
            "cat": "Online Subscriptions",
        },
        {
            "name": "Steam / PlayStation",
            "match_type": "contains",
            "match_value": "steam",
            "cat": "Entertainment",
        },
        {
            "name": "Cinema or tickets",
            "match_type": "contains",
            "match_value": "mozi",
            "cat": "Entertainment",
        },
        # --- Transport ---
        {
            "name": "Public transport BKK",
            "match_type": "contains",
            "match_value": "bkk",
            "cat": "Transport",
        },
        {
            "name": "Parking fees",
            "match_type": "contains",
            "match_value": "parkolás",
            "cat": "Transport",
        },
        {
            "name": "Fuel / MOL",
            "match_type": "contains",
            "match_value": "mol",
            "cat": "Transport",
        },
        {
            "name": "Bolt / Uber ride",
            "match_type": "contains",
            "match_value": "bolt",
            "cat": "Transport",
        },
        {
            "name": "Uber",
            "match_type": "contains",
            "match_value": "uber",
            "cat": "Transport",
        },
        # --- Shopping ---
        {
            "name": "Zara",
            "match_type": "contains",
            "match_value": "zara",
            "cat": "Shopping & Fashion",
        },
        {
            "name": "H&M",
            "match_type": "contains",
            "match_value": "h&m",
            "cat": "Shopping & Fashion",
        },
        {
            "name": "Decathlon",
            "match_type": "contains",
            "match_value": "decathlon",
            "cat": "Shopping & Fashion",
        },
        {
            "name": "Amazon",
            "match_type": "contains",
            "match_value": "amazon",
            "cat": "Shopping & Fashion",
        },
        {
            "name": "MediaMarkt",
            "match_type": "contains",
            "match_value": "mediamarkt",
            "cat": "Electronics",
        },
        {
            "name": "IKEA",
            "match_type": "contains",
            "match_value": "ikea",
            "cat": "Home & Utilities",
        },
        # --- Utilities & Services ---
        {
            "name": "E.ON",
            "match_type": "contains",
            "match_value": "e.on",
            "cat": "Home & Utilities",
        },
        {
            "name": "MVM",
            "match_type": "contains",
            "match_value": "mvm",
            "cat": "Home & Utilities",
        },
        {
            "name": "Telekom",
            "match_type": "contains",
            "match_value": "telekom",
            "cat": "Home & Utilities",
        },
        {
            "name": "Vodafone",
            "match_type": "contains",
            "match_value": "vodafone",
            "cat": "Home & Utilities",
        },
        {
            "name": "Insurance payment",
            "match_type": "contains",
            "match_value": "biztosító",
            "cat": "Insurance & Health",
        },
        {
            "name": "Pharmacy",
            "match_type": "contains",
            "match_value": "gyógyszertár",
            "cat": "Insurance & Health",
        },
        {
            "name": "Dentist or clinic",
            "match_type": "contains",
            "match_value": "klinika",
            "cat": "Insurance & Health",
        },
        # --- Housing ---
        {
            "name": "Rent payment",
            "match_type": "amount_range",
            "match_value": "-400000,-100000",
            "cat": "Housing & Rent",
        },
        {
            "name": "Maintenance fee",
            "match_type": "contains",
            "match_value": "közös költség",
            "cat": "Housing & Rent",
        },
        # --- Education & Books ---
        {
            "name": "University fee",
            "match_type": "contains",
            "match_value": "egyetem",
            "cat": "Education & Books",
        },
        {
            "name": "Books",
            "match_type": "contains",
            "match_value": "book",
            "cat": "Education & Books",
        },
        # --- Travel ---
        {
            "name": "Airline tickets",
            "match_type": "contains",
            "match_value": "ryanair",
            "cat": "Travel",
        },
        {
            "name": "Accommodation / Airbnb",
            "match_type": "contains",
            "match_value": "airbnb",
            "cat": "Travel",
        },
        {
            "name": "Booking.com",
            "match_type": "contains",
            "match_value": "booking.com",
            "cat": "Travel",
        },
        # --- Transfers / Savings ---
        {
            "name": "Savings account transfer",
            "match_type": "contains",
            "match_value": "megtakarítás",
            "cat": "Savings & Investments",
        },
        {
            "name": "Investment account transfer",
            "match_type": "contains",
            "match_value": "értékpapír",
            "cat": "Savings & Investments",
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
                "action_set_category": str(category_obj.id),
            },
        )
        if created_flag:
            created += 1

    return created
