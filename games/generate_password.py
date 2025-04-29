import random
import json

password = str(random.randint(1, 999999999999))

data = {"password": password}

with open("games/password.json", "w") as f:
    json.dump(data, f)
