Here's a complete **API Documentation Guide** for your **Hotels API**, based on your current implementation.

---

## 🏨 Hotels API – Documentation

### 🌍 Base URL

```
http://localhost:5000/api/hotels
```

---

## 📘 Endpoints

### ✅ `GET /api/hotels`

**Description:**
Returns a list of hotels. You can filter results using optional `country` and `city` query parameters.

---

### 🔧 Query Parameters:

| Parameter | Type   | Required | Description              |
| --------- | ------ | -------- | ------------------------ |
| `country` | string | No       | Filter hotels by country |
| `city`    | string | No       | Filter hotels by city    |

---

### 🧪 Example Requests:

#### 1. Get **all hotels**:

```bash
curl http://localhost:5000/api/hotels
```

#### 2. Get hotels in **India**:

```bash
curl "http://localhost:5000/api/hotels?country=India"
```

#### 3. Get hotels in **Delhi, India**:

```bash
curl "http://localhost:5000/api/hotels?country=India&city=Delhi"
```

#### 4. Get hotels in **New York**:

```bash
curl "http://localhost:5000/api/hotels?city=New York"
```

> Tip: Wrap values with spaces (like `New York`) in quotes.

---

### 🔁 Sample JSON Response:

```json
[
  {
    "id": 1,
    "name": "Hotel Royal Palace",
    "location": {
      "country": "India",
      "city": "Delhi"
    },
    "price_per_night": 120.0,
    "rating": 4.3,
    "available_rooms": 10,
    "amenities": ["wifi", "air_conditioning", "restaurant"],
    "images": [
      "https://cdn.pixabay.com/photo/2016/11/18/17/29/reception-1836070_1280.jpg"
    ],
    "description": "A luxury hotel in the heart of Delhi."
  },
  ...
]
```

---

### ❌ Error Responses:

#### 🔹 500 – Internal Server Error

**Cause:** Server-side error (e.g., malformed data, logic bug)

```json
{
  "error": "Failed to fetch hotels"
}
```

---

## 🛠 Example Use Cases

### 🔎 Use Case: Search for hotels in **France**

```bash
curl "http://localhost:5000/api/hotels?country=France"
```

### 🔎 Use Case: Search for hotels in **Mumbai, India**

```bash
curl "http://localhost:5000/api/hotels?country=India&city=Mumbai"
```

---

## ✅ Future Enhancements (Optional)

You can add:

* `GET /api/hotels/:id` – Get single hotel by ID
* `POST /api/hotels` – Add new hotel
* `PUT /api/hotels/:id` – Update hotel
* `DELETE /api/hotels/:id` – Delete hotel
* Sorting and pagination (`?sort=price&limit=10`)

Let me know if you'd like to implement any of these — I can scaffold them for you.
