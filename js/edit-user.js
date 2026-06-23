let editingUserId = localStorage.getItem("editingUserId");

let listUser = JSON.parse(localStorage.getItem("userList")) || [];

let backBtn = document.querySelector(".back-btn");

let hidePwd = document.querySelector(".fa-eye");
let showPwd = document.querySelector(".fa-eye-slash");

let saveBtn = document.querySelector(".save-btn");

hidePwd.addEventListener("click", () => {
  pwd.type = "text";
  showPwd.style.display = "inline-block";
  hidePwd.style.display = "none";
});

showPwd.addEventListener("click", () => {
  pwd.type = "password";
  hidePwd.style.display = "inline-block";
  showPwd.style.display = "none";
});

let editingUser = listUser.find((user) => {
  return String(user.usercode) === editingUserId;
});

let index = listUser.findIndex((user) => {
  return String(user.usercode) === editingUser.usercode;
});

// console.log(index);

// console.log(editingUser)

let userCode = document.getElementById("user-code");
// console.log(userCode);

let username = document.getElementById("username");
let email = document.getElementById("email");
let pwd = document.getElementById("password");
let role = document.getElementById("role");
let dob = document.getElementById("dob");
let status = document.querySelectorAll('input[name = "status"]');
let description = document.querySelector(".description-text-input");
let fullname = document.getElementById("fullname");

userCode.value = editingUser.usercode;
email.value = editingUser.email;
username.value = editingUser.username;
pwd.value = editingUser.password;
role.value = editingUser.role;
dob.value = editingUser.birthday;
fullname.value = editingUser.fullname || "N/A";

let currentStatus = editingUser.status;
status.forEach((element) => {
  if (element.value === currentStatus) {
    element.checked = true;
  }
});

description.value = editingUser.description;

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("editingUserId");
  window.history.back();
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let checkCurrentStatus = document.querySelector(
    'input[name="status"]:checked',
  ).value;

  let editedUser = {
    usercode: userCode.value,
    username: username.value,
    email: email.value,
    password: pwd.value,
    fullname: fullname.value,
    birthday: dob.value,
    description: description.value,
    role: role.value,
    status: checkCurrentStatus,
  };

  if (JSON.stringify(editingUser) === JSON.stringify(editedUser)) {
    Swal.fire({
      icon: "info",
      title: "Không có dữ liệu thay đổi!",
    });

    return;
  }

  if (
    !validateEditUser(username.value, email.value, pwd.value, fullname.value)
  ) {
    return;
  }

  Swal.fire({
    icon: "warning",
    title: "Bạn có chắc thực hiện hành động này?",
    showCancelButton: true,
    confirmButtonText: "OK",
    cancelButtonText: "Hủy",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      listUser[index] = editedUser;

      localStorage.setItem("userList", JSON.stringify(listUser));

      Swal.fire({
        icon: "success",
        title: "Cập nhật người dùng thành công!",
      }).then(function () {
        window.location.href = "./dashboard.html";
      });

      localStorage.removeItem("editingUserId");
    }
  });
});

function validateEditUser(username, email, password, fullname) {
  if (username === "" && email === "" && password === "" && fullname === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Bạn phải nhập đầy đủ các trường!",
    });
    return false;
  }
  if (username === "" && email === "" && fullname === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Username, Email, Họ và tên không được để trống!",
    });
    return false;
  }
  if (username === "" && password === "" && fullname === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Username, Password, Họ và tên không được để trống!",
    });
    return false;
  }
  if (email === "" && password === "" && fullname === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Email, Password, Họ và tên không được để trống!",
    });
    return false;
  }
  if (password === "" && fullname === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Password, Họ và tên không được để trống!",
    });
    return false;
  }
  if (fullname === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Họ và tên không được để trống!",
    });
    return false;
  }
  if (username === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Username không được để trống!",
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
  return true;
}
