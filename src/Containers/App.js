import React, { useState, useEffect } from "react";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import Scroll from "../Components/Scroll";
import ErrorBoundary from "../Components/ErrorBoundary";
import "./App.css"

function App() {
    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response=> response.json())
            .then(users=> setRobots(users));
            console.log(count)
    }, [count])


    const onSearchChange = (event) => {
        setSearchField(event.target.value);
    }
    
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    if (!robots.length) { // Works because JS converts a 0 to false
        return <h1>Loading....</h1>;
    } else {
        return (
            <div className="tc">
                <h1 className="f1">Robofriends</h1>
                <button onClick={()=>setCount(count + 1)}>Click me</button>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default App;