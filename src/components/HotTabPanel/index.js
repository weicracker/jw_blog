import React, { Component } from 'react';
import { PublicAct } from "../../actions";

class HotTabPanel extends Component {
    async loadHotNews(id) {
        let ret = await PublicAct.Instance.gethotNews(id);
        console.log(ret);
    }
    componentDidMount() {
        let { id } = this.props;
        this.loadHotNews(id)
    }
    render() {
        let { title } = this.props;
        return (
            <div>
                <h3>{title}热榜</h3>
            </div>
        )
    }
}

export default HotTabPanel;