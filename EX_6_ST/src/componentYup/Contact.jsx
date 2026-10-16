// [LỖI 1] Thiếu import: Yup và toàn bộ component MUI chưa được import -> "not defined".
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

// [LỖI 2] useFormik và <form> nằm ngoài component. Hook chỉ được gọi BÊN TRONG component
// -> bọc tất cả vào function Contact() và return <form>.
export default function Contact() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      program: 0,
      message: '',
      agree: false,
    },
    // [LỖI 3] onSubmit đang rỗng -> submit xong không có gì xảy ra. Theo PDF: alert JSON.
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required.').min(2, 'Must be 2 characters or more'),
      email: Yup.string().required('Required.').email('Invalid email'),
      // [LỖI 4] Phone ban đầu là "" -> Yup.number() ép thành NaN -> luôn báo typeError, không submit được.
      // Thêm transform: chuỗi rỗng coi như undefined (cho phép bỏ trống).
      phone: Yup.number()
        .transform((value, original) => (original === '' ? undefined : value))
        .integer()
        .typeError('Please enter a valid number'),
      // [LỖI 5] program mặc định là 0 ("Please select") nhưng vẫn hợp lệ -> thêm min(1) để bắt buộc chọn.
      program: Yup.number()
        .integer()
        .min(1, 'Please select a program.')
        .typeError('Please select a program.'),
      message: Yup.string().required('Required.').min(10, 'Must be 10 characters or more'),
      agree: Yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
    }),
  });

  // UI: chỉ hiện lỗi khi người dùng đã rời khỏi ô (touched) hoặc bấm Send, tránh cả form đỏ ngay từ đầu.
  const error = (key) =>
    formik.touched[key] && formik.errors[key] && (
      <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5, ml: 0.5 }}>
        {formik.errors[key]}
      </Typography>
    );

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
        columnGap: { md: 10 },
        rowGap: 5,
        maxWidth: 1120,
        mx: 'auto',
        px: { xs: 2, md: 4 },
        py: { xs: 5, md: 8 },
      }}
    >
      <Box>
        <Typography
          component="h1"
          sx={{ fontSize: { xs: 36, md: 52 }, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}
        >
          Talk to admissions.
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 2.5, maxWidth: '38ch', lineHeight: 1.6 }}>
          Tell us which program interests you and we will reply within two business days.
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          boxShadow: '0 24px 48px -24px rgba(120, 53, 15, 0.18)',
        }}
      >
        {/* [LỖI 6] Gõ sai "hadleSubmit" -> phải là "handleSubmit". */}
        <form onSubmit={formik.handleSubmit} noValidate>
          <Stack spacing={2.5}>
            {/* getFieldProps('x') = name + value + onChange + onBlur, thay cho 3 dòng viết tay. */}
            <Box>
              <TextField fullWidth label="Name" {...formik.getFieldProps('name')} />
              {error('name')}
            </Box>

            <Box>
              <TextField fullWidth label="Email" {...formik.getFieldProps('email')} />
              {error('email')}
            </Box>

            <Box>
              {/* [LỖI 7] name="Phone" viết hoa -> không khớp key "phone" trong formik, gõ vào không cập nhật. */}
              <TextField fullWidth label="Phone" {...formik.getFieldProps('phone')} />
              {error('phone')}
            </Box>

            <Box>
              <FormControl fullWidth>
                <InputLabel id="program-label">Program of Study</InputLabel>
                {/* [LỖI 8] Gõ sai chính tả "Stydy" -> "Study". */}
                <Select
                  labelId="program-label"
                  id="program-select"
                  label="Program of Study"
                  {...formik.getFieldProps('program')}
                >
                  <MenuItem value={0}>
                    <em>Please select</em>
                  </MenuItem>
                  <MenuItem value={1}>Software Engineering</MenuItem>
                  <MenuItem value={2}>Information System</MenuItem>
                  <MenuItem value={3}>Information Assurance</MenuItem>
                  <MenuItem value={4}>Internet of Things</MenuItem>
                  <MenuItem value={5}>Artificial Intelligence</MenuItem>
                  <MenuItem value={6}>Digital Art & Design</MenuItem>
                </Select>
              </FormControl>
              {/* [LỖI 9] Typography báo lỗi của program đang nằm TRONG <Select> (bị coi là option) -> đưa ra ngoài. */}
              {error('program')}
            </Box>

            <Box>
              <TextField
                fullWidth
                multiline
                rows={4}
                id="message"
                label="Message"
                {...formik.getFieldProps('message')}
              />
              {error('message')}
            </Box>

            <Box>
              {/* [LỖI 10] Switch "agree" bị khai báo 2 lần -> xóa 1 cái.
                  [LỖI 11] Switch là checkbox: phải dùng checked + onChange (không phải value + onClick),
                  và name/checked đặt trên chính <Switch>, nếu không Formik không đọc được true/false. */}
              <FormControlLabel
                control={
                  <Switch {...formik.getFieldProps({ name: 'agree', type: 'checkbox' })} />
                }
                label="Agree to terms and conditions."
              />
              {error('agree')}
            </Box>

            {/* [LỖI 12] Thiếu variant/fullWidth nên nút không có nền như hình mẫu trong PDF. */}
            <Button type="submit" variant="contained" size="large" fullWidth sx={{ py: 1.5 }}>
              Send
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
