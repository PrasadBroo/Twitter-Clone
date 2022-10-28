import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../components/Searchbar/Searchbar";
import WhoToFollow from "../components/WhoToFollow/WhoToFollow";
import { useSearchParams } from "react-router-dom";
import SearchTop from "../subcomponents/SearchTop";
import SearchLatest from './../subcomponents/SearchLatest';
import SearchPeoples from './../subcomponents/SearchPeoples';
import SearchImages from "../subcomponents/SearchImages";
import SearchVideos from "../subcomponents/SearchVideos";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [componentToRender, setComponentToRender] = useState(null);
  const [searchQuery,setSearchQuery] = useState('')


  useEffect(() => {
    if (!searchParams.get("q")) return navigate("/explore");
    setComponentToRender(searchParams.get("c"));
    setSearchQuery(searchParams.get("q"))
  }, [searchParams, navigate]);
  const handelRenderComp = () => {
    switch (componentToRender) {
      case "trend":
        return <SearchTop />;
      case "live":
        return <SearchLatest />;
      case "users":
        return <SearchPeoples />;
      case "images":
        return <SearchImages />;
      case "videos":
        return <SearchVideos />;
      default:
        return <SearchTop />;
    }
  };

  return (
    <>
      <div className="explorepage two-flex-col-container searchpage">
        <div className="col1 explorepage-col1">
          <div className="top-header">
            <Searchbar className="explorepage-searchbar" input={searchQuery}  setInput={(value)=>setSearchQuery(value)}/>
            <div className="icon-conatiner">
              <i className="far fa-gear"></i>
            </div>
          </div>
          <div className="nav-links-wrapper">
            <div className="nav-links">
              <Link
                to={location.search.replace(componentToRender, "trend")}
                className={"header-link ".concat( componentToRender === "trend" ? "active-header-link":null)  }
              >
                Top
                <span className="custom-border-bottom"></span>
              </Link>
              <Link
                to={location.search.replace(componentToRender, "live")}
                className={"header-link ".concat( componentToRender === "live" ? "active-header-link":null)  }
              >
                Latest
                <span className="custom-border-bottom"></span>
              </Link>
              <Link
                to={location.search.replace(componentToRender, "users")}
                className={"header-link ".concat( componentToRender === "users" ? "active-header-link":null)  }
              >
                People
                <span className="custom-border-bottom"></span>
              </Link>
              <Link
                to={location.search.replace(componentToRender, "images")}
                className={"header-link ".concat( componentToRender === "images" ? "active-header-link":null)  }
              >
                Photos
                <span className="custom-border-bottom"></span>
              </Link>
              <Link
                to={location.search.replace(componentToRender, "videos")}
                className={"header-link ".concat( componentToRender === "videos" ? "active-header-link":null)  }
              >
                Videos
                <span className="custom-border-bottom"></span>
              </Link>
            </div>
          </div>
          <div className="explore-content">{handelRenderComp()}</div>
        </div>
        <div
          className="col2 follow-sugg-news-container"
          style={{ maxWidth: "350px" }}
        >
          <WhoToFollow />
        </div>
      </div>
    </>
  );
}
