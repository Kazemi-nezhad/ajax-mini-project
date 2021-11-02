window.onload = function () {
  const usersContainer = document.getElementById('users_container')
  const btnContainer = document.getElementById('btn_container')
  const xhttp = new XMLHttpRequest()
  let responseData
  let usersListHTML = ''
  let btnHTML = ''
  let currentPage = 1
  let pageCount
  /***********************/
  function appendData() {
    usersListHTML = ''
    btnHTML = ''
    responseData['data'].map((user) => {
      usersListHTML += `<div class="user_prof"><div class="avatar"><img src="${user.avatar}"></div><div class="user_info">${user.first_name} ${user.last_name}</div></div>`
    })
    pageCount = responseData['total'] / 4 //we want to show only 4 users per page so here we calculate how many page we need
    for (let i = 1; i <= pageCount; i++) {
      btnHTML += `<button class="page_btn">${i}</button>`
    }
    usersContainer.innerHTML = usersListHTML
    btnContainer.innerHTML = btnHTML
  }
  /***********************/
  xhttp.onload = function () {
    responseData = JSON.parse(this.responseText)
    appendData()
    /******/
    const btnList = document.querySelectorAll('.page_btn')
    /******/
    btnList.forEach((button) => {
      button.addEventListener('click', function () {
        xhttp.open(
          'GET',
          `https://reqres.in/api/users?per_page=4&page=${button.innerText}`,
        )
        xhttp.send()
      })
    })
  }
  xhttp.open(
    'GET',
    `https://reqres.in/api/users?per_page=4&page=${currentPage}`,
  )
  xhttp.send()
}
