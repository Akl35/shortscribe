import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
        <h1 role="presentation" aria-label='Short Video Accessibility Prototype'>Short Video Accessibility Prototype</h1>
        <ul>
          <li><Link to="tutorial">Tutorial</Link></li>
          <li><Link to="task-1 (baseline)">Task 1 (baseline)</Link></li>
          <li><Link to="task-1 (prototype)">Task 1 (prototype)</Link></li>
          <li><Link to="task-2 (baseline)">Task 2 (baseline)</Link></li>
          <li><Link to="task-2 (prototype)">Task 2 (prototype)</Link></li>
        </ul>
        </div>
    );
}

export default Home;