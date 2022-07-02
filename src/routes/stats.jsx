import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Stats() {
  const citiesSet = useSelector((state) => state.setCities);
  const citiesMap = useSelector((state) => state.cityGetCount);

  const isEmptyMap = citiesMap.toString();

  const totalCitiesCount = citiesSet.length;

  const popularCity = {
    name: "Пока не смотрели",
    count: 0,
  };

  if (isEmptyMap) {
    for (const iterator of citiesMap) {
      const value = citiesMap.values();
      const mostPopularCityCiount = Math.max(...value);
      const maxViewedCity = iterator.find(
        (item) => item === mostPopularCityCiount,
      );

      if (maxViewedCity) {
        popularCity.name = iterator[0];
        popularCity.count = iterator[1];
      }
    }
  }

  return (
    <>
      <h2>Статистика использования погоды</h2>
      <p>Самый часто просматриваемый город: {popularCity.name}</p>
      <p>Просмотрели {popularCity.count} раз</p>

      <p>Всего просмотрено городов: {totalCitiesCount}</p>

      <Link to="/">Go Home</Link>
    </>
  );
}
