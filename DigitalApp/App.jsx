const React = require('react');
const $ = require('jquery');
const Masonry = require('react-masonry-component');
var ReactCollect = React.createClass({
        // react inital state somewhat like constructor
        getInitialState: function() {
          return {
            api_response: [],
          };
        },
        // for ajax calls
        componentDidMount: function() {
          $.get("http://localhost:8081/get_all.json", function(result) {
            if (this.isMounted()) {
              if((typeof result) =="object"){
                this.setState({
                  api_response: result,
                });
              }
            }
          }.bind(this));
        },
        // rendering view to html page
        render: function() {
          var data = this.state.api_response;
            if (data.length < 1) {
                return <div>No result found</div>;
            }else{
              return (
                <Masonry className={'my-gallery-class'} >
                   {data.map(function(image,i){
                        return (
                            <div className={"col-lg-3 col-md-3 col-sm-4 col-xs-6 div-border"} key={i}>
                                <h3 className={"h3border"}>{data[i].Title}</h3>
                                <span className="wordw">
                                  {data[i].Description}
                                </span>
                            </div>
                      );
                    })}
                </Masonry>
              );
            }
        }
      });
module.exports = ReactCollect;