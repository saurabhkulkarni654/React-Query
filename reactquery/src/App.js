import logo from "./logo.svg";
import "./App.css";

import { useQuery } from "react-query";

const delay = (ms = 2000) => new Promise((e) => setTimeout(e, ms));

async function getRandomUsers() {
  await delay();
  let response = fetch("https://3000/users").then((res) => res.json());

  if (response) {
    return response;
  } else {
    throw new console.error(response);
  }
}

function App() {

  const {isLoading, error,data} = useQuery("user", getRandomUsers);
    if(isLoading) return 'Loading . . . .'
    if(error) return 'An Error Occured - E  R  R  O  R' 

  return (
    <>
    {
      data.map((k,d)=><ShowComponent key={k} data={d}/>)
    }
    </>
  );
}

export default App;


function ShowComponent({data }){
<div>``
  <img src={data.avatar} alt=""/>
  <h1>{data.name}</h1>
  <h2>{data.email}</h2>
</div>
}