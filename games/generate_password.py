import json
import random
import datetime

# Generate random password
password_data = {
    "password": random.uniform(1, 1_000_000_000),
    "generated_at": datetime.datetime.utcnow().isoformat()  # Timestamp to ensure change
}

# Save to the 'games' directory
with open("games/password.json", "w") as f:
    json.dump(password_data, f)
