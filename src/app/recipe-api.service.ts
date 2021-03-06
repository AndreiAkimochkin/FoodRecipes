import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { recipeApiAppId, recipeApiKey } from './api-keys';

@Injectable()
export class RecipeApiService {

  constructor(private http: Http) { }

  getByIngredients(ingredient: string, health: string, diet: string ){
    if (diet === null && health === null) {
      return this.http.get(`https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiAppId}&app_key=${recipeApiKey}&to=20`);
    } else if (diet === null && health !== null) {
      return this.http.get(`https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiAppId}&app_key=${recipeApiKey}&to=20&health=${health}`);
    } else if (diet !== null && health === null) {
      return this.http.get(`https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiAppId}&app_key=${recipeApiKey}&to=20&diet=${diet}`);
    } else {
      return this.http.get(`https://api.edamam.com/search?q=${ingredient}&app_id=${recipeApiAppId}&app_key=${recipeApiKey}&to=20&diet=${diet}&health=${health}`);
    }
  }
}
