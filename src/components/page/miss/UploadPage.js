/**
 * ./src/components/page/miss/UploadPage.js
 * 실종 등록하기
 */
import React from "react";
import { useNavigate, Link } from "react-router-dom";


const UploadPage = () => {
    const handler = () =>{

    }

    return (
        <>
            <div className="upload-page">
                <form onSubmit = {handler}>
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
                </form>
            </div>
        </>
    );
};

export default UploadPage