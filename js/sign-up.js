let inputEmail = document.getElementById("email");
let inputUserName = document.getElementById("username");
let inputPwd = document.getElementById("password");

let showPwdIcon = document.querySelector(".fa-eye");
// console.log(showPwdIcon);
let HidePwdIcon = document.querySelector(".fa-eye-slash");
// console.log(HidePwdIcon);

showPwdIcon.addEventListener("click", () => {
  showPwdIcon.style.display = "none";
  HidePwdIcon.style.display = "inline-block";
  inputPwd.type = "text";
});

HidePwdIcon.addEventListener("click", () => {
  HidePwdIcon.style.display = "none";
  showPwdIcon.style.display = "inline-block";
  inputPwd.type = "password";
});

let signUpBtn = document.querySelector("button.btn");
signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!validateSignUp(inputEmail.value, inputUserName.value, inputPwd.value)) {
    return;
  }

  let newUser = {
    usercode: `U${String(Date.now())}`,
    username: inputUserName.value,
    email: inputEmail.value,
    password: inputPwd.value,
    role: "user",
    birthday: "1989-10-02",
    status: "Active",
    description: "Let attack maybe event",
  };

  let listUser = JSON.parse(localStorage.getItem("userList")) || [];

  let isEmailExist = listUser.some((user) => {
    return user.email === inputEmail.value;
  });
  if (isEmailExist) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Email đã tồn tại!",
    });
    return;
  }

  listUser.push(newUser);

  localStorage.setItem("userList", JSON.stringify(listUser));

  Swal.fire({
    icon: "success",
    title: "Đăng ký thành công!",
    text: "Chúc mừng bạn đã tạo tài khoản thành công",
  }).then(() => {
    window.location.href = "./sign-in.html";
  });
});

function validateSignUp(email, userName, password) {
  if (email === "" && userName === "" && password === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Bạn phải nhập đầy đủ tất cả các trường!",
    });
    return false;
    // return undefined;
  }
  if (email === "" && userName === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Email và Username không được để trống!",
    });
    return false;
  }
  if (email === "" && password === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Email và Password không được để trống!",
    });
    return false;
  }
  if (userName === "" && password === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Username và Password không được để trống!",
    });
    return false;
  }
  if (email === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Email không được để trống!",
    });
    return false;
  }
  if (userName === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Username không được để trống!",
    });
    return false;
  }

  if (password === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Password không được để trống!",
    });
    return false;
  }

  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/gm;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Vui lòng nhập đúng định dạng cho email!",
    });
    return false;
  }

  if (password.length < 8) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Password phải từ 8 ký tự trở lên!",
    });
    return false;
  }

  let hasLetterPwd = /[a-zA-Z]/.test(password);
  let hasNumberPwd = /[0-9]/.test(password);

  if (!hasLetterPwd || !hasNumberPwd) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Password phải bao gồm chữ và số!",
    });
    return false;
  }

  let hasLowerCasePwd = /[a-z]/.test(password);
  let hasUpperCasePwd = /[A-Z]/.test(password);
  if (!(hasLowerCasePwd && hasUpperCasePwd)) {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Password phải bao gồm chữ thường và chữ hoa!",
    });
    return false;
  }

  return true;
}
