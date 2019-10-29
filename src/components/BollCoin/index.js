import React from "react";
import Modal from 'react-modal';
import bollcoin from "./bollcoin.module.css"
Modal.setAppElement('#___gatsby')
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};
class BollCoin extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      up_val: 0, // 压力线
      md_val: 0, // 中线
      spj_val: 0, // 收盘价
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <div className="col-sm-6 col-md-4 col-lg-3">
          <div onClick={this.openModal} className={bollcoin.thumbnail} style={{ height: 280 }}>
            <span title={'区块链计算器'}>
              <img className="lazy" width="300" height="130" src={'https://i.loli.net/2019/10/29/n5wslDPZ4xY681b.jpg'} alt={'区块链计算器'} />
            </span>
            <div className={bollcoin.caption}>
              <span className={bollcoin.title} title={'区块链计算器'}>
                {'区块链计算器'}
                <br />
                <small>{'计算区块链涨跌'}</small>
              </span>
              <br />
              <small>计算区块链股票涨跌,通过Boll极限值及K线判断</small>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 className={bollcoin.title} ref={subtitle => this.subtitle = subtitle}>区块链计算器</h2>
          <form className={bollcoin.form}>
            <label className={bollcoin.label} htmlFor="UP_id">
              <span className={bollcoin.labelKey}>UP:</span>
              <input id="UP_id" onChange={(e) => { this.setState({ up_val: e.target.value }); console.log('up_val', e.target.value) }} />
            </label>
            <label className={bollcoin.label} htmlFor="MD_id">
              <span className={bollcoin.labelKey}>MD:</span>
              <input id="MD_id" onChange={(e) => { this.setState({ md_val: e.target.value }); console.log('md_val', e.target.value) }} />
            </label>
            <label className={bollcoin.label} htmlFor="spj_id">
              <span className={bollcoin.labelKey}>收盘价:</span>
              <input id="spj_id" onChange={(e) => { this.setState({ spj_val: e.target.value }); console.log('spj_val', e.target.value) }} />
            </label>
            <div className={bollcoin.computed} >LB:<span>{this.state.md_val - (this.state.up_val - this.state.md_val)}</span></div>
            {
              this.state.spj_val === 0 ? null : <div className={bollcoin.computed}>BB%:<span>{(((this.state.spj_val - (this.state.md_val - (this.state.up_val - this.state.md_val))) / (this.state.up_val - (this.state.md_val - (this.state.up_val - this.state.md_val))) * 100).toFixed(2) + '%')}</span></div>
            }
            <div>
              <button onClick={this.closeModal}>关闭</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
export default BollCoin;
