import './App.css';
import Video from "./Video";
import Home from "./Home";
import video_data from './static/video_data.json';
import tutorial_data from './static/tutorial_data.json';
import { Route, Routes, useLocation} from "react-router-dom";

const watch_videos = [video_data[0], video_data[1], video_data[2], video_data[3], video_data[4], video_data[5], video_data[6], video_data[7]];

const scroll_videos = video_data.slice(8);

/* Randomize array in-place using Durstenfeld shuffle algorithm */
/* https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

shuffleArray(scroll_videos);

//splitting videos into tasks
const watch_videos1 = watch_videos.slice(0, watch_videos.length / 2);
const watch_videos2 = watch_videos.slice(watch_videos.length / 2);
const scroll_videos1 = scroll_videos.slice(0, scroll_videos.length / 2);
const scroll_videos2 = scroll_videos.slice(scroll_videos.length / 2);

//shuffling tasks
shuffleArray(watch_videos1);
shuffleArray(watch_videos2);

function App() {
  const location = useLocation();

  return (
    <div>
      <Routes location={location} key={location.pathname} >
          
            <Route index element={<Home />} />
            {/* 5 videos from the formative study, prototype enabled */}
            <Route path="tutorial" element={<Video videos={tutorial_data} baseline={false} taskType={"tutorial"}/>} />

            {/* TASK 1 */}
            {/* 4 selected video (randomized), prototype disabled */}
            <Route path="task-1 (baseline)" element={<Video videos={watch_videos1} baseline={true} taskType={"task_1_baseline"}/>} />
            {/* 4 selected video (randomized), prototype enabled */}
            <Route path="task-1 (prototype)" element={<Video videos={watch_videos2} baseline={false} taskType={"task_1_prototype"}/>} />

            {/* TASK 2 */}
            {/* 25 selected video (randomized), prototype disabled */}
            <Route path="task-2 (baseline)" element={<Video videos={scroll_videos1} baseline={true} taskType={"task_2_baseline"}/>} />
            {/* 25 selected video (randomized), prototype enabled */}
            <Route path="task-2 (prototype)" element={<Video videos={scroll_videos2} baseline={false} taskType={"task_2_prototype"}/>} />
          
          {/*<Route path="*" element={<PageNotFound />*/}
      </Routes>
    </div>
  );
}

export default App;
