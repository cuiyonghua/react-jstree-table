import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'jstreetable/jstreetable.min';
import 'jstree/dist/jstree.min';
import 'jstree/dist/themes/default/style.css';

class TreeView extends Component {

  static propTypes = {
    treeData: PropTypes.object.isRequired,
    treeSearchData: PropTypes.object.isRequired,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => false,
  };

  shouldComponentUpdate(nextProps) {
    return (nextProps.treeData !== this.props.treeData || nextProps.treeSearchData !== this.props.treeSearchData);
  }

  componentDidMount() {
    const { treeData } = this.props;
    if (treeData) {
      $(this.treeContainer).jstree(treeData);
      $(this.treeContainer).on('changed.jstree', (e, data) => {
        this.props.onChange(e, data);
      });
    }
  }

  componentDidUpdate() {
    const { treeData, treeSearchData } = this.props;
    if (treeData) {
      $(this.treeContainer).jstree(true).settings = treeData;
      $(this.treeContainer).jstree(true).refresh();
      // if(treeSearchData) {
      //   $(this.treeContainer).jstree('search', treeSearchData);
      // }
      if (Array.isArray(treeSearchData)) {
        treeSearchData.map( (v, k, treeSearchData) => {
          if(k === 0) {
            $(this.treeContainer).jstree(true).search(v);
          } else {
            $(this.treeContainer).jstree(true).search(v, true, false, false, true);
          }
          
        });
        // $.each(treeSearchData, function(k, v) {
        //   $(this.treeContainer).jstree(true).search(v, true, false, false, true);
        // });
      } else {
        $(this.treeContainer).jstree(true).search(treeSearchData);
      }
    }
  }

  render() {
    return (
      <div ref={div => this.treeContainer = div} />
    );
  }
}

export default TreeView;
