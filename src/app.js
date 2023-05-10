import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse } from 'bootstrap';
import CalorieTracker from './Tracker';
import { Meal, Workout } from './item';

import './css/bootstrap.css';
import './css/style.css';

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    this._mealForm = document.getElementById('meal-form');
    this._workoutForm = document.getElementById('workout-form');

    this._mealForm.addEventListener('submit', (event) =>
      this._handleFormSubmit(event, 'meal')
    );
    this._workoutForm.addEventListener('submit', (event) =>
      this._handleFormSubmit(event, 'workout')
    );

    document
      .getElementById('meal-items')
      .addEventListener('click', this._removeItem.bind(this, 'meal'));
    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));

    document
      .getElementById('filter-meals')
      .addEventListener('keyup', this._filterItems.bind(this, 'meal'));
    document
      .getElementById('filter-workouts')
      .addEventListener('keyup', this._filterItems.bind(this, 'workout'));

    document
      .getElementById('reset')
      .addEventListener('click', this._reset.bind(this));
    document
      .getElementById('limit-form')
      .addEventListener('submit', this._setLimit.bind(this));
  }

  _handleFormSubmit(event, type) {
    event.preventDefault();
    const nameInput = document.getElementById(`${type}-name`);
    const caloriesInput = document.getElementById(`${type}-calories`);

    if (nameInput.value.trim() === '' || caloriesInput.value === '') {
      alert('Please fill in all fields');
    } else {
      const name = nameInput.value;
      const calories = parseInt(caloriesInput.value);

      if (type === 'meal') {
        const meal = new Meal(name, calories);
        this._tracker.addMeal(meal);
      } else if (type === 'workout') {
        const workout = new Workout(name, calories);
        this._tracker.addWorkout(workout);
      }

      nameInput.value = '';
      caloriesInput.value = '';

      const collapseItem = document.getElementById(`collapse-${type}`);
      const bsCollapse = new Collapse(collapseItem, {
        toggle: true,
      });
    }
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains('delete') ||
      e.target.classList.contains('fa-xmark')
    ) {
      if (confirm('Are you sure?')) {
        const id = e.target.closest('.card').getAttribute('data-id');

        type === 'meal'
          ? this._tracker.removeMeal(id)
          : this._tracker.removeWorkout(id);

        e.target.closest('.card').remove();
      }
    }
  }

  _filterItems(type, e) {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll(`#${type}-items .card`);

    items.forEach((item) => {
      const itemName = item.querySelector('h4').textContent.toLowerCase();

      if (itemName.includes(searchTerm)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  _reset() {
    this._tracker.reset();
    document.getElementById('meal-items').innerHTML = '';
    document.getElementById('workout-items').innerHTML = '';
    document.getElementById('filter-meals').value = '';
    document.getElementById('filter-workouts').value = '';
  }

  _setLimit(e) {
    e.preventDefault();
    const limit = document.getElementById('limit');

    if (limit.value.trim() === '') {
      alert('Please enter a limit');
      return;
    }

    this._tracker.setLimit(+limit.value);
    limit.value = '';

    const modalEl = document.getElementById('limit-modal');
    const modal = Modal.getInstance(modalEl);
    modal.hide();
  }
}

const app = new App();
