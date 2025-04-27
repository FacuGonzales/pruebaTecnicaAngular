import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Character } from '../models/character-model';

export interface FavoriteState {
  favorites: Character[];
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteStore extends ComponentStore<FavoriteState> {

  constructor() {
    super({
      favorites: FavoriteStore.loadFavoritesFromLocalStorage(),
    });
  }

  readonly favorites$ = this.select(state => state.favorites);

  readonly removeFavorite = this.updater((state, character: Character) => {
    const updatedFavorites = state.favorites.filter(fav => fav.id !== character.id);
    FavoriteStore.saveFavoritesToLocalStorage(updatedFavorites);
    return { ...state, favorites: updatedFavorites };
  });

  readonly toggleFavorite = this.updater((state, character: Character) => {
    const isFavorite = state.favorites.some(fav => fav.id === character.id);
    let updatedFavorites = [];

    if (isFavorite) {
      updatedFavorites = state.favorites.filter(fav => fav.id !== character.id);
    } else {
      updatedFavorites = [...state.favorites, character];
    }

    FavoriteStore.saveFavoritesToLocalStorage(updatedFavorites);
    return { ...state, favorites: updatedFavorites };
  });

  private static saveFavoritesToLocalStorage(favorites: Character[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  private static loadFavoritesFromLocalStorage(): Character[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }
}
