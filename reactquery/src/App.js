import logo from "./logo.svg";
import "./App.css";

import { useQuery, useMutation, useQueryClient} from "react-query";

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

async function createNewUser(newUser) {
  await delay();

  let reponse = fetch("http://localhost:8080/users", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });
}

function App() {
  const queryClient = useQueryClient(); //using this for fetching data again, after adding the user. For this added code in OnSuccess - just after createNewUser Function
  const { isLoading, error, data } = useQuery("user", getRandomUsers);
  const mutation = useMutation((newUser) => createNewUser(newUser),{
    onSuccess: ()=>{
      queryClient.invalidateQueries('user')
    }
  });

  if (isLoading) return "Loading . . . .";
  if (error) return "An Error Occured - E  R  R  O  R";

  async function handlerOnclick() {
    //using mutate() function, we are making POST Request to add User.
    mutation.mutate({
      name: "Surabh Kulkarni",
      email: "saurabhkulkarni@gmail.com",
      avatar: "",
    });
  }

  if (data) console.log(data);

  return (
    <>
      {/* There is no Data to fetch here, So it Always show  Loading . . . .
      {data.map((k, d) => (
        <ShowComponent key={k} data={d} />
      ))} */}

      <div>
        {mutation.isLoading ? (
          "Adding User . . ."
        ) : (
          <>
            {mutation.isError ? "Error Occured . . ." : null}
            {mutation.isSuccess ? "User Added Successfully . . ." : null}
          </>
        )}

        <button type="button" onClick={handlerOnclick}>
          ADD USER
        </button>
      </div>
    </>
  );
}

export default App;

function ShowComponent({ data }) {
  <div>
    ``
    <img src={data.avatar} alt="" />
    <h1>{data.name}</h1>
    <h2>{data.email}</h2>
  </div>;
}
