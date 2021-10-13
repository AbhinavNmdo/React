import React, {useState} from "react";

export default function Textform(props) {
    const [text, setText] = useState('');
    
    const handleOnChange = (event) => {
        setText(event.target.value);
        
    }

    const handleForUpper = () => {
        let upperText = text.toUpperCase();
        setText(upperText);
        props.showAlert("Converted to UpperCase", "success");
    }

    const handleForLower = () => {
        let lowerText = text.toLowerCase();
        setText(lowerText);
        props.showAlert("Converted to LowerCase", "success");
    }

    const handleForClear = () => {
        setText('');
        props.showAlert("Cleared", "warning");
    }

    const handleForCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard", "success");
    }

    return (
        <>
        <div className="form-floating">
            <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            placeholder="Leave a comment here"
            id="textarea"
            style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'black'}}
            ></textarea>
            <label htmlFor="textarea">Type Here</label>
        </div>
        <button disabled={text.length == 0} className="btn btn-primary m-3" onClick={handleForUpper}>Convert to UpperCase</button>
        <button disabled={text.length == 0} className="btn btn-primary m-3" onClick={handleForLower}>Convert to LowerCase</button>
        <button disabled={text.length == 0} className="btn btn-danger m-3" onClick={handleForClear}>Clear All</button>
        <button disabled={text.length == 0} className="btn btn-primary m-3" onClick={handleForCopy}>Copy to Clipboard</button>
        <h4 align="center" style={{color: props.mode==='dark'?'white':'black'}}>{text.length} Characters</h4>
        <h4 align="center" style={{color: props.mode==='dark'?'white':'black'}}>{text.split(/\s+/).filter((element)=>{return element.length!=0}).length }  Words</h4>
        <h4 align="center" style={{color: props.mode==='dark'?'white':'black'}}>{0.008 * text.split(" ").filter((element)=>{return element.length!=0}).length} Minutes to Read</h4>
        <h2 align="center" style={{color: props.mode==='dark'?'white':'black'}} className="my-4">Preview</h2>
        <h5 align="center" style={{color: props.mode==='dark'?'white':'black'}}>{text.length>0?text:"Enter Some Text First"}</h5>
        </>
    );
}
