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
    const result = await res.json()
    console.log(result)
}

const getNewsDetails = async (news_id)=> {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`)
    const result = await res.json()
    console.log(result)
}

getNewsById("01")


