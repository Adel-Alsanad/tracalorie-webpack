import Storage from './Storage';

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayProgressBar();
    this._displayStorageMeals();
    this._displayStorageWorkouts();
  }

  // Public Methods/API

  addMeal(meal) {
    this._meals.push(meal);
    this._displayNewMeal(meal);
    this._totalCalories += meal.calories;
    Storage.saveMeals(this._meals);
    Storage.saveTotalCalories(this._totalCalories);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._displayNewWorkout(workout);
    this._totalCalories -= workout.calories;
    Storage.saveWorkouts(this._workouts);
    Storage.saveTotalCalories(this._totalCalories);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);

    if (index !== -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      this._meals.splice(index, 1);
      Storage.saveMeals(this._meals);
      Storage.saveTotalCalories(this._totalCalories);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if (index !== -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      this._workouts.splice(index, 1);
      Storage.saveWorkouts(this._workouts);
      Storage.saveTotalCalories(this._totalCalories);
      this._render();
    }
  }

  reset() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    localStorage.clear();
    this._render();
  }

  setLimit(limit) {
    this._calorieLimit = limit;
    Storage.saveCalorieLimit(this._calorieLimit);
    this._displayCaloriesLimit();
    this._render();
  }

  // Private Methods //

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce(
      (accu, curr) => accu + curr.calories,
      0
    );
    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );
    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const caloriesProgressEl = document.getElementById('calorie-progress');
    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;

    if (remaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'text-bg-danger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesProgressEl.classList.add('text-bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'text-bg-danger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      caloriesProgressEl.classList.remove('text-bg-danger');
    }
  }

  _displayProgressBar() {
    const caloriesProgressEl = document.getElementById('calorie-progress');
    const caloriesBarWidth = (this._totalCalories / this._calorieLimit) * 100;
    caloriesProgressEl.style.width = caloriesBarWidth + '%';
  }

  _displayNewMeal(meal) {
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    mealEl.setAttribute('data-id', meal.id);
    mealEl.classList = 'card my-2';
    mealEl.innerHTML = `
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.name}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${meal.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
      `;
    mealsEl.appendChild(mealEl);
  }

  _displayStorageMeals() {
    this._meals.forEach((meal) => this._displayNewMeal(meal));
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.classList = 'card my-2';
    workoutEl.innerHTML = `
      <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.name}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${workout.calories}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
      `;
    workoutsEl.appendChild(workoutEl);
  }

  _displayStorageWorkouts() {
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayProgressBar();
  }
}

export default CalorieTracker;
