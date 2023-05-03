/**
 * ./src/components/page/posting/Pagination.js
 * 페이지네이션
 */

import {useState, useEffect} from 'react';

export const Pagination = () => {
    // 데이터

    const [limit, setLimit] = useState(10); // 페이지 당 게시물 수(기본 10개씩)
    const [now, setNow] = useState(1);      // 현재 페이지 번호(시작은 첫번째)
    const offset = (now - 1) * limit;       // 각 페이지의 첫 게시물 위치

    return (
        <>
            페이지 당 게시물 수: {limit}<br/>
            현재 페이지 번호: {now}<br/>
            각 페이지의 첫 게시물 위치: {offset}<br/>
        </>
    )
}