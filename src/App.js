import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";

function App() {
  const [photos, updatephotos] = useState([]); //State for Array of Photos from the server
  const [query, setQuery] = useState("Cars"); // Query for search bar
  const SERVER_URI = "http://localhost:5000"; //Flask Server

  useEffect(() => {
    if (!query || query === "") return updatephotos([]); //If thre is no query inside the search clear the photos state
    const delayDebounceFn = setTimeout(() => {
      axios.get(`${SERVER_URI}/${query}`).then((res) => {
        // fetch data from the flask server
        updatephotos(res.data.photo);
      });
    }, 500); // 500 milliseconds timeout after user stops typing

    return () => clearTimeout(delayDebounceFn);
  }, [query]); // update on query change

  return (
    <Container>
      <Header>
        <Logo>My Gallery</Logo>
        <Search
          label="Search"
          placeholder="Search an Image"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Auth>
          <Button>Login</Button>
          <Button>SignUp</Button>
        </Auth>
      </Header>

      <Body>
        {photos &&
          photos.length > 0 &&
          photos.map((data) => {
            // console.log(data);
            let path =
              "https://farm" +
              data.farm +
              ".staticflickr.com/" +
              data.server +
              "/" +
              data.id +
              "_" +
              data.secret +
              ".jpg"; //path for image

            return (
              <ImageContainer key={data.title}>
                <Image src={path} alt={data.title} />
              </ImageContainer>
            );
          })}
      </Body>
    </Container>
  );
}

export default App;
// 546f15dfd7ac997a5a92713620c10a10 Key: 546f15dfd7ac997a5a92713620c10a10
// Secret: 8c8f088139ff65f8

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 5vh;
  padding: 20px;
  background-color: gray;
  position: fixed;
  width: 100vw;
`;

const Logo = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const Search = styled.input`
  border-radius: 10px;
  padding: 15px;
  height: 15px;
  width: 40vw;
`;
const Image = styled.img`
  /* width: 20px; */
  /* width: auto; */
  /* object-fit: cover; */

  border-radius: 10px;
`;

const ImageContainer = styled.div``;

const Button = styled.button`
  margin: 0;
  border-radius: 10px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  margin: 0 2px;
`;

const Auth = styled.div``;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;

  padding-top: 12vh;
`;
