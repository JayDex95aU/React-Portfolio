import { TAB_SUGGESTION, ANIME_ADD } from '../actions/index';
import axios from 'axios';
import x2js from 'x2js';

const INITAL_STATE = [];

export default function(state = INITAL_STATE, action) {
  var preventAdd = false;

  switch(action.type) {
    case TAB_SUGGESTION:
      const animeInfo = animeInfoHelper(action.payload.data);
      state.map((value) => {
        if (value.id == animeInfo.id) {
          console.log("Anime in state");
          preventAdd = true;
        }
      })

      if (preventAdd) {
        return state;
      }
      console.log(animeInfo);
      console.log("Anime not in state");
      return [ animeInfo, ...state ];
    case ANIME_ADD:
      chrome.storage.local.get({username: 'username_MAL_95au', password: 'password_MAL_95au'}, (object) => {
        const request = axios({
          method: 'post',
          url: `${SEARCH_URL}${query}`,
          data: {
            id: action.payload
          },
          auth: {
            username: object.username,
            password: object.password
          }
        });
      });
      break;
    default:
      return state;
  }
}

/**
Purpose: Select correct category when JSON data is returned from MAL
**/
function animeInfoHelper(data) {
  var selectionValue = 0;
  while (data.categories[selectionValue].type != "anime") {
    selectionValue++;
  }
  const animeInfo = data.categories[selectionValue].items[0];
  return animeInfo;
}


//const parser = new x2js();
//console.log(parser.xml2js(action.payload.data).anime);

//console.log(action.payload.data.categories[0].type); HOW TO CHECK IF ANIME OR NOT
