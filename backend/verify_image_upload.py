import requests
import os

# Create a dummy image
with open("test_image.jpg", "wb") as f:
    f.write(os.urandom(1024))

url = "http://localhost:8000/cars/"
# We need a user (owner) first, or we can mock authentication if we disable it, 
# but the endpoint depends on get_db.
# Actually, the car creation endpoint requires 'owner_id'.
# And checking 'cars.py', it doesn't seem to enforce authentication on the endpoint level explicitly 
# (Depends(get_db) is there, but no get_current_user).
# Wait, let's check cars.py again.
# It receives owner_id as Form data.
# So I can just pass any integer.

data = {
    "brand": "TestBrand",
    "model": "TestModel",
    "year": 2023,
    "category": "SUV",
    "price_per_day": 100.0,
    "location": "TestCity",
    "owner_id": 1
}

files = {
    "image": ("test_image.jpg", open("test_image.jpg", "rb"), "image/jpeg")
}

try:
    print("Sending POST request to create car with image...")
    response = requests.post(url, data=data, files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")

    if response.status_code == 201:
        print("Car created successfully.")
        resp_json = response.json()
        image_url = resp_json.get("image_url")
        if image_url:
            print(f"Image URL: {image_url}")
            # Check if file exists in uploads
            # The URL is /uploads/filename
            filename = image_url.split("/")[-1]
            if os.path.exists(os.path.join("uploads", filename)):
                print("Image file verified on disk.")
            else:
                print("ERROR: Image file NOT found on disk.")
        else:
            print("ERROR: No image_url in response.")
    else:
        print("Failed to create car.")

except Exception as e:
    print(f"An error occurred: {e}")
finally:
    if os.path.exists("test_image.jpg"):
        os.remove("test_image.jpg")
