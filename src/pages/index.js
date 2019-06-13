import React, { Component } from 'react';
import { Link } from "gatsby"
import { SketchPicker } from 'react-color';
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
      colorOpen:false

    }
    this.bgColorHandeler= this.bgColorHandeler.bind(this)
    this.textColorHandeler= this.textColorHandeler.bind(this)
  }
  componentDidMount(){
   const saved= JSON.parse(window.localStorage.getItem("savedColors"))
   this.setState({bgColor:saved.bgColor,
  textColor:saved.textColor})
  }
  bgColorHandeler(color){
    this.setState({ bgColor: color.hex });
  }
  textColorHandeler(color){
    this.setState({ textColor: color.hex });
  }
  savelocal(){
    const pics={bgColor:this.state.bgColor,textColor:this.state.textColor}
    window.localStorage.setItem("savedColors",JSON.stringify(pics))
  }
  render() {
    return (
      <div>

        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="body" style={{background: this.state.bgColor}}>
        <div className="title">
          <h1 className="title__main" style={{color: this.state.textColor}}>Deep Desert Games</h1>
        </div>
        <div className="colorblock">
      <button style={{color:this.state.textColor}} onClick={()=> this.setState({colorOpen: !this.state.colorOpen})}>{this.state.colorOpen ? "x": "change colors"}</button>
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
            save these colors
            <form action="https://formspree.io/l33t.ppl@gmail.com" method="POST">
              <input type="text" className="visuallyhidden" name="bg color" value={this.state.bgColor}/>
              <input type="text" className="visuallyhidden" name="text color" value={this.state.textColor}/>
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