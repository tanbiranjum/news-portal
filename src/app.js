const getCatagory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const { data } = await res.json();
  const categories = data.map((category) => category.category_name);
};

getCatagory();
