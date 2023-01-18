import './css/styles.css';
import { Notify } from 'notiflix';
import throttle from 'lodash/throttle';
import { fetchCountries } from './js/fetchCountries';
import {
  renderCountryList,
  renderFullInfo,
  clearMarkup,
} from './js/markupRender';

const DEBOUNCE_DELAY = 300;
const inputForm = document.querySelector(`#search-box`);

// Remove markup and fetch

function getInfo() {
  const countryName = inputForm.value.trim();
  clearMarkup();
  if (countryName.length != 0) {
    fetchCountries(countryName).then(data => {
      renderController(data);
    });
  }
}

// Render markup with description or without

let renderController = data => {
  if (data.length === 1) {
    renderCountryList(data);
    return renderFullInfo(data);
  } else if (data.length > 1 && data.length <= 10) {
    return renderCountryList(data);
  }
  return Notify.warning(
    'Too many matches found. Please enter a more specific name.'
  );
};

// Event listener

inputForm.addEventListener(`input`, throttle(getInfo, DEBOUNCE_DELAY));
