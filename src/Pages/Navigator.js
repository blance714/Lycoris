import React from "react";
import './Navigator.css'

function Page(page, prev) {
  this.page = page;
  this.prev = prev;
}

const NavigatorContext = React.createContext();
class Navigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: {},
      currentPage: undefined
    }
  }
  
  addPage = (page, name) => {
    !name && (name = this.state.currentPage);
    const newPage = {};
    newPage[name] = new Page(page, this.state.pages[name]);
    this.setState({
      pages: Object.assign(this.state.pages, newPage)
    });
  }
  
  gotoPage = (name) => this.setState({currentPage: name});

  back = () => {
    if (this.state.pages[this.state.currentPage].prev) {
      const newPage = {};
      newPage[this.state.currentPage] = this.state.pages[this.state.currentPage].prev;
      this.setState({
        pages: Object.assign(this.state.pages, {
          pages: newPage
        })
      })
    }
  }
  
  componentDidMount() {
    !this.props.defaultPageName && (this.props.defaultPageName = 'default');
    this.addPage(this.props.children, this.props.defaultPageName);
    this.gotoPage(this.props.defaultPageName);
  }

  render() {
    return (
      <NavigatorContext.Provider value={{
        addPage: this.addPage,
        gotoPage: this.gotoPage,
        back: this.back,
        currentPage: this.state.currentPage
      }}>
        <div id="navigator-wapper">
          {this.state.currentPage && this.state.pages[this.state.currentPage]}
        </div>
      </NavigatorContext.Provider>
    )
  }

}

export default Navigator;