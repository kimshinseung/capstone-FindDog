/**
 * ./src/components/page/miss/BarChart.js
 * 바 차트(실종, 목격 공통)
 */

// import components
import { useEffect, useState } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

// import about firebase
import { db } from '../../../firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export const BarChart = (props) => {
    // 각 자치구에 대한 상태 변수
    const [district, setDistrict] = useState([
        {quarter: "강남구", earnings: 0}, {quarter: "강동구", earnings: 0},
        {quarter: "강북구", earnings: 0}, {quarter: "강서구", earnings: 0},

        {quarter: "관악구", earnings: 0}, {quarter: "광진구", earnings: 0},
        {quarter: "구로구", earnings: 0}, {quarter: "금천구", earnings: 0},

        {quarter: "노원구", earnings: 0}, {quarter: "도봉구", earnings: 0},
        {quarter: "동대문구", earnings: 0}, {quarter: "동작구", earnings: 0},

        {quarter: "마포구", earnings: 0}, {quarter: "서대문구", earnings: 0},
        {quarter: "서초구", earnings: 0}, {quarter: "성동구", earnings: 0},

        {quarter: "성북구", earnings: 0}, {quarter: "송파구", earnings: 0},
        {quarter: "양천구", earnings: 0}, {quarter: "영등포구", earnings: 0},

        {quarter: "용산구", earnings: 0}, {quarter: "은평구", earnings: 0},
        {quarter: "종로구", earnings: 0}, {quarter: "중구", earnings: 0},
        {quarter: "중랑구", earnings: 0}
    ]);

    // useEffect
    useEffect(() => {
        const fetchData = async () => {
            // 카테고리의 전체 문서를 가져옴
            const QuerySnapshot = await getDocs(query(collection(db, props.cg)));
            const data = QuerySnapshot.docs.map((doc) => ({
                ...doc.data()
            }));

            // data를 돌며 각 주소의 자치구와 일치하는 district의 earnings 업데이트
            Array.from(data).map((d) => {
                district.map((d2) => {
                    if(d.address.split(' ')[1] == d2.quarter) {
                        setDistrict((prevDistrict) => {
                            return prevDistrict.map((d2) => {
                                if(d.address != null) {
                                    if (d.address.split(' ')[1] === d2.quarter) {
                                        return { ...d2, earnings: d2.earnings + 1 };
                                    }
                                    return d2;
                                }
                            });
                        });
                    }
                });
            });
        };

        // fetch
        fetchData();
    }, []);
    
    return (
        <>
            <VictoryChart
                domain={{x: [0, 25], y: [0, 20]}}
                domainPadding={{ x: 0 }}
                width={500}
                height={263}
                style={{
                    background: {fill:'#eef5ed'}
                }}
            >
                <VictoryAxis // x축
                    style={{
                        tickLabels: {
                          fontFamily: 'NanumSquare',
                          fontSize: 5,
                          fontWeight: 600,
                          fill: '#376330',
                        },
                    }}
                />
                <VictoryAxis // y축
                    dependentAxis
                    style={{
                      tickLabels: {
                        fontFamily: 'NanumSquare',
                        fontSize: 10,
                        fontWeight: 400,
                        fill: '#376330',
                      },
                    }}
                />
                <VictoryBar
                    data={district}
                    x="quarter"
                    y="earnings"

                    animate={{
                        duration: 2000
                    }}

                    style={{
                        data: {
                            fill:"#376330"
                        }
                    }}
                />
            </VictoryChart>
        </>
    )
}