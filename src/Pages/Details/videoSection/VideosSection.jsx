import React, { useState } from "react";

import "./style.scss";

import ContentWrapper from "../.././../Components/contentWrapper/ContentWrapper"
import { PlayIcon } from "../DetailsBanner/PlayBtn";
import VideoPopup from "../../../Components/VideoPopup/VideoPopup";
import Img from "../../../Components/lazyLoadingComponents/LazyLoadImg";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results.map((item) => {
                            return (
                                <div key={videoId} className="videoItem" onClick={()=> {
                                    setVideoId(videoId)
                                    setShow(true)
                                }}>
                                    <div className="videoThumbnail">
                                        <Img src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`} />
                                        <PlayIcon/>
                                    </div>
                                    <div className="videoTitle">
                                        {item.name}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;