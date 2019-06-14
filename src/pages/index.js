import React, { Component } from 'react';
import { Link } from "gatsby"
import { SketchPicker } from 'react-color';
// import FontPicker from "font-picker-react";
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import Layout from "../components/layout/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Content from '../components/utility/Content/Content'
import "../components/pagestyles/home.sass"
class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor:"0000",
      textColor: "ffff",
      colorOpen:false,
      activeFontFamily: "Open Sans",
      fontSize:"100",
      firstBreak: true,
      secondBrake: true

    }
    this.bgColorHandeler= this.bgColorHandeler.bind(this)
    this.textColorHandeler= this.textColorHandeler.bind(this)
    this.firstCheckHandler =this.firstCheckHandler.bind(this)
    this.secondCheckHandler=this.secondCheckHandler.bind(this)
  }
  componentDidMount(){
   const saved= JSON.parse(window.localStorage.getItem("savedColors"))
   this.setState({bgColor:saved.bgColor,
  textColor:saved.textColor,
fontSize:saved.fontSize,
activeFontFamily:saved.font})
  }
  bgColorHandeler(color){
    this.setState({ bgColor: color.hex });
  }
  textColorHandeler(color){
    this.setState({ textColor: color.hex });
  }
  firstCheckHandler(checked){
    this.setState({ firstBrake:checked.bubbles});
    console.log(checked);
    
  }
  secondCheckHandler(checked){
    this.setState({ secondBrake:checked });
  }
  savelocal(){
    if(typeof window !== "undefined"){
    const pics={bgColor:this.state.bgColor,textColor:this.state.textColor,fontSize:this.state.fontSize,font:this.state.activeFontFamily}
    window.localStorage.setItem("savedColors",JSON.stringify(pics))
    }
  }
  render() {
    return (
      <div>

        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="body" style={{background: this.state.bgColor}}>
        <div className="title">
          <h1 className="apply-font" style={{color: this.state.textColor,fontSize:`${this.state.fontSize}px`}}>Deep{this.state.firstBreak ? (<br/>): ""} Desert{this.state.secondBrake ? (<br/>): ""} Games</h1>
        </div>
        <div className="colorblock">
      <button style={{color:this.state.textColor}} onClick={()=> this.setState({colorOpen: !this.state.colorOpen})}>{this.state.colorOpen ? "x": "change font and color"}</button>
    <SlideDown className={'my-dropdown-slidedown'}>
    {this.state.colorOpen ? (
      <div className="colorblock__main" style={{color:this.state.textColor}}>

          <label>
            Back ground color
          <SketchPicker
           color={ this.state.bgColor }
           onChangeComplete={ this.bgColorHandeler }
           />  
        </label>
          <label>
            text color
          <SketchPicker
           color={ this.state.textColor }
           onChangeComplete={ this.textColorHandeler }
           />  
        </label>
        <label>
          {/* font
          <FontPicker
          apiKey="AIzaSyCl_dsFh-W92B-JNqfjKfo0ZHUSJ7roDNo"
          activeFontFamily={this.state.activeFontFamily}
          onChange={nextFont =>
            this.setState({
              activeFontFamily: nextFont.family,
            })
          }
        /> */}
        <label>
          font size (in px) 
          <input type="text" value={this.state.fontSize} onChange={(e)=>this.setState({fontSize:e.target.value})}/>
        </label>
        {/* <label className="colorblock__main__toggles">
          stacking text
          <div>
          <Toggle onChange={this.firstCheckHandler} defaultChecked={this.state.firstBreak} />            
          <Toggle onChange={this.secondCheckHandler} defaultChecked={this.state.secondBreak} />            
          </div>
        </label> */}
        </label>
          <label>
            save these colors
            <form action="https://formspree.io/l33t.ppl@gmail.com" method="POST">
              <input type="text" className="visuallyhidden" name="bg color" value={this.state.bgColor}/>
              <input type="text" className="visuallyhidden" name="text color" value={this.state.textColor}/>
              <input type="text" className="visuallyhidden" name="font size" value={this.state.fontSize}/>
              {/* <input type="text" className="visuallyhidden" name="font" value={this.state.activeFontFamily}/> */}

              <input type="submit" value="save" onClick={()=>this.savelocal()}/>
            </form>
          </label>
           </div>
           ) : null}
        </SlideDown>
        </div>
      </div>
      </div>
    );
  }
}

export default IndexPage;
// AIzaSyCl_dsFh-W92B-JNqfjKfo0ZHUSJ7roDNo 