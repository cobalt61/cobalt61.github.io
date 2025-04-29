import random
import json

random_password = round(random.uniform(1, 1_000_000_000), 6)

password_data = {
    "password": str(random_password)
}

with open("password.json", "w") as f:
    json.dump(password_data, f, indent=2)

print(f"Generated new password: {random_password}")
