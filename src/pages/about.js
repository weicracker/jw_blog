import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
class News extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="关于我" />
        <div>
          <h1 className="page-title"><center>About Me</center></h1>
          <article className="post">
            <div className="entry-content clearfix">
              <div className="MyAboutMe">
                <p><span style={{ fontWeight: "bold" }}>关于博客：</span></p>
                <p>&nbsp; &nbsp; Megatron的个人博客，用文字记录生活的点点滴滴。</p>
                <p><span style={{ fontWeight: "bold" }}>关于博主：</span></p>
                <p>&nbsp; &nbsp; 一名90后Nodejs全栈程序员，常写Nodejs，Typescript，React，Python，Electron，偶尔写点Golang底层算法啥的，现任职某央企，业余爱好写些小程序、爬虫。</p>
                <p>&nbsp; &nbsp; 喜欢逛一些博客论坛、钻研使用前沿的技术，喜欢科学上网，去外面的世界了解更前沿的技术；具有独立学习能力，责任心强、思维敏捷，能独立承担工作任务，具备良好的沟通能力。</p>
                <p>&nbsp; &nbsp; 擅长钻研，对前端流行技术有浓厚兴趣，重视用户体验和网站交互功能的实现，并且付诸实际行动。</p>
                <p><span style={{ fontWeight: "bold" }}>博客驱动：</span></p>
                <p>&nbsp; &nbsp; 后端：Nodejs，服务使用Koa2框架，喜欢清爽简洁的代码，喜欢乔布斯的极简理念。</p>
                <p>&nbsp; &nbsp; 前端：Gatsbyjs+React，博客采用简约配色，大道至简。<br /></p>
                <p>&nbsp; &nbsp; 数据库：Mongodb，很常用的数据库。</p>
                <p><span style={{ fontWeight: "bold" }}>联系方式：</span></p>
                <p>&nbsp; &nbsp; 微信：wogeinishu</p>
                <p>&nbsp; &nbsp; 邮箱：jiwei3778@gmail.com</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;有严重的代码规范强迫症，封装强迫症，喜欢给朋友开发小爬虫、小程序。<br /></p>
              </div>
            </div>
          </article>
        </div>
      </Layout>
    )
  }
}
export default News;
export const pageQuery = graphql`
  query {
            site {
          siteMetadata {
            title
          }
          }
        }
      `
