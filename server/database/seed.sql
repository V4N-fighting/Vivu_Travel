-- 1. Xóa dữ liệu cũ nếu có
TRUNCATE TABLE users CASCADE;

-- 2. Thêm tài khoản mẫu
-- Mật khẩu đã băm (bcrypt) cho '123456' là: $2a$10$Xo8BvRkYvRkYvRkYvRkYveP6.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z
-- (Trong thực tế, NestJS sẽ tự băm mật khẩu khi đăng ký)

INSERT INTO users (first_name, last_name, email, password, role, is_active)
VALUES 
('Admin', 'Vivu', 'admin@vivutravel.com', '$2a$10$Xo8BvRkYvRkYvRkYvRkYveP6.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z', 'admin', true),
('Nguyen', 'Van A', 'customer@gmail.com', '$2a$10$Xo8BvRkYvRkYvRkYvRkYveP6.z.z.z.z.z.z.z.z.z.z.z.z.z.z.z', 'customer', true);

-- 3. Thêm một vài Quốc gia mẫu
INSERT INTO countries (name, description, image)
VALUES 
('Vietnam', 'The hidden charm of Southeast Asia', 'vietnam.jpg'),
('Japan', 'The land of the rising sun', 'japan.jpg');

-- 4. Thêm Tour Types mẫu
INSERT INTO tour_types (name, description)
VALUES 
('Adventure', 'Explore the wild world'),
('Relaxation', 'Luxury resorts and spa');
