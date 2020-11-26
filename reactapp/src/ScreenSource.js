import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import { Link } from "react-router-dom";

function ScreenSource() {


  const [sourceList, setSourceList] = useState([])
  const [selectedLangue, setselectedLangue] = useState("fr")
  useEffect(() => {
    async function loadData() {
      const response = await fetch(`http://newsapi.org/v2/sources?country=${selectedLangue}&apiKey=580763e4e26f4ed7acccccc8ae309b38`)
      const jsonResponse = await response.json()
      setSourceList(jsonResponse.sources)
    }
    loadData()
  }, [selectedLangue])


  return (
    <div>
      <Nav />

      <div className="Banner">
        <img onClick={() => setselectedLangue("fr")} className="Language" src="/images/france.png" width="5%" />
        <img onClick={() => setselectedLangue("us")} className="Language" src="/images/united-kingdom.png" width="5%" />
      </div>
      <div className="HomeThemes">

        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://www.kindpng.com/picc/m/193-1939576_world-news-png-world-map-facebook-cover-transparent.png" />}
                title={<Link to={`/ScreenMyArticlesBySources/${item.id}`}>  {item.name}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />


      </div>

    </div>
  );
}

export default ScreenSource;
