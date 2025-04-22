"use client"
import styled from "styled-components";
import {useState} from "react";
import {storeURL} from "@/app/storeUrl";

const StyledDiv = styled.div`
    height: 100vh;
    margin: auto;
    padding: 10vh;
    background: darkseagreen;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    font-size:calc(2px + 1.5vw);
    label{
        margin-bottom: 2vh;
    }
    a{
        text-decoration: none;
        border-radius: 2vh;
        padding: 1vh;
        margin-top: 3vh;
    }
`;

const Window = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    padding: 10vh;
    margin: 5vh;
    button{
        background:blanchedalmond;
        padding: 2vh;
        margin-top: 2vh;
    }
`;
const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    span{
        white-space: nowrap;
    }
    input{
        width: 40%;
        font-size:calc(2px + 1.5vw);
        margin-bottom: 2vh;
    }
    span.input{
        width: 100%;
    }
    label.strong{
        font-size:calc(3px + 1.5vw);
    }
    `;

export default function Home(){
  const [url, setUrl] = useState<string>("");
  const [alias, setAlias] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleInput = async () => {
    const message = await storeURL(url, alias);
    if (message === "invalidUrl") {
      alert(`The URL ${url} is invalid. Please try again.`);
    } else if (message === "aliasExists") {
      alert(`The alias ${alias} already exists. Please try another one.`);
    } else {
      setShortUrl(`https://mp-5-alice-zhangs-projects.vercel.app/${alias}`);
    }
  }
  return(
      <StyledDiv>
        <Window>
          <h2>URL Shortener</h2>
          <InputDiv>
            <label htmlFor="input-bar"><strong>Your URL</strong></label>
            <input
                type="text"
                placeholder="enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
          </InputDiv>
          <InputDiv>
            <label htmlFor="input-bar"><strong>Custom Alias </strong></label>
            <span>https://mp-5-alice-zhangs-projects.vercel.app/
                  <input
                      type="text"
                      placeholder="alias"
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                  /></span>
          </InputDiv>
          <button onClick={()=>handleInput()}>Shorten</button>
          {shortUrl &&
              <div>
                <span><strong>This is the shortened url: </strong></span>
                <a href={shortUrl}>{shortUrl}</a></div>}
        </Window>
      </StyledDiv>
  )
}
