var React = require('react');

var Map = require('./Map');
var AreaList = require('./AreaList');
var AreaItem = require('./AreaItem');
var MemulList = require('./MemulList');

var App = React.createClass({
	getInitialState: function(){
    //marker data
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this)
    });

    //단지정보
    $.ajax({
        url: '/getMemul/'+193,
        dataType: 'json',
        cache: false,
        success: function(data){
        this.setState({memul: data})
        console.log("매물로드ok")
        console.log(data);
      }.bind(this)
    });

		return ({
        //state for Map 
        center: {lat: 37.52085679565041, lng:  127.04701312474145},
    
        //state for AreaNav
        gu: 0,

        //state for Memulist
        danji: 193,
    });
	},
  //function for Map
  handleResponse: function(item){
    this.setState({danji: item});
    $.ajax({
        url: '/getMemul/'+item,
        dataType: 'json',
        cache: false,
        success: function(data){
          if (data != 'null'){
          this.setState({memul: data})
          console.log("매물로드ok")
          console.log(data);
        }
      }.bind(this)
    });
    console.log("handleResponse called",item)
  },
  
  //funciton for AreaNav
  getCenterPos: function(position){
    console.log("getCenterPos called");
    this.setState({center: position});
  },
  
  render: function() {
    return (
      <div className="app col-md-12">
        <AreaList getGu={this.getGu} url='/getGu' onClick={this.getCenterPos} />
        <Map center={this.state.center} 
            data={this.state.data}
            bounds={this.state.bounds}
            //func 
            getCenterPos={this.getCenterPos}
            handleResponse={this.handleResponse}/>
        <MemulList name={this.state.danji} memul={this.state.memul} />
      </div>
    );
  }
});

module.exports = App;
