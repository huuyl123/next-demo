import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập mật khẩu"),
    password: yup
        .string()
        .min(6, "Mật khẩu phải có từ 6 đến 20 ký tự")
        .max(20, "Mật khẩu phải có từ 6 đến 20 ký tự")
        .required("Vui lòng nhập mật khẩu"),
})

export const signupSchema = yup.object({
    email: yup
        .string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
    displayName: yup
        .string()
        .required("Vui lòng nhập username"),
    password: yup
        .string()
        .min(6, "Mật khẩu phải từ 6 đến 20 ký tự")
        .max(20, "Mật khẩu phải từ 6 đến 20 ký tự")
        .required("Vui lòng nhập mật khẩu"),
})