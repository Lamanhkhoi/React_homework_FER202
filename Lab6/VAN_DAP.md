# Lab 6 - Tài liệu ôn vấn đáp

Cách dùng: đọc phần 1 và 2 cho thuộc, rồi mở từng file code ra, tự giải thích to thành tiếng theo phần 3. Phần 4 là lý thuyết thầy hay hỏi xoáy. Phần 5 là chỗ phải nói thật.

---

## 1. Bài này làm gì (nói trong 30 giây)

"Em làm web quản lý hoa lan bằng React + Vite. Dữ liệu không hardcode mà lấy từ RESTful API trên mockapi.io, em gọi API bằng axios.
Khách vào trang chủ xem danh sách, tìm theo tên, bấm Detail xem chi tiết.
Admin đăng nhập ở /login thì vào được /admin để Thêm, Sửa, Xoá. Form dùng Formik và kiểm tra bằng Yup.
Có xử lý loading, lỗi, và thông báo kết quả sau mỗi thao tác. Sau mỗi thao tác danh sách tự tải lại."

## 2. Danh sách kỹ thuật (thầy hỏi "dùng những kỹ thuật gì" thì đọc theo thứ tự này)

| Kỹ thuật | Dùng ở đâu |
|---|---|
| Functional component + Hooks (`useState`, `useEffect`, `useContext`, `useParams`, `useNavigate`) | toàn bộ |
| axios gọi REST API (GET, POST, PUT, DELETE) | `src/api/orchidApi.js`, `authApi.js` |
| Promise: `.then().catch().finally()` | các page |
| React Router (route, route động `/orchids/:id`, `Navigate`) | `App.jsx`, `Detail.jsx`, `ProtectedRoute.jsx` |
| Context API (lưu admin đăng nhập) | `AuthContext.js`, `AuthProvider.jsx`, `useAuth.js` |
| localStorage (reload không mất đăng nhập) | `AuthProvider.jsx` |
| Formik + Yup | `OrchidForm.jsx`, `Login.jsx` |
| React-Bootstrap (Card, Modal, Table, Alert, Spinner) | các page |
| Props, render danh sách bằng `map` + `key` | `Home.jsx`, `OrchidCard.jsx` |
| Loading, error, feedback | `StatusMessage.jsx`, Alert trong AdminDashboard |

---

## 3. Từng chức năng: file nào, khái niệm gì, thầy hỏi gì, trả lời sao

### 3.1 Lớp API (`src/api/orchidApi.js`)

Code lõi:
    export function getOrchids() {
      return axios.get(ORCHIDS_URL).then((response) => response.data)
    }

- Vì sao tách ra `api/`? Để page không gọi axios trực tiếp. Muốn đổi URL hay đổi thư viện thì chỉ sửa một chỗ. Đây là yêu cầu của khung bài.
- `response.data` là gì? axios bọc kết quả vào object `response`. Phần JSON server trả về nằm ở `response.data`. Với fetch thì phải gọi thêm `response.json()`.
- 4 hàm tương ứng 4 verb REST:
  - GET `/orchids` lấy danh sách.
  - GET `/orchids/3` lấy một cái.
  - POST `/orchids` thêm mới (body là object).
  - PUT `/orchids/3` sửa cả bản ghi.
  - DELETE `/orchids/3` xoá.
- axios khác fetch ở đâu? Em phải nói được 3 ý:
  1. axios tự ném lỗi khi status không phải 2xx (404, 500). fetch chỉ ném lỗi khi mất mạng, nên phải tự check `response.ok` (ở EX_9 em đã viết `if(!response.ok) throw new Error(...)`).
  2. axios tự chuyển object thành JSON và tự đặt header `Content-Type: application/json`. fetch phải `JSON.stringify` và tự đặt header.
  3. axios trả dữ liệu ở `response.data`, fetch phải `.json()`.

### 3.2 Trang Home: lấy dữ liệu + tìm kiếm (`pages/Home.jsx`)

Câu hỏi hay gặp: "Giải thích `useEffect` ở đây."

    useEffect(() => {
      getOrchids().then(setOrchids).catch(...).finally(() => setLoading(false))
    }, [])

- Mảng `[]` rỗng nghĩa là chỉ chạy 1 lần sau lần render đầu tiên (mount). Nếu quên `[]` thì mỗi lần setState gây render lại, effect lại gọi API, rồi lại setState... thành vòng lặp vô hạn.
- Vì sao có 3 state `orchids`, `loading`, `error`? Vì gọi API là bất đồng bộ: lúc chờ thì hiện spinner, thất bại thì hiện lỗi, thành công thì hiện danh sách.
- `.finally()` chạy dù thành công hay lỗi, nên tắt loading ở đó để khỏi viết 2 lần.
- Search làm thế nào? Em lọc ngay trên client:
      const filteredOrchids = orchids.filter(o => o.name.toLowerCase().includes(keyword.toLowerCase()))
  Đây là dữ liệu suy ra (derived data), không lưu vào state riêng, vì tính lại được mỗi lần render từ `orchids` và `keyword`.
- Vì sao không search bằng API `?name=`? Mockapi trả 404 chứ không trả `[]` khi không có kết quả, và nó tìm kiểu "chứa". Lọc ở client đơn giản và an toàn hơn.
- Ví dụ chạy: có 3 hoa [Phalaenopsis, Dendrobium, Cattleya]. Gõ "den" thì filter giữ lại 1 hoa là Dendrobium. Xoá ô tìm kiếm (keyword = "") thì `includes("")` luôn đúng nên hiện đủ 3.
- `key={orchid.id}` để làm gì? Để React nhận biết phần tử nào là phần tử nào khi danh sách đổi, nên chỉ cập nhật đúng chỗ thay đổi. Phải là giá trị duy nhất và ổn định. Dùng `id` chứ không dùng index.
- Controlled input: ô search có `value={keyword}` và `onChange` cập nhật state, nên React là nguồn sự thật duy nhất của giá trị ô nhập.

### 3.3 Trang Detail (`pages/Detail.jsx`)

- `useParams()` lấy `id` từ URL. Route khai báo `path="/orchids/:id"` trong `App.jsx`.
- `useEffect(..., [id])`: id đổi thì gọi lại API.
- Id không tồn tại thì sao? Mockapi trả 404, axios ném lỗi, em kiểm tra `err.response.status === 404` để báo "not found" thân thiện. Các lỗi khác (mất mạng) thì hiện `err.message`. `err.response` chỉ có khi server có trả lời, mất mạng thì nó không tồn tại, nên em kiểm tra `err.response &&` trước.
- Lỗi em từng gặp: vào `/orchids/undefined` vì mockapi thiếu field `id` trong schema, nên `orchid.id` là `undefined`. Sửa bằng cách thêm field `id` vào resource. Đây là chuyện kể được để chứng minh em tự debug.

### 3.4 Đăng nhập admin (`pages/Login.jsx`, `api/authApi.js`)

Luồng: nhập form, Yup kiểm tra, `loginAdmin` gọi GET `/accounts`, tìm tài khoản khớp, `login(account)` lưu vào Context + localStorage, rồi `navigate('/admin')`.

- Vì sao GET hết `/accounts` rồi `find`? Mockapi không có API đăng nhập thật. Em lấy danh sách rồi so sánh `username`, `password` và `role === 'admin'` bằng `===`.
- `find` trả gì? Phần tử đầu tiên thoả điều kiện, không có thì `undefined`. Em kiểm tra `if (!account) throw new Error(...)`, lỗi này rơi xuống `.catch` và hiện lên Alert.
- Câu hỏi bẫy: "Có an toàn không?" Trả lời thật: Không. Mật khẩu để dạng plain text và so sánh ở client, ai mở DevTools Network cũng thấy toàn bộ accounts. Làm vậy chỉ vì đây là bài lab dùng mock API. Thực tế phải đăng nhập ở server, mật khẩu băm (bcrypt), server cấp token (JWT). (Chi tiết ở phần 5.)

### 3.5 Context + bảo vệ route

- Vì sao dùng Context? Cả Navbar, Login và ProtectedRoute đều cần biết ai đang đăng nhập. Nếu truyền props qua nhiều tầng thì rối (prop drilling), Context cho component nào cần thì tự lấy bằng `useContext`.
- `AuthProvider` giữ `user` trong state, cung cấp `user`, `login`, `logout`. `useAuth()` là hook bọc `useContext(AuthContext)` cho gọn.
- localStorage để làm gì? State mất khi reload trang. Em ghi `{username, role}` vào localStorage rồi khi khởi tạo state thì đọc lại. Em cố ý không lưu password. Khởi tạo bằng hàm `useState(() => ...)` để chỉ đọc localStorage 1 lần.
- `ProtectedRoute`: nếu không có `user` hoặc `role !== 'admin'` thì `<Navigate to="/login" replace />`. `replace` để nút Back không quay lại trang bị chặn. Em đã test: gõ `/admin` khi chưa đăng nhập thì bị đẩy sang `/login`.
- Bẫy: "Chặn bằng ProtectedRoute là đủ bảo mật chưa?" Chưa. Nó chỉ ẩn giao diện, ai gọi thẳng API vẫn thêm/xoá được. Bảo mật thật phải ở server.

### 3.6 AdminDashboard: CRUD + đồng bộ giao diện (`pages/AdminDashboard.jsx`)

Đây là file thầy hay hỏi xoáy nhất. Phải giải thích được 5 state:
- `orchids`, `loading`, `error`: giống Home.
- `reload`: một con số. Mỗi lần thêm/sửa/xoá thành công thì tăng lên 1 (`setReload(n => n + 1)`). Vì `reload` nằm trong mảng phụ thuộc của `useEffect`, nó đổi thì effect chạy lại, nghĩa là tải lại danh sách từ API. Đây chính là "đồng bộ UI với API sau CRUD".
- `editingOrchid`: `null` nghĩa là đang Add, có object nghĩa là đang Edit. Một modal và một form dùng chung cho cả hai.
- `deletingOrchid`: bản ghi đang chờ xác nhận xoá (`null` thì modal ẩn).
- `message`: `{type, text}` cho Alert thành công hoặc thất bại.

Ví dụ chạy khi xoá "Vanda Blue" (id 10), từng bước:
1. Bấm Delete, `setDeletingOrchid(orchid)` thì modal mở (vì `show={deletingOrchid !== null}`).
2. Bấm xác nhận, `deleteOrchid(10)` gửi `DELETE /orchids/10`.
3. Thành công thì `setMessage(success)` và `setReload(0 -> 1)`.
4. `reload` đổi thì effect chạy lại, gửi `GET /orchids`, `setOrchids` thì bảng chỉ còn 9 dòng.
5. `.finally` đặt `deletingOrchid` về `null` nên modal đóng.
(Em đã kiểm chứng ở log server: DELETE rồi GET.)

Vì sao refetch thay vì tự sửa state? Đơn giản và chắc chắn: dữ liệu hiển thị luôn đúng với server (kể cả id server sinh ra khi POST). Nhược điểm là thêm một request. Cách khác là tự cập nhật state bằng `filter`/`map`, nhanh hơn nhưng phải tự giữ đồng bộ.

Submit form: `handleSubmit` trả về promise (`return request.then(...)`). Vì sao `return`? Để Formik biết khi nào gửi xong mà tắt `isSubmitting`, nút Save mới mở khoá lại.

Sửa là PUT hay PATCH? PUT thay cả bản ghi (em dùng PUT vì form có đủ mọi field). PATCH chỉ sửa một phần.

Vì sao `initialValues={editingOrchid}`? Form Edit hiện sẵn dữ liệu cũ. `enableReinitialize` cho Formik cập nhật lại giá trị khi `initialValues` đổi.

### 3.7 Formik + Yup (`components/OrchidForm.jsx`)

- Formik quản lý: values, errors, touched, submit. Nếu không có Formik thì mỗi ô phải tự viết `useState` + `onChange`.
- Yup mô tả luật kiểm tra dưới dạng schema. Formik chạy schema khi nhập và khi submit. Có lỗi thì không gọi `onSubmit`.
- `<Field name="rating" type="number">`: với `type="number"` Formik đổi chuỗi thành số. `type="checkbox"` thì giá trị là boolean (`isSpecial`, `isNatural`).
- `<ErrorMessage name="...">` hiện lỗi của đúng field đó.
- Luật Yup em viết: `name` bắt buộc và tối thiểu 2 ký tự, `rating` là số từ 1 đến 5, `image` phải là URL hợp lệ, các field còn lại bắt buộc.
- Ví dụ: nhập rating = 7 thì Yup trả "Rating must be from 1 to 5", Formik không gọi `onSubmit`, nên không có request nào gửi đi.
- Một form dùng cho cả Add lẫn Edit: nhận `initialValues`, `onSubmit`, `submitLabel` qua props.

### 3.8 Loading, lỗi, phản hồi (`components/StatusMessage.jsx`)

Một component chung: `loading` thì Spinner, `error` thì Alert đỏ, còn lại hiện `children`. Dùng ở Home, Detail, Admin để khỏi lặp code. Đây là kỹ thuật `children` prop (composition).

---

## 4. Lý thuyết chung (hay bị hỏi xoáy)

1. REST API là gì? Kiểu thiết kế API theo tài nguyên (URL là danh từ như `/orchids`) và dùng verb HTTP để thao tác. Dữ liệu thường là JSON, server không lưu trạng thái phiên (stateless).
2. HTTP status: 200 OK, 201 Created (POST thành công), 404 Not Found, 500 lỗi server.
3. Đồng bộ vs bất đồng bộ: gọi API mất thời gian nên JavaScript không đứng chờ mà đăng ký việc "khi xong thì làm" (callback/Promise).
4. Promise có 3 trạng thái: pending, fulfilled, rejected. `.then` nhận kết quả khi fulfilled, `.catch` khi rejected, `.finally` luôn chạy.
5. Vòng đời `useEffect`: chạy sau khi render xong (side effect như gọi API). Mảng phụ thuộc: `[]` chạy 1 lần, `[x]` chạy khi x đổi, không có mảng thì chạy sau mọi lần render.
6. Vì sao không gọi API thẳng trong thân component? Vì thân component chạy lại mỗi lần render, sẽ gọi API vô tận.
7. React StrictMode ở dev chạy effect 2 lần để phát hiện lỗi. Em thấy 2 request GET lúc dev là bình thường, bản build thì chỉ 1 lần.
8. State vs props: state là dữ liệu component tự giữ và đổi được, props là dữ liệu cha truyền xuống, chỉ đọc.
9. Vì sao không sửa state trực tiếp? React so sánh tham chiếu, sửa tại chỗ thì React không thấy thay đổi nên không render lại. Phải tạo bản sao mới (`[...arr, x]`, `{...obj, k: v}`, `map`/`filter`).
10. CORS: trình duyệt chặn web ở origin này gọi sang origin khác, trừ khi server cho phép bằng header. Mockapi đã bật CORS nên gọi được từ `localhost`.
11. Controlled vs uncontrolled input: controlled thì giá trị nằm trong state React (`value` + `onChange`). Formik thực chất là controlled.
12. Authentication (xác thực: bạn là ai) khác authorization (phân quyền: bạn được làm gì). Bài này: login là authentication, `role === 'admin'` là authorization.
13. Vì sao dùng `async/await` vs `.then`? Hai cách viết khác nhau của cùng một thứ (Promise). Bài này em dùng `.then` cho giống EX_9.

---

## 5. Những điều phải nói thật

- Em có dùng AI hỗ trợ viết khung code và em đã đọc lại, test từng chức năng. Thầy hỏi dòng nào em phải giải thích được dòng đó. Đừng nhận mình tự gõ hết nếu không phải.
- Login ở client chỉ phù hợp bài lab (xem 3.4).
- Search lọc ở client nên chỉ hợp khi dữ liệu ít. Dữ liệu lớn thì phải lọc/phân trang ở server.
- Chưa làm: phân trang, upload ảnh thật (chỉ nhập URL), chống double-submit ở nút Delete.

---

## 6. Kế hoạch học (khoảng 3 buổi)

1. Buổi 1: học thuộc phần 1 và 2. Chạy app, bấm hết chức năng, mở tab Network trong DevTools xem từng request (GET/POST/PUT/DELETE, status, response).
2. Buổi 2: mở từng file theo phần 3, tự đọc to và giải thích. Sau đó thử tự viết lại `getOrchids` và `useEffect` của Home từ trang trắng.
3. Buổi 3: học phần 4, rồi nhờ trợ lý đóng vai thầy hỏi xoáy từng file để luyện.

## 7. Bài tập thử lòng (thầy hay yêu cầu sửa code ngay tại chỗ)

- Đổi tìm kiếm sang tìm theo `category` hay `origin`.
- Thêm nút sắp xếp theo rating.
- Hiện thêm field `color` ở bảng Admin.
- Đổi rating tối đa từ 5 thành 10.
- Nếu bỏ `[]` ở `useEffect` của Home thì chuyện gì xảy ra? (gọi API vô tận)
- Nếu bỏ `key` thì sao? (React cảnh báo, cập nhật danh sách dễ sai)
- Nếu bỏ `return` ở `handleSubmit` thì sao? (nút Save không tự mở lại đúng lúc)
