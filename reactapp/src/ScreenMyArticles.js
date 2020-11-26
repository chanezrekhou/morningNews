import React, { useState, useEffect } from 'react';
import './App.css';
import { Card, Icon, Empty } from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

const { Meta } = Card;

function ScreenMyArticles(props) {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('/wishlist',{
        method:'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body : `token=${props.sessionUser}`
    })
      const jsonResponse = await response.json()
      setArticles(jsonResponse.wishlist)
    }
    loadData()
  }, [props.wishlistToDisplay]) 

  let onDeleteClick = async (title) => {
      const responseWish = await fetch('/delete-wishlist', {
          method:'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body : `title=${title}&token=${props.sessionUser}`
      })  
      const jsonResponse = await responseWish.json()
      const wishlist = jsonResponse.saved.wishlist;
      props.DeleteFromStore(wishlist);
      setArticles(props.wishlistToDisplay);
  }

  const card = articles.map(i =>
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
            src={i.img}
          />
        }

        actions={[
          <Icon type="read" key="ellipsis2" />,
          <Icon onClick={() => onDeleteClick(i.title)} type="delete" key="ellipsis" />
        ]}
      >

        <Meta
          title={i.title}
          description={i.description}
        />



      </Card>
    </div>
  )
  if (card.length === 0) {
    return (
      <div>
        <Nav />
        <div className="Banner" />
        <Empty />
      </div>
    )
  } else {
    return (
      <div>
        <Nav />
        <div className="Banner" />
        <div className="Card">
          {card}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { wishlistToDisplay: state.articleWishlist, sessionUser: state.sessionUser  }
}

function mapDispatchToProps(dispatch) {
  return {
    DeleteFromStore: function (wishlist) {
      dispatch({ type: 'deleteArticle', wishlist: wishlist })
    }
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(ScreenMyArticles);



