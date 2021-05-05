import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { FaWindowMinimize } from 'react-icons/fa';

import Polls from './Polls';
import Poll from './Poll';
import Header from './Header';
import Footer from './Footer';
import CreatePoll from './CreatePoll';

export default function Router() {
  return (
    <BrowserRouter>
      <div className="site-container">
        <div className="background">
          <h1><FaWindowMinimize/>Poll Question</h1>
        </div>
        <div className="poll-wrapper 
          w-full lg:w-main
          px-4 md:px-8 lg:px-0
        ">
          <Switch>
            <Route exact path="/">
              <Polls />
            </Route>
            <Route path="/create">
              <CreatePoll />
            </Route>
            <Route path="/:id">
              <Poll />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
