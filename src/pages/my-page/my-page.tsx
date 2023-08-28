import ProgressChart from '@/pages/my-page/sections/progress-chart/progress-chart';
import MealButton from '@/pages/my-page/sections/meal-buttons/meal-button';
import FoodList from '@/pages/my-page/sections/food-list/food-list';

const MyPage = () => {
  return (
    <div>
      <ProgressChart />
      <MealButton />
      <FoodList />
    </div>
  );
};

export default MyPage;
