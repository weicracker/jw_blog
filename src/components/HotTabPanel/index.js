import React, { Component } from 'react';
import { PublicAct } from "../../actions";
import hotStyle from "./hot.module.css"
class HotTabPanel extends Component {
    state = {
        hotnews: []
    }
    async loadHotNews(id) {
        this.setState({
            hotnews: []
        })
        let ret = await PublicAct.Instance.gethotNews(id);
        this.setState({
            hotnews: ret.Data
        })
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
                {
                    this.state.hotnews.length > 0 ? (
                        <ul className={hotStyle.hotList}>
                            {
                                this.state.hotnews.map((val, idx) => {
                                    return (
                                        <li key={idx}>
                                            <a href={val.url} target="__blank">
                                                <h4>{idx + 1 + '.' + val.title}</h4>
                                                <span>{val.desc ? val.desc.substr(0, 50) : ""}</span>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    ) : (
                            <div style={{textAlign:"center"}}>
                                <div class={hotStyle.balls}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <span style={{display:"block",marginTop:20}}>加载中...</span>
                            </div>
                        )
                }
            </div>
        )
    }
}

export default HotTabPanel;