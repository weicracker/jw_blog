import React from "react";
import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';
import md5 from "md5";
class GitTalk extends React.Component {
    componentDidMount() {
        const gitalk = new Gitalk({
            clientID: '1f9510e6ee6e0e8b3b43',
            clientSecret: 'e0ab5e96401ee63762e26f89337990917b7943a5',
            repo: 'jw_blog',
            owner: 'weicracker',
            admin: ['weicracker'],
            id: md5(window.location.pathname),      // Ensure uniqueness and length less than 50
            distractionFreeMode: false  // Facebook-like distraction free mode
        })

        gitalk.render('gitalk-container')
    }
    render() {
        return (
            <div id="gitalk-container"></div>
        )
    }
}
export default GitTalk;
