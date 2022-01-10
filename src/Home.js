const Home = ({category,difficulty,setCategory,setDifficulty,setIsStarted}) => {

    //return the Home-component
    return (
        <div className="home-page">
            <h1>Quizical</h1>
            <div className="select-container">
            <label>Category:</label>
            <select
            value={ category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            >
            <option value="">Any Category</option>
            <option value="32">Cartoon & Animations</option>
            <option value="31">Japanese Anime & Manga</option>
            <option value="30">Gadgets</option>
            <option value="29">Comics</option>
            <option value="28">Vehicles</option>
            <option value="27">Animals</option>
            <option value="26">Celebrities</option>
            <option value="25">Art</option>
            <option value="24">Politics</option>
            <option value="23">History</option>
            <option value="22">Geography</option>
            <option value="21">Sports</option>
            <option value="20">Mythology</option>
            <option value="19">Mathematics</option>
            <option value="18">Computers</option>
            <option value="17">Science & Nature</option>
            <option value="16">Board Games</option>
            <option value="15">Video Games</option>
            <option value="14">Television</option>
            <option value="13">Musicals & Theatres</option>
            <option value="12">Music</option>
            <option value="11">Film</option>
            <option value="10">Books</option>
            <option value="9">General Knowledge</option>
            </select>
            </div>

            <div className="select-container">
            <label>Difficulty</label>
            <select
                value={ difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                name="difficulty"
            >
                <option value="">Any diffeculty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            </div>

            <button className="btn" onClick={() => setIsStarted(true)}>Let's go</button>
        </div>
    );
}

export default Home;