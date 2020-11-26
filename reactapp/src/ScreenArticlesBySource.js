import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Modal, Button } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';


const { Meta } = Card;

function ScreenArticlesBySource(props) {
  var id = props.match.params.id;
  const [articlesList, setArticlesList] = useState([])
  const [state, setState] = useState(false);
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");


  useEffect(() => {
    async function loadData() {
      const response = await fetch(`http://newsapi.org/v2/top-headlines?sources=${id}&apiKey=580763e4e26f4ed7acccccc8ae309b38`)
      const jsonResponse = await response.json()
      setArticlesList(jsonResponse.articles)
    }
    loadData()
  }, [])


  let showModal = (title, content) => {
    setTitre(title);
    setContenu(content);
    setState(true)
  };

  let handleOk = e => {
    setState(false)
  };

  let handleCancel = e => {
    setState(false)
  };

  var color = {};

  let onLikeClick = async (title, description, content, img) => {

    const responseWish = await fetch('/add-wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.sessionUser}&title=${title}&description=${description}&content=${content}&img=${img}`
    })
    const jsonResponse = await responseWish.json()
    const wishlist = jsonResponse.saved.wishlist
    props.addArticle(wishlist)
      for (let i = 0; i < wishlist.length; i++) {
      if (title == wishlist[i].title) {
        color = { color: '#f1c40f' };
      }
    }
  }

  const card = articlesList.map((i, j) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            width: 300,
            margin: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          cover={
            <img
              alt="example"
              src={i.urlToImage}
            />
          }
          actions={[
            <Button type="primary" onClick={() => showModal(i.title, i.content)}><Icon type="read" key="ellipsis2" /></Button>,
            <Icon type="like" style={color} onClick={() => onLikeClick(i.title, i.description, i.content, i.urlToImage)} key="ellipsis" />
          ]}
        >
          <Meta
            title={i.title}
            description={i.description}
          />

        </Card></div>
    )
  })

  return (
    <div>

      <Nav />

      <div className="Banner" />
      <div className="Card">
        {card}
        <Modal
          title={titre}
          visible={state}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{contenu}</p>

        </Modal>
      </div>






    </div>
  );
}



function mapDispatchToProps(dispatch) {
  return {
    addArticle: function (wishlist) {
      dispatch({ type: 'addArticle', wishlist: wishlist })
    }
  }
}

function mapStateToProps(state) {
  return { wishlistToDisplay: state.articleWishlist, sessionUser: state.sessionUser }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenArticlesBySource);


