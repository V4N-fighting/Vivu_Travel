-- Hủy các bảng cũ nếu tồn tại (theo thứ tự ngược lại của khóa ngoại)
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS coupons;
DROP TABLE IF EXISTS banners;
DROP TABLE IF EXISTS blog_tag_map;
DROP TABLE IF EXISTS blog_tags;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS travelers;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS tour_images;
DROP TABLE IF EXISTS itinerary_details;
DROP TABLE IF EXISTS tour_itineraries;
DROP TABLE IF EXISTS tour_transportations;
DROP TABLE IF EXISTS tour_activities;
DROP TABLE IF EXISTS tour_departure_dates;
DROP TABLE IF EXISTS tours;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS tour_types;
DROP TABLE IF EXISTS country_languages;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS users;

-- 1. Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar VARCHAR(255),
    address TEXT,
    role VARCHAR(20) DEFAULT 'customer', -- customer / admin
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Countries
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Country Languages
CREATE TABLE country_languages (
    id SERIAL PRIMARY KEY,
    country_id INT REFERENCES countries(id) ON DELETE CASCADE,
    language VARCHAR(50) NOT NULL
);

-- 4. Tour Types
CREATE TABLE tour_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Activities
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Tours
CREATE TABLE tours (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    country_id INT REFERENCES countries(id) ON DELETE SET NULL,
    tour_type_id INT REFERENCES tour_types(id) ON DELETE SET NULL,
    duration VARCHAR(50) NOT NULL,
    max_people INT NOT NULL,
    price_adult DECIMAL(12, 2) NOT NULL,
    price_child DECIMAL(12, 2) NOT NULL,
    adventure_level VARCHAR(50),
    altitude VARCHAR(50),
    hotel_star INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tour Departure Dates
CREATE TABLE tour_departure_dates (
    id SERIAL PRIMARY KEY,
    tour_id INT REFERENCES tours(id) ON DELETE CASCADE,
    departure_date DATE NOT NULL,
    available_slots INT
);

-- 8. Tour Activities (N-N)
CREATE TABLE tour_activities (
    tour_id INT REFERENCES tours(id) ON DELETE CASCADE,
    activity_id INT REFERENCES activities(id) ON DELETE CASCADE,
    PRIMARY KEY (tour_id, activity_id)
);

-- 9. Tour Transportations
CREATE TABLE tour_transportations (
    id SERIAL PRIMARY KEY,
    tour_id INT REFERENCES tours(id) ON DELETE CASCADE,
    transportation VARCHAR(100) NOT NULL
);

-- 10. Tour Itineraries
CREATE TABLE tour_itineraries (
    id SERIAL PRIMARY KEY,
    tour_id INT REFERENCES tours(id) ON DELETE CASCADE,
    day_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT
);

-- 11. Itinerary Details
CREATE TABLE itinerary_details (
    id SERIAL PRIMARY KEY,
    itinerary_id INT REFERENCES tour_itineraries(id) ON DELETE CASCADE,
    activity_description TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

-- 12. Tour Images
CREATE TABLE tour_images (
    id SERIAL PRIMARY KEY,
    tour_id INT REFERENCES tours(id) ON DELETE CASCADE,
    image_url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0
);

-- 13. Bookings
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    booking_code VARCHAR(50) UNIQUE NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    tour_id INT REFERENCES tours(id) ON DELETE SET NULL,
    departure_date_id INT REFERENCES tour_departure_dates(id) ON DELETE SET NULL,
    adult_count INT NOT NULL,
    child_count INT NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending / confirmed / cancelled / completed
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 14. Travelers
CREATE TABLE travelers (
    id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(20),
    country VARCHAR(100),
    address TEXT,
    type VARCHAR(20) -- adult / child
);

-- 15. Payments
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    booking_id INT REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    method VARCHAR(50), -- cash / bank_transfer / momo / vnpay
    status VARCHAR(50) DEFAULT 'pending', -- pending / completed / failed / refunded
    transaction_id VARCHAR(150),
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 16. Reviews
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    tour_id INT REFERENCES tours(id) ON DELETE CASCADE,
    booking_id INT REFERENCES bookings(id) ON DELETE SET NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 17. Blogs
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    thumbnail VARCHAR(255),
    author_id INT REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'draft', -- draft / published
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 18. Blog Tags
CREATE TABLE blog_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- 19. Blog Tag Map (N-N)
CREATE TABLE blog_tag_map (
    blog_id INT REFERENCES blogs(id) ON DELETE CASCADE,
    tag_id INT REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_id, tag_id)
);

-- 20. Banners
CREATE TABLE banners (
    id SERIAL PRIMARY KEY,
    text_content TEXT,
    first_image VARCHAR(255) NOT NULL,
    second_image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 21. Coupons
CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL, -- percent / fixed
    discount_value DECIMAL(12, 2) NOT NULL,
    valid_from DATE,
    valid_to DATE,
    usage_limit INT,
    used_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 22. Contacts
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
