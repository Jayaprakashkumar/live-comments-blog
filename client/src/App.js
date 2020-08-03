import React from 'react';
import './App.css';
import CommentForm from "./components/form/CommentForm";
// import Test from "./components/test"

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 wrapper p-4 mt-4">
          <CommentForm />
        </div>
        {/* <div className="col-sm-12">
          <Test />
        </div> */}

      </div>

    </div>
  );
}

export default App;
