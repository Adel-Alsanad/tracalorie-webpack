class Storage {
  static _calorieLimitKey = 'calorieLimit';
  static _totalCaloriesKey = 'totalCalories';
  static _mealsKey = 'meals';
  static _workoutsKey = 'workouts';

  static saveCalorieLimit(calories) {
    localStorage.setItem(Storage._calorieLimitKey, calories);
  }

  static getCalorieLimit() {
    const calorieLimit = localStorage.getItem(Storage._calorieLimitKey);
    return calorieLimit ? parseInt(calorieLimit) : 2000;
  }

  static saveTotalCalories(calories) {
    localStorage.setItem(Storage._totalCaloriesKey, calories);
  }

  static getTotalCalories() {
    const totalCalories = localStorage.getItem(Storage._totalCaloriesKey);
    return totalCalories ? parseInt(totalCalories) : 0;
  }

  static saveMeals(meals) {
    localStorage.setItem(Storage._mealsKey, JSON.stringify(meals));
  }

  static getMeals() {
    const meals = localStorage.getItem(Storage._mealsKey);
    return meals ? JSON.parse(meals) : [];
  }

  static saveWorkputs(workouts) {
    localStorage.setItem(Storage._workoutsKey, JSON.stringify(workouts));
  }

  static getWorkouts() {
    const workouts = localStorage.getItem(Storage._workoutsKey);
    return workouts ? JSON.parse(workouts) : [];
  }
}

export default Storage;
