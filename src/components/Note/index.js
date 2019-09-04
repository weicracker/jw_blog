import React, { Component } from 'react';
import { PublicAct } from "../../actions";
import noteStyles from "./note.module.css"
class NoteOne extends Component {
    state = {
        noteContent: "",
        type: "小说",
        from: ""
    }
    noteType = {
        a: "动漫",
        b: "漫画",
        c: "游戏",
        d: "小说",
        e: "原创",
        f: "网络",
        g: "其他",
    }

    async loadNote() {
        let ret = await PublicAct.Instance.getEverySaying();
        this.setState({
            noteContent: ret.hitokoto,
            type: this.noteType[ret.type],
            from: ret.from
        })
    }
    componentDidMount() {
        this.loadNote()
    }
    render() {
        return (
            <div>
                {
                    this.state.noteContent ? (
                        <div className={noteStyles.oneNote}>
                            <span></span>
                            <b style={{fontSize: 14 }}><i>{this.state.noteContent}</i></b>
                            <p style={{ margin: 0, paddingTop: 10, textAlign: "right", fontSize: 12 }}>{"摘自 - " + this.state.type + " - 《" + this.state.from + "》"}</p>
                        </div>
                    ) : ""
                }
            </div>
        )
    }
}
NoteOne.propTypes = {
}
export default NoteOne;