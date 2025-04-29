import json
import base64
import random
from datetime import datetime
import pytz

# Generate a simple float-based password
password = str(random.uniform(100000000, 999999999))
encoded = base64.b64encode(password.encode()).decode()

# Get current Pacific Time
pacific = pytz.timezone("US/Pacific")
current_time_pt = datetime.now(pacific).isoformat()

data = {
    "password": encoded,
    "generated_at": current_time_pt
}

with open("games/password.json", "w") as f:
    json.dump(data, f)
