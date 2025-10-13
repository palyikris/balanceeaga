from ingestion.models import Category


def seed_demo_categories(user_id: str):
    """
    Create demo categories grouped by type (income / expense / transfer).
    Returns a dict: { 'Groceries': Category instance, ... }
    """
    demo_categories = {
        # --- Income ---
        "Income": "income",
        # --- Expenses ---
        "Groceries": "expense",
        "Food & Drinks": "expense",
        "Entertainment": "expense",
        "Transport": "expense",
        "Shopping": "expense",
        "Electronics": "expense",
        "Home & Living": "expense",
        "Utilities": "expense",
        "Housing": "expense",
        "Health": "expense",
        "Education": "expense",
        # --- Transfer type ---
        "Transfer": "transfer",
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
