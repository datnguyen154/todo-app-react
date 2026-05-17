# 📝 React Task Manager (Optimistic UI)

> Một ứng dụng quản lý công việc tối ưu hiệu năng, được xây dựng bằng ReactJS với trọng tâm là trải nghiệm người dùng (UX) thông qua kỹ thuật **Optimistic UI**.

🔴 **Live Demo:** [https://todo-app-react.vercel.app](https://todo-app-react-three-blush.vercel.app/)
## 💡 Về dự án này

Dự án này ban đầu được phát triển bằng Vanilla JavaScript (DOM thuần) và localStorage. Tuy nhiên, để đáp ứng tư duy quản lý State hiện đại và kiến trúc Client-Server, hệ thống đã được **refactor hoàn toàn sang ReactJS** và kết nối với RESTful API.

Điểm nhấn kỹ thuật của dự án là việc xử lý **Network Latency (Độ trễ mạng)**. Thay vì bắt người dùng phải chờ đợi server phản hồi sau mỗi thao tác (Thêm, Sửa, Xóa, Đánh dấu hoàn thành), ứng dụng áp dụng kỹ thuật **Optimistic UI** (Cập nhật giao diện lạc quan). Giao diện sẽ phản hồi tức thời (0ms delay) bằng cách cập nhật State nội bộ, trong khi các request API được gọi ngầm ở phía sau để đồng bộ dữ liệu với máy chủ.

## 🚀 Tính năng nổi bật

- **Optimistic UI CRUD:** Thêm, Đọc, Sửa, Xóa công việc mượt mà không có độ trễ tải trang.
- **RESTful API Integration:** Giao tiếp với backend thực tế thông qua các HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
- **State Management:** Quản lý luồng dữ liệu minh bạch và hiệu quả bằng React Hooks (`useState`, `useEffect`).
- **Clean UI/UX:** Giao diện tối giản, trực quan, hỗ trợ thao tác nhanh bằng phím `Enter`.

## 🛠️ Công nghệ sử dụng

- **Frontend:** ReactJS, Vite
- **Styling:** CSS thuần (Tách biệt rõ ràng Reset CSS và Component Styles)
- **Backend/Database:** MockAPI (RESTful)
- **Deployment & CI/CD:** Vercel


