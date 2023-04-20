import { useState, useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";

const link = "https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=";
//(async ()=>{

    //const entireList=await getEntireUserList();
    //console.log(entireList)

//})();

function Card() {
  const [array, setArray] = useState<Array<any>>([]);
  const [favList, setFavList] = useState<Array<any>>(() => {
    const fromLS = localStorage.getItem('favList')
    return fromLS !== null ? JSON.parse(fromLS):[]
  });
  const [fav, setFav] = useState<Array<string>>(() => {
    const fromLS = localStorage.getItem('fav')
    return fromLS !== null ? JSON.parse(fromLS):[]
  });
  const [cp, setCp] = useState<number>(0);

  const handleClickFav = (id: string, elem: object) => {
    if (!fav.includes(id)) {
      setFav(fav.concat(id));
      setFavList(favList.concat(elem))
    } else {
      setFav(fav.filter((idxInFav: string) => idxInFav !== id));
      setFavList(favList.filter((object: any) => object.objectID !== id));
    }
  };
  
  useEffect(() => {
    localStorage.setItem('favList', JSON.stringify(favList))
    localStorage.setItem('fav', JSON.stringify(fav))
  }, [favList, fav])
  
  useEffect(() => {
    fetch(link + `${cp}`)
      .then((response) => response.json())
      .then((data): any => {
        const dataFiltered = data.hits.filter(
          (elem: any) =>
            elem.author != null &&
            elem.story_title != null &&
            elem.story_url != null &&
            elem.created_at != null
        );
        setArray(dataFiltered)
      });
  }, [cp])
  
  function next () {
    setCp(cp+1)
  }
  
  function prev () {
    if (cp > 0) {
      setCp(cp-1)
    }
  }
  
  
  return (
    <>
      {array?.map((oneNew: any) => (
        <div key={oneNew.objectID} className="card">
          <a target="_blank" href={oneNew.story_url} className="container-info">
            <div className="author">{oneNew.author}</div>
            <div className="title">{oneNew.story_title}</div>
            <div className="date">
              {oneNew.created_at.slice(11, 19) +
                " " +
                oneNew.created_at.slice(0, 10)}
            </div>
          </a>
          <div className="fav">
            <button
              key={oneNew.objectID}
              onClick={() => handleClickFav(oneNew.objectID, oneNew)}
              className={fav.includes(oneNew.objectID) ? "fav-btn-clicked" : "fav-btn-no-clicked"}
            >
              <span>
                <AiFillHeart size={30} />
              </span>
            </button>
          </div>
        </div>
      ))}
      <div className="button-prev-next">
      <button onClick={prev} className="button-26">Atras</button>
      <button onClick={next} className="button-26">Siguiente</button>
      </div>
      <div id="section-favs" className="titles">Favorites</div>
      {favList.length > 0 ? favList?.map((oneNew: any) => (
              <div key={oneNew.objectID} className="card">
              <a target="_blank" href={oneNew.story_url} className="container-info">
                  <div className="author">{oneNew.author}</div>
                  <div className="title">{oneNew.story_title}</div>
                  <div className="date">
                  {oneNew.created_at.slice(11, 19) +
                      " " +
                      oneNew.created_at.slice(0, 10)}
                  </div>
              </a>
              <div className="fav">
                  <button
                  key={oneNew.objectID}
                  onClick={() => handleClickFav(oneNew.objectID, oneNew)}
                  className={fav.includes(oneNew.objectID) ? "fav-btn-clicked" : "fav-btn-no-clicked"}
                  >
                  <span>
                      <AiFillHeart size={30} />
                  </span>
                  </button>
              </div>
              </div>
          )):<div className="no-yet">There are not Favorites yet</div>}
          <div className="footer">Made by Elí Flores</div>
    </>
  );
}

export default Card;
