let inputEmail = document.getElementById("email");
let pwd = document.getElementById("password");
let saveLogin = document.getElementById("save-loggin-checkbox");

// console.log(inputEmail, pwd, saveLogin);

let listUser = JSON.parse(localStorage.getItem("userList")) || [];
// console.log(listUser);

let savedUser = JSON.parse(localStorage.getItem("savedUser"));
if (savedUser) {
  window.location.href = "./dashboard.html";
}

let signInBtn = document.querySelector(".btn");

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateSignIn(inputEmail.value, pwd.value)) {
    return;
  }
});

function validateSignIn(email, password) {
  if (email === "" && password === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Email và Password không được để trống!",
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

  let user = listUser.find((item) => {
    return item.email === email && item.password === password;
  });

  if (user) {
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userId", user.usercode);
    if (saveLogin.checked) {
      localStorage.setItem("savedUser", JSON.stringify(user));
    }
    Swal.fire({
      icon: "success",
      title: "Đăng nhập thành công",
    }).then(() => {
      window.location.href = "./dashboard.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Lỗi",
      text: "Email hoặc mật khẩu không đúng!",
    });
  }
}
