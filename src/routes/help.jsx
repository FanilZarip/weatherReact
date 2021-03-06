import { Link } from "react-router-dom";

export default function Help() {
  return (
    <>
      <h2>Прогноз погоды</h2>
      <p>
        Наша программа предоставляет возможность производить получать данные о
        прогнозе погоды.
        <br />
        Для этого всего лишь необходимо набрать название города и нажать "Enter"
        <br />
        При необходимости, города возможно добавлять в избранное. Для этого
        всего лишь необходимо нажать на значок сердечка во вкладке "Now"
      </p>
      <Link to="/">Go Home</Link>
    </>
  );
}
