import { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://www.course-api.com/react-tours-project";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([true]);

  const fetchTours = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => id !== tour.id);
    setTours(newTours);
  };
  useEffect(() => {
    fetchTours(url);
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <h2>no tours left</h2>
        <button
          type="button"
          className={{ marginTop: "2rem" }}
          onClick={fetchTours}
        >
          refresh
        </button>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
