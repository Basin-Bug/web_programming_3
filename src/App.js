import { useEffect, useState } from "react";
import { fetchImages } from "./api";

let isDouble;

function setUserName() {
  let num = prompt('set the number of pictures(one/two)');
  localStorage.setItem('name', num);
  if(num == "one" || num == "o"){
    isDouble = false;
  }else if(num == "two" || num == "t"){
    isDouble = true;
  }
}


function Introduction(){
  return (
    <p className="hero is-light has-text-centered">このサイトは日本大学文理学部情報科学科Webプログラミングの演習課題である.</p>
  );
}

function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { type } = event.target.elements;
    props.onFormSubmit(type.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="type" defaultValue="rice">
                <option value="idly">Idly</option>
                <option value="dessert">Dessert</option>
                <option value="rice">Rice</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-black">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Foodish!!!!!!!!</h1>
        </div>
      </div>
    </header>
  );
}



function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img
            src= {props.src}
            alt="Delicious Food"
          />
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}


function Gallery(props) {
  const {urls} = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
        <div key={urls} className="column is-3">
          <Image src={urls} />
        </div>
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
    useEffect(() =>{
      fetchImages("rice").then((urls) => {
        setUrls(urls);
      });
    }, []);

  function reloadImages(type) {
    fetchImages(type).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls = {urls}/>
        </div>
      </section>
    </main>
  );
}


function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>Favicon by Capcom</p>
        <p>
          <a href="https://github.com/surhud004/Foodish">Donate to Foodish API</a>
        </p>
        <p class="copyright">&copy; 5420047 王賛為</p>
      </div>
    </footer>
  );
}

function Lesence(){
  return (
    <p className = "content has-text-centered">This project is licensed under 
      <a href = "https://opensource.org/licenses/MIT"> MIT </a>. 
      Please read the 
      <a href = "https://github.com/surhud004/Foodish/blob/main/LICENSE"> LICENSE </a>
      by 
      <a href = "https://github.com/surhud004"> surhud004 </a>
      for details.</p>
  );
}

function App() {
  setUserName();
  if(!isDouble){
    return (
      <div>
        <Header />
        <Introduction />
        <Main />
        <Footer />
        <Lesence />
      </div>
    );
  }else{
    return (
      <div>
        <Header />
        <Introduction />
        <Main />
        <Main />
        <Footer />
        <Lesence />
      </div>
    );
  }
}

export default App;
