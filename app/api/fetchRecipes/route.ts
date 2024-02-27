export async function POST(req: Request) {
  const spoonacularApiKey = process.env.SPOONACULAR_KEY;

  const body = await req.json();
  const ingredients = body.ingredients
    .filter((ingredient) => ingredient.checked)
    .map((ingredient) => ingredient.ingredient);
  console.log(ingredients);

  const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ranking=2&ingredients=${ingredients.join(
    ",",
  )}&apiKey=${spoonacularApiKey}&`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return Response.json({ error: "Error fetching data" });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json(error);
  }
}
