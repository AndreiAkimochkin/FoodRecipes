import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userId: string = null;
  favorites: FirebaseListObservable<any[]>;
  result: any[] = [];

  constructor( private database: AngularFireDatabase, public afAuth: AngularFireAuth ) {
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      this.favorites = database.list(`favorites/${user.uid}`);
      this.userId = user.uid;
    })
   }

   setFavorites(currentUserId: string){
     return this.favorites = this.database.list(`favorites/${currentUserId}`)
   }

  pushFavorite(favoriteRecipe, uid){
    this.setFavorites(uid)
    this.favorites.subscribe(favorites => {
      this.result = favorites.filter(favorite => favorite.url === favoriteRecipe.url);
    });
    if(this.result.length === 0){
      this.favorites.push(favoriteRecipe);
    }
    else{
      return "duplicate";
    }
  }

  getFavorites(uid: string){
    this.setFavorites(uid)
    return this.favorites;
  }

  findFavorite($key: string){
    return this.database.object(`favorites/${this.userId}/` + $key)
  }

  editFavorite(key: string, notes: string){
    const currentFavorite: any = this.findFavorite(key);
    currentFavorite.update({notes: notes});
  }

  deleteFavorite(favoriteToDelete) {
    const favoriteEntry = this.findFavorite(favoriteToDelete.$key);
    favoriteEntry.remove();
  }
}
