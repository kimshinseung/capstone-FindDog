/**
 * ./src/components/page/miss/PieChart.js
 * 파이 차트
 */

import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import {VictoryPie, VictoryLabel} from 'victory';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';

// cg: Missing or Finding
export const PieChart = (props) => {
    const [findRatio, setFindRatio] = useState(0);

    const ratio = 66.7;
    const ratio2 = parseFloat(findRatio);

    // 차트에 반영될 데이터
    const data = [
        {quarter: 1, earnings:ratio2, label: `발견: ${findRatio}%`},
        {quarter: 2, earnings:100-ratio2, label: `미발견: ${100-findRatio}%`}
    ];

    useEffect(() => {
        const fetchData = async () => {
            const colRef = collection(db, props.cg);

            // 콜렉션의 총 문서 수
            const allSnapshot = await getCountFromServer(colRef);
            const allofCol = allSnapshot.data().count;
            
            // 콜렉션 내에서 발견된 반려견 수(visibled == false)
            const q = query(colRef, where("visibled", "==", false));
            const findSnapshot = await getCountFromServer(q);
            const findDoc = findSnapshot.data().count;

            // console.log(allofCol);
            // console.log(findDoc);

            const ratio = ((findDoc / allofCol) * 100).toFixed(1);
            setFindRatio(ratio);

            // console.log(100-findRatio);
        }

        fetchData();
    }, []);

    return (
        <>
            <svg width={500} height={500}>

                {/* #93c58c | #69a65f | #376330 */}

                <circle cx={250} cy={250} r={85} fill="#376330">
                    
                </circle>
                <VictoryPie
                    data={ data }
                    x="quarter"
                    y="earnings"

                    categories={{
                        quarter: ["발견", "미발견"]
                    }}

                    animate={{
                        duration: 1500
                    }}
                    
                    colorScale={["#69a65f", "#93c58c"]}
                    
                    padding={{
                        top: 50, bottom: 50
                    }}

                    standalone={false}
                    width={500}
                    height={500}
                    innerRadius={95}
                    labelRadius={({ innerRadius }) => innerRadius + 10 }
                    
                    style={{
                        labels: {
                            fontFamily: 'NanumSquare',
                            fontSize: 15,
                            fontWeight: 600,
                            fill: "#ffffff"
                        }
                    }}
                />
                <VictoryLabel
                    text={(props.cg == "Missing") ? "실종 반려견 발견 비율(%)" : "목격 반려견 발견 비율(%)"}
                    textAnchor="middle"  // 가운데 정렬
                    verticalAnchor="middle"  // 가운데 정렬
                    x={250}  // 원의 x 좌표
                    y={250}  // 원의 y 좌표
                    style={{
                        fontFamily: 'NanumSquare',
                        fontSize: 15,
                        fontWeight: 400,
                        fill: "#ffffff"
                    }}
                />
            </svg>
        </>
    )
}