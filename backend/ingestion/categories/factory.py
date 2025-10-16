from ingestion.models import Category


def seed_demo_categories(user_id: str):
    """
    Create demo categories based on realistic personal finance data
    derived from actual transaction exports.
    """
    demo_categories = {
        # --- Income ---
        "Salary & Wages": "income",
        "Transfers In": "income",
        "Investment Income": "income",
        # --- Expenses ---
        "Groceries": "expense",
        "Restaurants & Cafes": "expense",
        "Online Subscriptions": "expense",
        "Entertainment": "expense",
        "Transport": "expense",
        "Shopping & Fashion": "expense",
        "Electronics": "expense",
        "Home & Utilities": "expense",
        "Insurance & Health": "expense",
        "Housing & Rent": "expense",
        "Education & Books": "expense",
        "Travel": "expense",
        "Other Expenses": "expense",
        # --- Transfers ---
        "Transfers Out": "transfer",
        "Savings & Investments": "transfer",
    }

    created_map = {}
    for name, ctype in demo_categories.items():
        category, _ = Category.objects.get_or_create(
            user_id=user_id,
            name=name,
            defaults={"type": ctype},
        )
        created_map[name] = category

    return created_map
