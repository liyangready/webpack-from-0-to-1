import React, { Suspense, useState, useEffect } from "react";
import hello from "./hello-world.png";
const AsyncComponent = React.lazy(() => import("./AsyncComponent"));
const fetch = (): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, 3000));
};
const useFetchingStatus = (): boolean => {
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await fetch();
      setFetching(false);
    };
    fetchData();
  }, [fetching]);
  return fetching;
};
const App = (): React.ReactElement => {
  const fetching = useFetchingStatus();
  const [count, addCount] = useState(1);
  return (
    <div className="content">
      <p>hello world</p>
      <img className="image-info" src={hello} alt="hello world" />
      <Suspense fallback={<div>Loading...</div>}>
        <p onClick={(): void => addCount(count + 1)}>
          current count is : {count}
        </p>
        {fetching ? <div>fetching...</div> : <AsyncComponent />}
      </Suspense>
    </div>
  );
};
export default App;
