let currentCategory = "01";

const cardsElement = document.querySelector(".cards");
const categoryElement = document.querySelector(".category-list");
const modalElement = document.querySelector(".modal-dialog");
const spinnerElement = document.querySelector(".spinner");

const getCatagory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const { data } = await res.json();
  return data.news_category;
};

getCatagory();

const getNewsById = async (category_id) => {
  showLoadingSpinner();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${category_id}`
  );
  const { data } = await res.json();
  hideLoadingSpinner();
  return data;
};

const getNewsDetails = async (news_id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${news_id}`
  );
  const result = await res.json();
  console.log(result);
  return result;
};

const renderCategory = async () => {
  const categories = await getCatagory();
  categories.map((category) => {
    categoryElement.innerHTML += `
    <li class="list-inline-item">
      <a href="#" class="text-decoration-none text-primary" onClick="renderCards('${category.category_id}')">${category.category_name}</a>
    </li>
    `;
  });
};

renderCategory();

const renderCards = async (categoryID = currentCategory) => {
  const cards = await getNewsById(categoryID);
  cardsElement.innerHTML = "";
  cards.map((card) => {
    cardsElement.innerHTML =
      cardsElement.innerHTML +
      `<div class="card mb-3 p-3">
    <div class="row g-0">
      <div class="col-auto">
        <img
          src="${card.thumbnail_url}"
          class="img-fluid rounded-start"
          alt=""
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            ${card.title}
          </h5>
          <p class="card-text ellipsis">
            ${card.details}
          </p>
          <div
            class="d-flex justify-content-between align-items-center"
          >
            <div class="d-flex">
              <img
                src="${card.author.img}"
                alt=""
                class="rounded-circle"
                height="50"
                width="50"
              />
              <div class="card-text">
                <p>Jane Cooper</p>
                <p>Jan 10, 2022</p>
              </div>
            </div>
            <div class="d-inline">
              <img src="./assets/carbon_view.png" alt="eye icon" />
              <p class="d-inline">${card.total_view}</p>
            </div>
            <div>
              <img src="./assets/bxs_star-half.png" alt="" />
              <img src="./assets/Vector.png" alt="" />
              <img src="./assets/Vector.png" alt="" />
              <img src="./assets/Vector.png" alt="" />
              <img src="./assets/Vector.png" alt="" />
            </div>
            <div>
              <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="./assets/Group.png" alt="" onClick="renderModal('${card._id}')"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
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
      ${news.title}
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
  ${news.details}
  </div>
  <div class="modal-footer justify-content-between">
    <h6>Author: ${news.author.name}</h6>
    <button type="button" class="btn btn-primary">
      Rating <span class="badge text-bg-secondary">${news.rating.number}</span>
    </button>
    <p>Published: <span>${new Date(
      news.author.published_date
    ).toDateString()}</span></p>
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

renderCards();

