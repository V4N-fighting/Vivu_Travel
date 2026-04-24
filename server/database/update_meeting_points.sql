-- Tạo bảng điểm hẹn
CREATE TABLE IF NOT EXISTS meeting_points (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thêm 3 điểm mặc định
INSERT INTO meeting_points (name) VALUES ('Thành Phố Hồ Chí Minh'), ('Đà Nẵng'), ('Hà Nội') 
ON CONFLICT DO NOTHING;

-- Thêm cột vào bảng tours nếu chưa có
ALTER TABLE tours ADD COLUMN IF NOT EXISTS meeting_point_id INT REFERENCES meeting_points(id);
