/**
 * ./src/components/page/miss/DetailPage.js
 * 상세 페이지
 */

import "./DetailPage.scss";
import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { db } from '../../../firebase';
import { getDocs, collection, query, orderBy, updateDoc, doc } from "firebase/firestore";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const DetailPage = (props) => {
    const [profiles, setProfiles] = useState([]); // 가져올 게시글 내용
    const [visible, setVisible] = useState(true); // visibled를 위한 변수

    const currUser = getAuth().currentUser;

    let { id } = useParams();
    const no = id;

    const navigate = useNavigate();
    const location = useLocation();

    // console.log(visible);

    const back = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const handleFind = async () => {
        const idRef = Array.from(profiles)[0].id;
        console.log(idRef);

        const docRef = doc(db, props.cg, idRef.trim());
        console.log(docRef);

        // console.log(visible);

        await updateDoc(docRef, {
            visibled: visible
        });
    };

    const handleVisible = () => {
        setVisible(false);
        handleFind();
    }

    const DetailCarousel = () => {
        const settings = {
            dots: true,
            autoplay: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            lazyLoad: true,
        };
    
        return (
            <>
            <Slider {...settings}>
                {profiles[0].imgs.map((url, i) =>
                <img src={url} width={500} height={500} key={i}/>
                // <img src={url} width="100%" height="100%" key={i}/>
                )}
            </Slider>
            </>
        )
    }

      // useEffect
    useEffect(() => {

        const fetchData = async () => {
            // 여기서 비동기 작업 수행
            const QuerySnapshot = await getDocs(query(collection(db, props.cg), orderBy("uploadTime", "desc")));
            const data = QuerySnapshot.docs.map((doc, i) => ({
                    // ids: i,
                    ...doc.data()
                }
            ));

            // data의 ids+1 과 파라미터를 가져와 비교해서 같은 수면 return
            const detail = data.filter((d) => {
                if(d.id === no) {
                    return d;
                }
            });

            // profiles useState() set
            setProfiles(detail);
        };

        // fetch
        fetchData();
    }, [location]);

    return (
        <>
        <div className="detail-page">
            <div className="title-btn">
            <h2>상세 페이지</h2>
            <button className="goBack-btn" onClick={back}>뒤로가기</button>
            </div>
        
        {profiles.length > 0 && props.cg === "Missing" && (
            <>
            <div className="detail-page2">
            
                <div className="imgs">
                <DetailCarousel />
                    {/* {profiles[0].imgs.map((url, i) => <img src={url} width={300} height={300} key={i}/>)} */}
                </div>

                <div className="detailContent">
                    <h3>🐶{profiles[0].name}🐶</h3>
                    <p>실종 위치: {profiles[0].address}</p>
                    <p>실종 시간: {profiles[0].date} </p>
                    <p>종: {profiles[0].specify}</p>
                    <p>나이: {profiles[0].age}</p>
                    <p>성별: {profiles[0].gender}</p>
                    <p>중성화 여부: {profiles[0].neutering}</p>
                    <p>카카오톡 아이디: {profiles[0].kakaoId}</p>
                    <p>털색: {profiles[0].farColor1}, {profiles[0].farColor2} </p>
                    <p>특징: {profiles[0].feature}</p>
                    <div className="upload-date">
                        <p>업로드 날짜: {profiles[0].uploadTime.toDate().toLocaleDateString()} / {profiles[0].uploadTime.toDate().toLocaleTimeString()}</p>
                    </div>
                    {(currUser.uid == profiles[0].uid) && <button className="found-btn" onClick={handleVisible}>찾았어요</button>}
                </div>
            </div>
            </>
        )}

        {profiles.length > 0 && props.cg === "Finding" && (
            <div className="detail-page2">
                <div className="imgs">
                    {profiles[0].imgs.map((url, i) => <img src={url} width={300} height={300}/>)}
                </div>
                <div className="detailContent">
                <div className="detailText">
                    <h3>🐶{profiles[0].address}</h3><p>&ensp;에서 목격했어요</p><h3>🐶</h3></div>
                <p>품종: {profiles[0].specify}</p>
                <p>성별: {profiles[0].gender}</p>
                <p>추정 나이: {profiles[0].age}</p>
                <p>모색: {profiles[0].farColor1}, {profiles[0].farColor2} </p>
                <p>중성화 여부: {profiles[0].neutering}</p>
                <p>목격 시간: {profiles[0].date.split("T")[0]} {profiles[0].date.split("T")[1]}</p>
                <p>특징: {profiles[0].feature}</p>
                <p>카카오톡 아이디: {profiles[0].kakaoId}</p>
                <div className="upload-date">
                    <p>업로드 날짜: {profiles[0].uploadTime.toDate().toLocaleDateString()} / {profiles[0].uploadTime.toDate().toLocaleTimeString()}</p>
                </div>
                {(currUser.uid == profiles[0].uid) && <button className="found-btn" onClick={handleFind}>찾았어요</button>}
                </div>
            </div>
        )}
        <br/><br/><br/>
        </div>
        </>
    );
}