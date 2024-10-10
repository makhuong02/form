import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";

function App() {
	const tru = ["Trụ 1", "Trụ 2", "Trụ 3", "Trụ 4"];

	const formik = useFormik({
		initialValues: {
			thoigian: "",
			soluong: 0,
			tru: "",
			doanhthu: 0,
			dongia: 19800,
		},
		validationSchema: Yup.object({
			thoigian: Yup.date().required("Vùi lòng chọn thời gian"),
			soluong: Yup.number()
				.positive("Vui lòng nhập số lượng hợp lệ")
				.required("Vui lòng nhập số lượng"),
			tru: Yup.string().required("Vui lòng chọn trụ"),
			doanhthu: Yup.number()
				.positive("Vui lòng nhập doanh thu hợp lệ")
				.required("Vui lòng nhập doanh thu"),
			dongia: Yup.number().required("Vui lòng nhập đơn giá"),
		}),
		onSubmit: (values) => {
			console.log("Form submitted: ", values);
			alert("Form submitted");
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		formik.handleChange(e);

		if (name === "soluong") {
			const newDoanhThu = Number(value) * formik.values.dongia;
			formik.setFieldValue("doanhthu", newDoanhThu);
		} else if (name === "doanhthu") {
			if (formik.values.dongia !== 0) {
				const newSoLuong = Number(value) / formik.values.dongia;
				formik.setFieldValue("soluong", newSoLuong);
			}
		} else if (name === "dongia") {
			const newDoanhThu = Number(value) * formik.values.soluong;
			formik.setFieldValue("doanhthu", newDoanhThu);
		}
	};

	return (
		<div className="App">
			<header className="header">
				<div className="header-left">
					<a href="/" class="back-link">
						← Đóng
					</a>
					<h2>Nhập giao dịch</h2>
				</div>
				<div className="header-right">
					<button type="submit" form="detail-form">
						Cập nhật
					</button>
				</div>
			</header>

			<form id="detail-form" onSubmit={formik.handleSubmit}>
				<div className="form-group">
					<label>Thời gian</label>
					<input
						type="datetime-local"
						name="thoigian"
						value={formik.values.thoigian}
						onChange={handleChange}
					/>
					{formik.errors.thoigian && formik.touched.thoigian && (
						<p>{formik.errors.thoigian}</p>
					)}
				</div>
				<div className="form-group">
					<label>Số lượng</label>
					<input
						type="number"
						name="soluong"
						value={formik.values.soluong}
						onChange={handleChange}
					/>
					{formik.errors.soluong && formik.touched.soluong && (
						<p>{formik.errors.soluong}</p>
					)}
				</div>
				<div className="form-group">
					<label>Trụ</label>
					<select name="tru" value={formik.values.tru} onChange={handleChange}>
						<option value="" disabled>
							Chọn một trụ
						</option>
						{tru.map((val, idx) => (
							<option key={idx} value={idx}>
								{val}
							</option>
						))}
					</select>
					{formik.errors.tru && formik.touched.tru && (
						<p>{formik.errors.tru}</p>
					)}
				</div>
				<div className="form-group">
					<label>Doanh thu</label>
					<input
						type="number"
						name="doanhthu"
						value={formik.values.doanhthu}
						onChange={handleChange}
					/>
					{formik.errors.doanhthu && formik.touched.doanhthu && (
						<p>{formik.errors.doanhthu}</p>
					)}
				</div>
				<div className="form-group">
					<label>Đơn giá</label>
					<input
						type="number"
						name="dongia"
						value={formik.values.dongia}
						onChange={handleChange}
					/>
					{formik.errors.dongia && formik.touched.dongia && (
						<p>{formik.errors.dongia}</p>
					)}
				</div>
			</form>
		</div>
	);
}

export default App;
