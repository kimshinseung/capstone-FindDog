/**
 * ./src/components/page/search/SearchPage.js
 * 검색 게시판
 */
import React, { useEffect } from "react";

export function SearchPage() {
    useEffect(() => {
        Search();
    }, []);

    const Search = () => {
        let element = document.querySelector("#Specify");
        let Specify = element.value;
        let element1 = document.querySelector("#Male");
        let Male = element1.value;
        let element2 = document.querySelector("#FarColor");
        let FarColor = element2.value;
        alert(Specify+Male+FarColor);// 시험용

    };

    return <>

        <div className="search-page">

            <div className='selectBox'>
                <h3>품종</h3>
                <select id="Specify">
                    <option disabled selected>-------</option>
                    <option value="matiz">matiz</option>
                    <option value="siba">siba</option>
                    <option value="husky">husky</option>
                </select>

                <h3>성별</h3>
                <select id="Male">
                    <option disabled selected>-------</option>
                    <option value="Male">수컷</option>
                    <option value="Female">암컷</option>
                </select>

                <h3>털색</h3>
                <select id="FarColor">
                    <option disabled selected>-------</option>
                    <option value="Black">Black</option>
                    <option value="Brown">Brown</option>
                    <option value="White">White</option>
                </select>
            </div>
            <button
                onClick={() => Search()}>
                검색</button>

        </div>
    </>

}