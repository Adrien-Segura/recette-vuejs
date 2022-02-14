import axios from "axios";
import Api from "@/helpers/Api";

async function getAll() {
  try {
    return await axios.get(Api.urlApi + "recettes");
  } catch (e) {
    if (e.response) return e.response;
  }
}

async function get(id) {
  try {
    return await axios.get(Api.urlApi + "recette/" + id);
  } catch (e) {
    if (e.response) return e.response;
  }
}

async function destroy(id, jwt) {
  try {
    return await axios.delete(Api.urlApi + "recette/" + id, {
      headers: {
        Authorization: "Bearer " + jwt
      }
    });
  } catch (e) {
    if (e.response) return e.response;
  }
}

async function create(
  title,
  description,
  ingredients,
  personnes,
  minutes,
  jwt
) {
  try {
    return await axios.post(
      Api.urlApi + "recette",
      {
        title,
        description,
        ingredients,
        personnes,
        minutes
      },
      {
        headers: {
          Authorization: "Bearer " + jwt
        }
      }
    );
  } catch (e) {
    if (e.response) return e.response;
  }
}

async function update(
  id,
  title,
  description,
  ingredients,
  personnes,
  minutes,
  jwt
) {
  try {
    return await axios.put(
      Api.urlApi + "recette/" + id,
      {
        title,
        description,
        ingredients,
        personnes,
        minutes
      },
      {
        headers: {
          Authorization: "Bearer " + jwt
        }
      }
    );
  } catch (e) {
    if (e.response) return e.response;
  }
}

function checkRecipe(userRecipe, user) {
  return userRecipe.email === user.email;
}

export { getAll, get, destroy, create, update, checkRecipe };
