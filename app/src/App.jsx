import './App.css'
import ImageUpload from "./components/ImageUpload.jsx";
import SAPUI5Component from "./components/SAPUI5Component.jsx";
import {useState} from "react";
import Result from "./components/Result.jsx";
const App= ()=> {
    const [result, setResult] = useState(null);

    const handleUploadResult = (result) => {
        setResult(result);
    };
  return (
      <>
          <SAPUI5Component/>
          <div>
              <ImageUpload onUploadResult={handleUploadResult}/>
              {result && <Result data={result}/>}
              {/*<Result data={'Hello'}/>*/}
          </div>
      </>
  )
}

export default App
