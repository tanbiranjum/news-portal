const cardsElement = document.querySelector(".cards");
const categoryElement = document.querySelector(".category-list");
const modalElement = document.querySelector(".modal-dialog");
const spinnerElement = document.querySelector(".spinner");
const contentInfoElement = document.querySelector(".content-info");

const getCatagory = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/news/categories"
    ).catch(() => false);
    if (res.status !== 200) alert("You are in offline!");
    const { data } = await res.json();
    return data.news_category;
  } catch (error) {
    return false;
  }
};

getCatagory();

const getNewsById = async (category_id) => {
  try {
    showLoadingSpinner();
    const res = await fetch(
      `https://openapi.programming-hero.com/api/news/category/${category_id}`
    ).catch(() => false);
    const { data } = await res.json();
    hideLoadingSpinner();
    return data;
  } catch (error) {
    return false;
  }
};

const getNewsDetails = async (news_id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${news_id}`
  ).catch(() => false);
  const result = await res.json();
  console.log(result);
  return result;
};

const renderCategory = async () => {
  const categories = await getCatagory();
  categories.map((category) => {
    categoryElement.innerHTML += `
    <li class="list-inline-item" data-index='${category.category_id}'>
      <a href='#${category.category_id}' class="text-decoration-none text-primary" onClick="renderCards('${category.category_id}', '${category.category_name}')">${category.category_name}</a>
    </li>
    `;
  });
};

const renderCards = async (category_id, category_name) => {
  const categoryID = category_id || "01";
  const unsortedCards = await getNewsById(categoryID);
  const cards = unsortedCards.sort(
    (a, b) => b.total_view * 1 - a.total_view * 1
  );
  const lists = document.querySelectorAll(".list-inline-item");
  Array.from(lists).forEach((list) =>
    list.classList.remove("list-inline-active")
  );
  console.log(lists);
  Array.from(lists).forEach((list) => {
    if (list.dataset.index === category_id) {
      list.classList.add("list-inline-active");
    }
  });
  if (!cards) return "Something went wrong!";
  if (!cards.length)
    return (cardsElement.innerHTML =
      "Sorry! There are no News in this section");
  contentInfoElement.innerHTML = `<h6>${
    cards.length
  } items found for category ${category_name || "Breaking News"}</h6>`;
  cardsElement.innerHTML = "";
  cards.map((card) => {
    cardsElement.innerHTML =
      cardsElement.innerHTML +
      `
      <div class="col-md-6">
      <div class="card p-3">
    <div class="row g-0">
      <div class="col-md-5">
        <img
          src="${card.thumbnail_url}"
          class="img-fluid rounded-start"
          alt=""
        />
      </div>
      <div class="col-md-7 align-self-center">
        <div class="card-body pt-0">
        <div>
              <img src="./assets/bxs_star-half.png" alt=""/>
              <img src="./assets/Vector.png" alt=""/>
              <img src="./assets/Vector.png" alt=""/>
              <img src="./assets/Vector.png" alt=""/>
              <img src="./assets/Vector.png" alt=""/>
            </div>
        <p class="mb-0">${
          new Date(card.author.published_date).toDateString() || "No data found"
        }</p>
          <h5 class="card-title h5">
            ${card.title || "No data found"}
          </h5>
          <p class="card-text ellipsis">
            ${card.details || "No data found"}
          </p>
          <div
            class="d-flex justify-content-between align-items-center"
          >
            <div class="d-flex align-items-center">
              <img
                src="${card.author.img}"
                alt=""
                class="rounded-circle me-1"
                height="40"
                width="40"
              />
                <p>${card.author.name || "No data found"}</p>
            </div>
            <div class="d-inline">
              <img src="./assets/carbon_view.png" alt="eye icon" />
              <p class="d-inline">${card.total_view || "No data found"}</p>
            </div>
            <div>
              <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="./assets/Group.png" alt="" onClick="renderModal('${
                  card._id
                }')"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  `;
  });
};

const renderModal = async (newsId) => {
  const { data } = await getNewsDetails(newsId);
  const news = data[0];
  modalElement.innerHTML = "";
  modalElement.innerHTML = `
  <div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">
      ${news.title || "No data found"}
    </h5>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
  </div>
  <img
    src="${news.image_url}"
    alt=""
  />
  <div class="modal-body">
  ${news.details || "No data found"}
  </div>
  <div class="modal-footer justify-content-between">
    <h6>Author: ${news.author.name || "No data found"}</h6>
    <button type="button" class="btn btn-primary">
      Rating <span class="badge text-bg-secondary">${
        news.rating.number || "No data found"
      }</span>
    </button>
    <p>Published: <span>${
      new Date(news.author.published_date).toDateString() || "No data found"
    }</span></p>
  </div>
</div>

  `;
};

const showLoadingSpinner = () => {
  spinnerElement.classList.remove("loading-spinner-active");
};

const hideLoadingSpinner = () => {
  spinnerElement.classList.add("loading-spinner-active");
};

renderCategory();
renderCards();
