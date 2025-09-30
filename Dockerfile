# Bước 1: Sử dụng image Node.js để build ứng dụng
FROM node:18 as build

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package.json package-lock.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng
RUN npm run build

# Bước 2: Sử dụng một image n hỏ hơn để chạy ứng dụng đã được build
FROM nginx:stable-alpine

# Copy build output từ bước trước vào thư mục Nginx để phục vụ tĩnh
COPY --from=build /app/build /usr/share/nginx/html

# Expose cổng 80
EXPOSE 80

# Lệnh mặc định để khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
