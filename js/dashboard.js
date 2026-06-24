let signOutBtn = document.querySelector(".sign-out-link");
let tbody = document.getElementById("table-body");
let listUser = JSON.parse(localStorage.getItem("userList")) || [];
// listUser.reverse();
let currentPage = 1;
let perPage = 5;
let totalPage = 0;
// console.log(totalPage);

let userRole = localStorage.getItem("userRole");

let userId = localStorage.getItem("userId");
let perUser = [];

let arrowLeft = document.querySelector(".arrow-left");
let arrowRight = document.querySelector(".arrow-right");

// 5 phan tu dau tien
perUser = listUser.slice(
  (currentPage - 1) * perPage,
  (currentPage - 1) * perPage + perPage,
);
// console.log(perUser);

function renderPageNumber() {
  let paginationList = document.getElementById("pagination-list");
  paginationList.innerHTML = "";
  totalPage = Math.ceil(listUser.length / perPage);
  for (let i = 1; i <= totalPage; i++) {
    let activeClass = i === currentPage ? "highlight" : "";
    paginationList.innerHTML += `<li class="${activeClass}" onClick="handlePageNumber(${i})">${i}</li>`;
  }
}

arrowLeft.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    perUser = listUser.slice(
      (currentPage - 1) * perPage,
      (currentPage - 1) * perPage + perPage,
    );
    renderUser(perUser);
  }
});

arrowRight.addEventListener("click", () => {
  if (currentPage < totalPage) {
    currentPage++;
    perUser = listUser.slice(
      (currentPage - 1) * perPage,
      (currentPage - 1) * perPage + perPage,
    );
    renderUser(perUser);
  }
});

function handlePageNumber(num) {
  currentPage = num;
  // console.log(currentPage);
  perUser = listUser.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage,
  );
  renderUser(perUser);
}

signOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("savedUser");
  localStorage.removeItem("editingUserId");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userId");
  window.location.href = "./sign-in.html";
});

renderUser(perUser);

function renderUser(users) {
  tbody.innerHTML = "";
  users.forEach((element) => {
    let tr = document.createElement("tr");

    let statusClass = element.status === "Active" ? "active" : "deactive";
    let role = element.role === "admin" ? "role-admin" : "role-user";

    tr.innerHTML = `<td class="usercode">${element.usercode}</td>
    <td>${element.username}</td>
    <td>${element.email}</td>
    <td><span class="${role}">${element.role}</span></td>
    <td>${element.birthday}</td>
    <td class = "${statusClass}">${element.status}</td>
    <td><button class="edit-btn" id=${element.usercode}>Sửa</button>
    <button class="del-btn" id=${element.usercode}>Xóa</button>
    </td>`;
    tbody.appendChild(tr);
  });
  renderPageNumber();
}

// let editBtn = document.querySelector(".edit-btn");
// let delBtn = document.querySelector(".del-btn");

tbody.addEventListener("click", (e) => {
  let targetId = e.target.id;
  if (e.target.classList.contains("edit-btn")) {
    if (userRole === "admin") {
      localStorage.setItem("editingUserId", e.target.id);
      window.location.href = "./edit-user.html";
    } else {
      Swal.fire({
        icon: "info",
        title: "Không phải Admin! Không thể thực hiện hành động này!",
      });
    }
  }
  if (e.target.classList.contains("del-btn")) {
    // console.log("delete function");
    if (userRole === "admin") {
      if (targetId === userId) {
        Swal.fire({
          icon: "warning",
          title: "Bạn đăng đăng nhập tài khoản này! Không thể xóa!",
        });
        return;
      }
      Swal.fire({
        icon: "warning",
        title: "Bạn có chắc xóa user này?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          let index = listUser.findIndex((item) => {
            return item.usercode === targetId;
          });
          // console.log(index);
          listUser.splice(index, 1);
          perUser = listUser.slice(
            (currentPage - 1) * perPage,
            (currentPage - 1) * perPage + perPage,
          );
          localStorage.setItem("userList", JSON.stringify(listUser));
          renderUser(perUser);
          Swal.fire({
            icon: "success",
            title: "Xóa user thành công!",
          });
        }
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Không phải Admin! Không thể thực hiện hành động này!",
      });
    }
  }
});

let inputSearch = document.getElementById("search-box");
inputSearch.addEventListener("input", () => {
  let keyword = inputSearch.value.toLowerCase();

  let filteredUsers = listUser.filter((user) => {
    return user.username.toLowerCase().includes(keyword);
  });

  renderUser(filteredUsers);

  if (keyword === "") {
    perUser = listUser.slice(
      (currentPage - 1) * perPage,
      (currentPage - 1) * perPage + perPage,
    );
    renderUser(perUser);
  }
});

// let searchIcon = document.querySelector(".fa-magnifying-glass");
// searchIcon.addEventListener("click", () => {
//   let keyword = inputSearch.value.toLowerCase();

//   let filteredUsers = listUser.filter((user) => {
//     return user.username.toLowerCase().includes(keyword);
//   });
//   renderUser(filteredUsers);
// });
