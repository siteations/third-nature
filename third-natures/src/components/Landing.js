import React from 'react';
import bootstrap from 'bootstrap';
import jquery from 'jquery';

var style = {
	title:{
		color: 'white',
		paddingLeft: '40px',
		marginBottom: '5px',
		fontFamily: 'Roboto Slab',
		fontWeight: '400',
	},
	 subtitle: {
		color: 'white',
		marginTop: '0px',
		paddingLeft: '60px',
		fontFamily: 'Roboto Slab',
		fontWeight: '300',
	},
	 caption: {
		color: 'white',
		paddingLeft: '60px',
		fontFamily: 'Roboto Slab',
		fontWeight: '100',
		position: 'fixed',
		bottom: '5px',
		left: '350px'

	}
}

const Landing = () => {
  return (
    <div className='hello' style={{backgroundColor: 'black', overflow: 'hidden'}}>
    	<h1 style={style.title}>Third Natures</h1>
    	<h3 style={style.subtitle}>narrating ecologies, economies, and collections in the anthropocene</h3>

    	<p style={style.caption}>speculative redesigns of <em>Plants of the World</em> at the Field Museum</p>
    	<img src="./img/prehdr-intro.png" style={{height:'100vh', position:'fixed', top: '0px', right: '0px'}}/>
    </div>
  )
}
export default Landing
