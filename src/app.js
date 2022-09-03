let showSpinner = false
let currentCategory = "01"

const cardsElement = document.querySelector(".cards");


const getCatagory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const { data } = await res.json();
  return data.news_category
};

getCatagory();

const getNewsById = async(category_id)=> {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
    const {data} = await res.json()
    return data
}

const getNewsDetails = async (news_id)=> {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    const result = await res.json()
    console.log(result)
}


const renderCards = async ()=> {
  const cards = await getNewsById(currentCategory)
  cards.map(card=> {
    cardsElement.innerHTML = cardsElement.innerHTML +
    `<div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src="${card.thumbnail_url}"
          class="img-fluid rounded-start"
          alt=""
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            The best fashion influencers to follow for sartorial
            inspiration
          </h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural
            lead-in to additional content. This content is a little bit
            longer.
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
              <p class="d-inline">1.5</p>
            </div>
            <div>
              <img src="./assets/bxs_star-half.png" alt="" />
              <img src="./assets/Vector.png" alt="" />
              <img src="./assets/Vector.png" alt="" />
              <img src="./assets/Vector.png" alt="" />
              <img src="./assets/Vector.png" alt="" />
            </div>
            <div>
              <a href="#">
                <img src="./assets/Group.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
  })
}

renderCards()

// Render Function which get triggers by navbar category
// Modal Get Trigger by view more with newsID